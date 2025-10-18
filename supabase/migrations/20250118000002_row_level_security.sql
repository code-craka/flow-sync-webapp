-- FlowSync SaaS - Row Level Security Policies
-- This ensures data isolation between organizations and proper permission enforcement

-- =====================================================
-- ENABLE ROW LEVEL SECURITY
-- =====================================================
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- HELPER FUNCTIONS FOR RLS
-- =====================================================

-- Check if user is a member of an organization
CREATE OR REPLACE FUNCTION is_organization_member(org_id UUID, user_id UUID)
RETURNS BOOLEAN AS $$
    SELECT EXISTS (
        SELECT 1 FROM organization_members
        WHERE organization_id = org_id
        AND organization_members.user_id = user_id
    );
$$ LANGUAGE SQL SECURITY DEFINER;

-- Get user's role in an organization
CREATE OR REPLACE FUNCTION get_user_role(org_id UUID, user_id UUID)
RETURNS member_role AS $$
    SELECT role FROM organization_members
    WHERE organization_id = org_id
    AND organization_members.user_id = user_id
    LIMIT 1;
$$ LANGUAGE SQL SECURITY DEFINER;

-- Check if user has at least a certain role level
CREATE OR REPLACE FUNCTION has_role_level(org_id UUID, user_id UUID, required_role member_role)
RETURNS BOOLEAN AS $$
DECLARE
    user_role member_role;
    role_hierarchy INT;
    required_hierarchy INT;
BEGIN
    user_role := get_user_role(org_id, user_id);

    -- Role hierarchy: owner > admin > editor > viewer
    role_hierarchy := CASE user_role
        WHEN 'owner' THEN 4
        WHEN 'admin' THEN 3
        WHEN 'editor' THEN 2
        WHEN 'viewer' THEN 1
        ELSE 0
    END;

    required_hierarchy := CASE required_role
        WHEN 'owner' THEN 4
        WHEN 'admin' THEN 3
        WHEN 'editor' THEN 2
        WHEN 'viewer' THEN 1
    END;

    RETURN role_hierarchy >= required_hierarchy;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- ORGANIZATIONS RLS POLICIES
-- =====================================================

-- Users can view organizations they are members of
CREATE POLICY "Users can view their organizations"
    ON organizations FOR SELECT
    USING (
        auth.uid() = owner_id OR
        is_organization_member(id, auth.uid())
    );

-- Users can create organizations (they become the owner)
CREATE POLICY "Users can create organizations"
    ON organizations FOR INSERT
    WITH CHECK (auth.uid() = owner_id);

-- Only owners can update organizations
CREATE POLICY "Owners can update their organizations"
    ON organizations FOR UPDATE
    USING (auth.uid() = owner_id)
    WITH CHECK (auth.uid() = owner_id);

-- Only owners can delete organizations
CREATE POLICY "Owners can delete their organizations"
    ON organizations FOR DELETE
    USING (auth.uid() = owner_id);

-- =====================================================
-- ORGANIZATION MEMBERS RLS POLICIES
-- =====================================================

-- Members can view other members in their organization
CREATE POLICY "Members can view org members"
    ON organization_members FOR SELECT
    USING (is_organization_member(organization_id, auth.uid()));

-- Owners and admins can add members
CREATE POLICY "Admins can add members"
    ON organization_members FOR INSERT
    WITH CHECK (has_role_level(organization_id, auth.uid(), 'admin'));

-- Owners and admins can update member roles
CREATE POLICY "Admins can update members"
    ON organization_members FOR UPDATE
    USING (has_role_level(organization_id, auth.uid(), 'admin'))
    WITH CHECK (has_role_level(organization_id, auth.uid(), 'admin'));

-- Owners and admins can remove members
CREATE POLICY "Admins can remove members"
    ON organization_members FOR DELETE
    USING (has_role_level(organization_id, auth.uid(), 'admin'));

-- =====================================================
-- PROJECTS RLS POLICIES
-- =====================================================

-- Members can view projects in their organization
CREATE POLICY "Members can view org projects"
    ON projects FOR SELECT
    USING (is_organization_member(organization_id, auth.uid()));

-- Editors and above can create projects
CREATE POLICY "Editors can create projects"
    ON projects FOR INSERT
    WITH CHECK (
        has_role_level(organization_id, auth.uid(), 'editor') AND
        auth.uid() = created_by
    );

-- Editors and above can update projects
CREATE POLICY "Editors can update projects"
    ON projects FOR UPDATE
    USING (has_role_level(organization_id, auth.uid(), 'editor'))
    WITH CHECK (has_role_level(organization_id, auth.uid(), 'editor'));

