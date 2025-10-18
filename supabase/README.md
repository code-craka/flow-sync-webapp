# FlowSync Database Migrations

This directory contains SQL migrations for the FlowSync SaaS application using Supabase PostgreSQL.

## Migration Files

1. **20250118000001_initial_schema.sql** - Core database schema
   - Organizations (workspaces/teams)
   - Organization members with roles
   - Projects with status tracking
   - Tasks with assignees and priorities
   - Comments system
   - Invitations
   - Activity logs
   - Subscriptions for billing

2. **20250118000002_row_level_security.sql** - Security policies
   - Row Level Security (RLS) policies for all tables
   - Data isolation between organizations
   - Role-based access control (owner, admin, editor, viewer)
   - Helper functions for permission checks

3. **20250118000003_profiles_and_auto_org.sql** - User profiles and automation
   - Extended user profiles
   - Automatic organization creation on user signup
   - Activity logging triggers
   - Default free trial subscription

## How to Apply Migrations

### Option 1: Supabase Dashboard (Easiest)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Open each migration file in order (001, 002, 003)
4. Copy the contents and paste into the SQL Editor
5. Click **Run** for each migration

### Option 2: Supabase CLI (Recommended for Production)

```bash
# Install Supabase CLI if you haven't
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Apply migrations
supabase db push
```

### Option 3: Manual SQL Execution

If using the Supabase library directly:

```javascript
import { supabase } from './lib/supabaseClient';
import fs from 'fs';

const migrations = [
  '20250118000001_initial_schema.sql',
  '20250118000002_row_level_security.sql',
  '20250118000003_profiles_and_auto_org.sql'
];

for (const migration of migrations) {
  const sql = fs.readFileSync(`./supabase/migrations/${migration}`, 'utf8');
  await supabase.rpc('exec_sql', { sql });
}
```

## Database Schema Overview

### Core Entities

```
auth.users (Supabase managed)
    ↓
profiles (1:1)
    ↓
organizations (many)
    ├── organization_members (many-to-many with users)
    ├── projects (many)
    │   └── tasks (many)
    │       └── comments (many)
    ├── invitations (many)
    ├── activity_logs (many)
    └── subscriptions (1:1)
```

### Permission Hierarchy

- **Owner**: Full control, can delete organization, manage billing
- **Admin**: Can manage members, projects, and settings
- **Editor**: Can create/edit projects and tasks
- **Viewer**: Read-only access

### Subscription Plans

- **Free**: Limited features for trial users
- **Starter**: Basic plan for individuals
- **Professional**: Full features for teams
- **Enterprise**: Custom features and support

## Testing Migrations

After applying migrations, verify with these queries:

```sql
-- Check if all tables exist
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;

-- Verify RLS is enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public';

-- Test organization creation (this happens automatically on signup)
-- But you can manually test:
INSERT INTO auth.users (id, email) VALUES
(uuid_generate_v4(), 'test@example.com');
-- Check if organization and profile were created

-- Verify permissions work
SELECT has_role_level(
    (SELECT id FROM organizations LIMIT 1),
    auth.uid(),
    'editor'::member_role
);
```

## Rollback

If you need to rollback migrations, run these in reverse order:

```sql
-- Drop all tables and functions
DROP TABLE IF EXISTS activity_logs CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS invitations CASCADE;
DROP TABLE IF EXISTS subscriptions CASCADE;
DROP TABLE IF EXISTS organization_members CASCADE;
DROP TABLE IF EXISTS organizations CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

DROP TYPE IF EXISTS member_role CASCADE;
DROP TYPE IF EXISTS project_status CASCADE;
DROP TYPE IF EXISTS task_status CASCADE;
DROP TYPE IF EXISTS task_priority CASCADE;
DROP TYPE IF EXISTS invitation_status CASCADE;
DROP TYPE IF EXISTS activity_type CASCADE;
DROP TYPE IF EXISTS subscription_plan CASCADE;
DROP TYPE IF EXISTS subscription_status CASCADE;

DROP FUNCTION IF EXISTS update_updated_at_column CASCADE;
DROP FUNCTION IF EXISTS is_organization_member CASCADE;
DROP FUNCTION IF EXISTS get_user_role CASCADE;
DROP FUNCTION IF EXISTS has_role_level CASCADE;
DROP FUNCTION IF EXISTS handle_new_user CASCADE;
DROP FUNCTION IF EXISTS log_project_activity CASCADE;
DROP FUNCTION IF EXISTS log_task_activity CASCADE;
DROP FUNCTION IF EXISTS log_comment_activity CASCADE;
```

## Notes

- All timestamps are stored in UTC
- UUIDs are used for all primary keys
- Row Level Security ensures data isolation
- Triggers automatically create activity logs
- New users get a default organization and 14-day trial

## Troubleshooting

### "relation already exists" error
- Some tables may already exist (like `profiles`)
- The migrations use `CREATE TABLE IF NOT EXISTS` to handle this
- Safe to re-run migrations

### Permission denied errors
- Ensure you're connected as the Supabase service role or superuser
- RLS policies are in place, use service role for admin operations

### Trigger not firing
- Check that `auth.users` table is accessible
- Verify the trigger is created: `\d auth.users` in psql
- Check Supabase logs for errors

## Next Steps

After applying migrations:

1. ✅ Test user signup flow
2. ✅ Verify organization creation
3. ✅ Test permission system with different roles
4. ✅ Set up Stripe webhook integration
5. ✅ Configure email templates for invitations
