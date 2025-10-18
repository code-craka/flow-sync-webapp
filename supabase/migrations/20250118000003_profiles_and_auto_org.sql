-- FlowSync SaaS - Profiles and Automatic Organization Creation
-- Extends auth.users with profiles and creates default organization on signup

-- =====================================================
-- PROFILES TABLE (EXTENDED USER INFO)
-- =====================================================
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Profiles RLS Policies
CREATE POLICY "Users can view any profile"
    ON profiles FOR SELECT
    USING (true);

CREATE POLICY "Users can update own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
    ON profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Index for faster lookups
CREATE INDEX idx_profiles_email ON profiles(email);

-- Updated at trigger
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- AUTO-CREATE PROFILE AND ORGANIZATION ON SIGNUP
-- =====================================================

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    new_org_id UUID;
    user_email TEXT;
    user_name TEXT;
    org_name TEXT;
    org_slug TEXT;
BEGIN
    -- Get user email and name from metadata
    user_email := NEW.email;
    user_name := COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(user_email, '@', 1));

    -- Create profile
    INSERT INTO public.profiles (id, email, full_name, avatar_url)
    VALUES (
        NEW.id,
        user_email,
        user_name,
        NEW.raw_user_meta_data->>'avatar_url'
    );

    -- Generate organization name and slug
    org_name := user_name || '''s Workspace';
    org_slug := lower(regexp_replace(user_name, '[^a-zA-Z0-9]', '-', 'g')) || '-' || substr(md5(random()::text), 1, 8);

    -- Create default organization
    INSERT INTO public.organizations (name, slug, owner_id)
    VALUES (org_name, org_slug, NEW.id)
    RETURNING id INTO new_org_id;

    -- Add user as owner member
    INSERT INTO public.organization_members (organization_id, user_id, role)
    VALUES (new_org_id, NEW.id, 'owner');

    -- Create free subscription
    INSERT INTO public.subscriptions (organization_id, plan, status, trial_ends_at)
    VALUES (
        new_org_id,
        'free',
        'trialing',
        timezone('utc'::text, now()) + interval '14 days'
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on user signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- =====================================================
-- ACTIVITY LOG TRIGGER FUNCTIONS
-- =====================================================

-- Log project creation
CREATE OR REPLACE FUNCTION log_project_activity()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'INSERT') THEN
        INSERT INTO activity_logs (organization_id, user_id, activity_type, entity_type, entity_id, metadata)
        VALUES (
            NEW.organization_id,
            NEW.created_by,
            'project_created',
            'project',
            NEW.id,
            jsonb_build_object('project_name', NEW.name)
        );
    ELSIF (TG_OP = 'UPDATE') THEN
        IF (NEW.status = 'archived' AND OLD.status != 'archived') THEN
            INSERT INTO activity_logs (organization_id, user_id, activity_type, entity_type, entity_id, metadata)
            VALUES (
                NEW.organization_id,
                auth.uid(),
                'project_archived',
                'project',
                NEW.id,
                jsonb_build_object('project_name', NEW.name)
            );
        ELSE
            INSERT INTO activity_logs (organization_id, user_id, activity_type, entity_type, entity_id, metadata)
            VALUES (
                NEW.organization_id,
                auth.uid(),
                'project_updated',
                'project',
                NEW.id,
                jsonb_build_object('project_name', NEW.name)
            );
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Log task activity
CREATE OR REPLACE FUNCTION log_task_activity()
RETURNS TRIGGER AS $$
DECLARE
    proj_org_id UUID;
BEGIN
    -- Get organization_id from project
    SELECT organization_id INTO proj_org_id
    FROM projects WHERE id = NEW.project_id;

    IF (TG_OP = 'INSERT') THEN
        INSERT INTO activity_logs (organization_id, user_id, activity_type, entity_type, entity_id, metadata)
        VALUES (
            proj_org_id,
            NEW.created_by,
            'task_created',
            'task',
            NEW.id,
            jsonb_build_object('task_title', NEW.title, 'project_id', NEW.project_id)
        );
    ELSIF (TG_OP = 'UPDATE') THEN
        IF (NEW.status = 'done' AND OLD.status != 'done') THEN
            INSERT INTO activity_logs (organization_id, user_id, activity_type, entity_type, entity_id, metadata)
            VALUES (
                proj_org_id,
                auth.uid(),
                'task_completed',
                'task',
                NEW.id,
                jsonb_build_object('task_title', NEW.title)
            );
        ELSIF (NEW.assignee_id IS NOT NULL AND NEW.assignee_id != OLD.assignee_id) THEN
            INSERT INTO activity_logs (organization_id, user_id, activity_type, entity_type, entity_id, metadata)
            VALUES (
                proj_org_id,
                auth.uid(),
                'task_assigned',
                'task',
                NEW.id,
                jsonb_build_object('task_title', NEW.title, 'assignee_id', NEW.assignee_id)
            );
        ELSE
            INSERT INTO activity_logs (organization_id, user_id, activity_type, entity_type, entity_id, metadata)
            VALUES (
                proj_org_id,
                auth.uid(),
                'task_updated',
                'task',
                NEW.id,
                jsonb_build_object('task_title', NEW.title)
            );
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Log comment activity
CREATE OR REPLACE FUNCTION log_comment_activity()
RETURNS TRIGGER AS $$
DECLARE
    proj_org_id UUID;
BEGIN
    -- Get organization_id through task -> project
    SELECT p.organization_id INTO proj_org_id
    FROM tasks t
    JOIN projects p ON p.id = t.project_id
    WHERE t.id = NEW.task_id;

    INSERT INTO activity_logs (organization_id, user_id, activity_type, entity_type, entity_id, metadata)
    VALUES (
        proj_org_id,
        NEW.user_id,
        'comment_added',
        'comment',
        NEW.id,
        jsonb_build_object('task_id', NEW.task_id)
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Apply activity triggers
CREATE TRIGGER project_activity_trigger
    AFTER INSERT OR UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION log_project_activity();

CREATE TRIGGER task_activity_trigger
    AFTER INSERT OR UPDATE ON tasks
    FOR EACH ROW EXECUTE FUNCTION log_task_activity();

CREATE TRIGGER comment_activity_trigger
    AFTER INSERT ON comments
    FOR EACH ROW EXECUTE FUNCTION log_comment_activity();