-- Admins and above can delete projects
CREATE POLICY "Admins can delete projects"
    ON projects FOR DELETE
    USING (has_role_level(organization_id, auth.uid(), 'admin'));

-- =====================================================
-- TASKS RLS POLICIES
-- =====================================================

-- Members can view tasks in projects they have access to
CREATE POLICY "Members can view tasks"
    ON tasks FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM projects
            WHERE projects.id = tasks.project_id
            AND is_organization_member(projects.organization_id, auth.uid())
        )
    );

-- Editors can create tasks
CREATE POLICY "Editors can create tasks"
    ON tasks FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM projects
            WHERE projects.id = tasks.project_id
            AND has_role_level(projects.organization_id, auth.uid(), 'editor')
        ) AND auth.uid() = created_by
    );

-- Editors can update tasks
CREATE POLICY "Editors can update tasks"
    ON tasks FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM projects
            WHERE projects.id = tasks.project_id
            AND has_role_level(projects.organization_id, auth.uid(), 'editor')
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM projects
            WHERE projects.id = tasks.project_id
            AND has_role_level(projects.organization_id, auth.uid(), 'editor')
        )
    );

-- Editors can delete tasks
CREATE POLICY "Editors can delete tasks"
    ON tasks FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM projects
            WHERE projects.id = tasks.project_id
            AND has_role_level(projects.organization_id, auth.uid(), 'editor')
        )
    );

-- =====================================================
-- COMMENTS RLS POLICIES
-- =====================================================

-- Members can view comments on tasks they can access
CREATE POLICY "Members can view comments"
    ON comments FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM tasks
            JOIN projects ON projects.id = tasks.project_id
            WHERE tasks.id = comments.task_id
            AND is_organization_member(projects.organization_id, auth.uid())
        )
    );

-- Members can create comments
CREATE POLICY "Members can create comments"
    ON comments FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM tasks
            JOIN projects ON projects.id = tasks.project_id
            WHERE tasks.id = comments.task_id
            AND is_organization_member(projects.organization_id, auth.uid())
        ) AND auth.uid() = user_id
    );

-- Users can update their own comments
CREATE POLICY "Users can update own comments"
    ON comments FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Users can delete their own comments, admins can delete any
CREATE POLICY "Users can delete own comments"
    ON comments FOR DELETE
    USING (
        auth.uid() = user_id OR
        EXISTS (
            SELECT 1 FROM tasks
            JOIN projects ON projects.id = tasks.project_id
            WHERE tasks.id = comments.task_id
            AND has_role_level(projects.organization_id, auth.uid(), 'admin')
        )
    );

-- =====================================================
-- INVITATIONS RLS POLICIES
-- =====================================================

-- Admins can view invitations for their organization
CREATE POLICY "Admins can view invitations"
    ON invitations FOR SELECT
    USING (has_role_level(organization_id, auth.uid(), 'admin'));

-- Admins can create invitations
CREATE POLICY "Admins can create invitations"
    ON invitations FOR INSERT
    WITH CHECK (
        has_role_level(organization_id, auth.uid(), 'admin') AND
        auth.uid() = invited_by
    );

-- Admins can update invitations
CREATE POLICY "Admins can update invitations"
    ON invitations FOR UPDATE
    USING (has_role_level(organization_id, auth.uid(), 'admin'))
    WITH CHECK (has_role_level(organization_id, auth.uid(), 'admin'));

-- Admins can delete invitations
CREATE POLICY "Admins can delete invitations"
    ON invitations FOR DELETE
    USING (has_role_level(organization_id, auth.uid(), 'admin'));

-- =====================================================
-- ACTIVITY LOGS RLS POLICIES
-- =====================================================

-- Members can view activity in their organization
CREATE POLICY "Members can view activity logs"
    ON activity_logs FOR SELECT
    USING (is_organization_member(organization_id, auth.uid()));

-- System can insert activity logs (via triggers)
CREATE POLICY "Allow activity log creation"
    ON activity_logs FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- =====================================================
-- SUBSCRIPTIONS RLS POLICIES
-- =====================================================

-- Members can view their organization's subscription
CREATE POLICY "Members can view subscription"
    ON subscriptions FOR SELECT
    USING (is_organization_member(organization_id, auth.uid()));

-- Only owners can update subscriptions
CREATE POLICY "Owners can manage subscriptions"
    ON subscriptions FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM organizations
            WHERE organizations.id = subscriptions.organization_id
            AND organizations.owner_id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM organizations
            WHERE organizations.id = subscriptions.organization_id
            AND organizations.owner_id = auth.uid()
        )
    );
