# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FlowSync is a modern, open-source project management SaaS platform designed to compete with Asana, Monday.com, and ClickUp. Built with cutting-edge technologies and a serverless-first architecture, it provides teams with powerful collaboration tools, real-time updates, and a beautiful user experience.

**Repository**: https://github.com/code-craka/flow-sync-webapp

**Version**: v0.5.0 (Phases 1-5 Complete ✅)

**License**: MIT

**Author**: Sayem Abdullah Rihan ([@code-craka](https://github.com/code-craka))

**Email**: codecraka@gmail.com

---

**Tech Stack**: React 18.3.1 + TypeScript 5.9.3 + Vite 4.5.14 + Radix UI + Tailwind CSS + Framer Motion + Supabase

**Package Manager**: Bun 1.3.0 (fastest JavaScript runtime - 10x faster than npm)

**Node Version**: 20.19.1 (see .nvmrc)

## Development Commands

```bash
# Install dependencies (fastest with Bun)
bun install

# Development server (port 3000, IPv6)
bun run dev

# Production build
bun run build

# Preview production build
bun run preview

# Add new package
bun add package-name

# Add dev dependency
bun add -d package-name
```

## Project Status & Roadmap

**Current Release**: v0.5.0 - Billing & Real-time Collaboration Complete ✅

**Overall Progress**: ~85% Complete (Phases 1-5 Done, Phase 6 remaining)

**GitHub**: https://github.com/code-craka/flow-sync-webapp

**Documentation**: See [README.md](README.md), [CHANGELOG.md](CHANGELOG.md), [CONTRIBUTING.md](CONTRIBUTING.md)

**Detailed Progress**: See [SAAS_TRANSFORMATION_PROGRESS.md](SAAS_TRANSFORMATION_PROGRESS.md)

### Phase 1: Foundation & Security ✅ (Complete - January 18, 2025)

- ✅ **Environment & Security Cleanup**
  - Secured all credentials with environment variables
  - No hardcoded API keys in source code
  - Comprehensive `.gitignore` configuration
  - Environment variable validation

- ✅ **Database Schema Design**
  - 9 core tables with complete schema (850+ lines of SQL)
  - Row Level Security (RLS) policies for all tables
  - Data isolation between organizations
  - Role-based permissions (owner/admin/editor/viewer)
  - Auto-create organization on user signup
  - Activity logging triggers

- ✅ **TypeScript Integration**
  - TypeScript 5.9.3 with strict mode
  - 800+ lines of database type definitions
  - 400+ lines of centralized typed queries
  - Full type safety across application

- ✅ **Bun Migration**
  - Package manager migrated from npm to Bun
  - 10x faster installs (40 seconds vs 2-3 minutes)
  - Updated all documentation

- ✅ **Professional Documentation**
  - README with 15+ badges
  - Complete CHANGELOG
  - CONTRIBUTING guidelines
  - MIT LICENSE
  - Database migration guide

### Phase 2: Multi-Tenancy & Team Collaboration ✅ (Complete - January 18, 2025)

- ✅ **Organization System (Phase 2.1)**
  - OrganizationContext with full CRUD operations
  - Organization switcher in app header
  - Auto-slug generation, localStorage persistence
  - Organization settings page with logo upload ready

- ✅ **Role-Based Access Control (Phase 2.2)**
  - usePermissions hook with granular checks
  - PermissionGuard component for conditional rendering
  - Permission hierarchy: owner > admin > editor > viewer
  - UI restrictions based on user role

- ✅ **Invitation System (Phase 2.3)**
  - Email invitations with role selection
  - Token-based acceptance/decline flow
  - Public invitation page (/accept-invitation)
  - Pending invitations management
  - 7-day expiration with validation

- ✅ **Team Management (Phase 2.4)**
  - Real organization members from database
  - Role change functionality (admin+)
  - Member removal with confirmation
  - InviteMemberDialog integration
  - PendingInvitations component

### Phase 3: Project & Task Management ✅ (Complete - January 18, 2025)

- ✅ **Project Management (Phase 3.1)**
  - CreateProjectDialog with color/icon selection
  - Real project CRUD operations
  - Project cards with click-to-navigate
  - Project deletion with cascade
  - Permission-based create/delete

- ✅ **Task Management (Phase 3.2)**
  - CreateTaskDialog with full task details
  - TaskListView grouped by status
  - Task completion toggle (checkbox)
  - Task deletion with confirmation
  - Priority/status badges, due date display
  - Assignee selection from org members

- ✅ **Task Details & Comments (Phase 3.3)**
  - TaskDetailModal with inline editing
  - Full task field editing (title, description, status, priority, assignee, due date)
  - TaskComments component with real-time updates
  - Comment creation and deletion
  - Permission-based edit/delete buttons
  - Time-ago formatting

### Current Implementation Status

- ✅ **Authentication** (Supabase - fully functional)
  - Email/password, OAuth (Google, GitHub), Magic links
  - Session management with auto-refresh
  - Profile auto-sync

- ✅ **Theme System** (fully functional)
  - Light/Dark/System modes
  - Persistent preferences

- ✅ **Multi-Tenancy** (fully functional)
  - Organization CRUD operations
  - Organization switcher
  - Data isolation via RLS policies
  - Auto-organization on signup

- ✅ **Team Management** (fully functional)
  - Invite members via email
  - Accept/decline invitations
  - Role management (owner/admin/editor/viewer)
  - Member removal

- ✅ **Projects** (fully functional)
  - Create, view, navigate, delete
  - Color-coded project cards
  - Permission-based actions

- ✅ **Tasks** (fully functional)
  - Create, view, update, delete, complete
  - Task detail modal with inline editing
  - Comments on tasks
  - Assignee and due date management
  - Status and priority tracking

- ✅ **Real-time Collaboration** (fully functional)
  - Live task and comment updates via WebSocket
  - Online presence indicators showing who's online
  - Real-time activity feed for all organization actions
  - In-app notification system with bell icon
  - Broadcast messaging for typing indicators

- ✅ **Billing & Subscriptions** (fully functional)
  - Polar payment integration (indie hacker friendly)
  - 3 subscription plans (Free, Pro $15/mo, Enterprise $49/mo)
  - Usage limits enforcement (projects, members, tasks, storage)
  - Subscription management UI (cancel, reactivate, change plans)
  - Usage metrics dashboard with progress bars
  - Contextual upgrade prompts when hitting limits

- ⚠️ **E-commerce Integration** (to be removed - Phase 6)
  - Not aligned with project management focus

### Phase 4: Real-time Collaboration ✅ (Complete - January 18, 2025)

- ✅ **Real-time Infrastructure (Phase 4.1)**
  - RealtimeContext for WebSocket connection management
  - useRealtimeSubscription hook for database changes
  - Real-time task and comment updates
  - Channel subscription/unsubscription with auto-cleanup
  - Broadcast messaging and event listening

- ✅ **Presence & Activity (Phase 4.2)**
  - usePresence hook for tracking online users
  - OnlineUsers component with avatar stacks
  - Green "online" indicators
  - ActivityFeed component with live updates
  - Real-time activity stream with animations
  - Time-ago formatting for activity items

- ✅ **Notification System (Phase 4.3)**
  - NotificationContext for centralized notifications
  - NotificationBell component in app header
  - Unread count badge
  - Mark as read/unread functionality
  - Persistent notifications with localStorage
  - Toast notifications for instant feedback

### Phase 5: Billing & Subscriptions (Polar) ✅ (Complete - January 18, 2025)

- ✅ **Polar Integration (Phase 5.1)**
  - Polar API client with 15+ functions (`polarClient.ts`)
  - PricingPlans component with 3 subscription tiers
  - CheckoutSuccessPage with payment verification
  - Secure Polar-hosted checkout pages
  - Monthly/yearly billing toggle with savings calculator

- ✅ **Subscription Management (Phase 5.2)**
  - SubscriptionContext for global subscription state
  - SubscriptionSettings component
  - Cancel/reactivate subscription flows
  - Subscription status indicators
  - Integration with Polar customer portal

- ✅ **Usage Limits & Enforcement (Phase 5.3)**
  - useUsageLimits hook for real-time usage tracking
  - UsageMetrics component with visual progress bars
  - Automatic limit enforcement on actions
  - UpgradePrompt modal for contextual upgrades
  - InlineUpgradePrompt for smaller CTAs
  - Colored progress indicators (green/yellow/orange/red)

### Next Steps (Phase 6)

**Phase 6: Polish & Production**
1. Remove e-commerce features
2. Add error boundaries
3. Testing framework setup
4. Performance optimizations
5. Production deployment

## Project Architecture

### Core System Design

**Authentication Flow**: Supabase handles all auth (email/password, OAuth, OTP). AuthContext (`src/contexts/AuthContext.jsx`) manages session state and auto-syncs user profiles to the `profiles` table on auth state changes. Protected routes check session before rendering.

**Theme System**: ThemeContext (`src/contexts/ThemeContext.jsx`) toggles light/dark mode via CSS class on documentElement. Theme persists to localStorage with key `vite-ui-theme`. All colors use HSL CSS variables defined in `src/index.css`.

**E-commerce Integration**: useCart hook (`src/hooks/useCart.jsx`) manages cart state with localStorage persistence. EcommerceApi (`src/api/EcommerceApi.js`) handles Hostinger API calls for products, variants, and inventory.

**Routing Architecture**: React Router v6 with three layout types:
- Public routes: Header + Content + Footer
- Auth routes: Centered auth forms (AuthLayout)
- App routes: Sidebar + AppHeader + Content (AppLayout)

### Directory Structure

```
src/
├── api/                    # API clients (EcommerceApi - to be removed)
├── components/
│   ├── ui/                # Radix UI wrappers (button, card, dialog, checkbox, badge, etc.)
│   ├── layout/            # Layout components (Header, Sidebar, AppLayout, AppHeader)
│   ├── sections/          # Landing page sections (Hero, Features, Pricing)
│   ├── shared/            # Shared components (OrganizationSwitcher, PermissionGuard)
│   ├── settings/          # Settings components (OrganizationSettings)
│   ├── team/              # Team management (InviteMemberDialog, PendingInvitations)
│   ├── projects/          # Project components (CreateProjectDialog)
│   └── tasks/             # Task components (CreateTaskDialog, TaskListView, TaskDetailModal, TaskComments)
├── contexts/              # React contexts (Auth, Theme, Organization)
├── hooks/                 # Custom hooks (useCart, usePermissions, useOrganization)
├── lib/                   # Utilities and database functions
│   ├── supabaseClient.ts  # Typed Supabase client
│   ├── supabase/
│   │   └── queries.ts     # Centralized database queries (400+ lines)
│   └── utils.js
├── types/                 # TypeScript type definitions
│   ├── database.ts        # Auto-generated database types (800+ lines)
│   └── index.ts           # Application types
├── pages/                 # Route components organized by feature
│   ├── auth/              # SignIn, SignUp
│   ├── legal/             # Terms, Privacy
│   ├── resources/         # Docs, Guides, Blog, Support
│   ├── company/           # About, Careers, Contact
│   ├── DashboardPage.tsx  # Project dashboard
│   ├── ProjectWorkspacePage.tsx  # Task management
│   ├── TeamManagementPage.tsx    # Team members
│   ├── SettingsPage.jsx   # User/org settings
│   └── AcceptInvitationPage.tsx  # Public invitation page
└── supabase/              # Database migrations
    ├── migrations/        # SQL migration files with RLS policies (850+ lines)
    └── README.md          # Migration documentation
```

### Database Schema

**Location**: `supabase/migrations/`

**Core Tables**:
- `profiles` - Extended user information
- `organizations` - Workspaces/teams
- `organization_members` - User-org relationships with roles (owner/admin/editor/viewer)
- `projects` - Projects within organizations
- `tasks` - Tasks within projects with status, priority, assignees
- `comments` - Task comments
- `invitations` - Pending team invitations
- `activity_logs` - Audit trail of all actions
- `subscriptions` - Billing and subscription data

**Security**: All tables have Row Level Security (RLS) policies enforcing:
- Data isolation between organizations
- Role-based permissions (owner > admin > editor > viewer)
- Users can only access their organization's data

**Apply Migrations**: See `supabase/README.md` for instructions on applying schema to your Supabase instance

**Database Queries**: All queries are centralized in `src/lib/supabase/queries.ts` with full TypeScript typing

### Component Patterns

**UI Components**: All UI components wrap Radix UI primitives with Tailwind styling. Use `class-variance-authority` for variant management and `tailwind-merge` for className conflicts.

**Layout Components**: Use React Router's `<Outlet />` for nested routing. AppLayout provides sidebar navigation, AppHeader provides authenticated header.

**Page Components**: Wrap content in `motion.div` from Framer Motion for page transitions. Use Card component for consistent styling.

### State Management

**Global State**:
- **AuthContext**: User session, auth methods (signIn, signUp, signOut)
- **ThemeContext**: Theme state (light/dark) and toggle function
- **OrganizationContext**: Current org, org list, switch/create/update/delete, role detection
- **useCart**: Shopping cart with localStorage persistence (to be removed)

**Custom Hooks**:
- **usePermissions**: Permission checking with granular flags (canEdit, canDelete, etc.)
- **useOrganization**: Organization state and operations
- **useAuth**: Authentication state and methods
- **useTheme**: Theme state and toggle

**Local State**: Use React.useState for component-specific state. No Redux or other global state libraries.

**Persistence**:
- localStorage: Cart items (`flowsync-cart`), theme preference, current organization ID (`flowsync-current-org`)
- Supabase: User profiles, organizations, projects, tasks, comments, invitations

## Configuration Files

### Vite Configuration (`vite.config.js`)

**Path Alias**: `@` → `./src`

**Dev Server**:
- IPv6 enabled (`--host ::`)
- Port 3000
- CORS enabled with `credentialless` policy for iframe support

**Build**:
- External dependencies: `@babel/parser`, `@babel/traverse`, `@babel/generator`, `@babel/types`
- Minification with Terser

**Custom Plugins** (development only):
- Visual editor plugins for Hostinger Horizons integration
- Iframe route restoration for embedded contexts
- Error monitoring and postMessage communication to parent frames

### Tailwind Configuration (`tailwind.config.js`)

**Dark Mode**: Class-based toggle (add/remove `dark` class on `<html>`)

**Color System**: HSL CSS variables for dynamic theming
- Primary, secondary, destructive, muted, accent colors
- Each color has a foreground variant for text
- Border, input, ring colors
- All defined in `src/index.css` with light/dark variants

**Custom Utilities**:
- `gradient-text`: Purple-to-pink gradient text effect
- `soft-shadow`: Subtle card shadows
- `soft-shadow-hover`: Enhanced shadows on hover

**Animations**: Accordion and collapsible slide animations (0.2s duration)

## External Integrations

### Supabase (Primary Backend)

**Environment Variable**: `VITE_SUPABASE_URL` (configured in `.env`)

**Client Initialization**: See `src/lib/supabaseClient.ts` (TypeScript with typed generics)

**Features Used**:
- **Authentication**: Email/password, OAuth (Google, GitHub), Magic links (OTP)
- **PostgreSQL Database**: 9 core tables with Row Level Security
- **Row Level Security**: Automatic data isolation and permission enforcement
- **Auto-triggers**: Organization creation, profile sync, activity logging
- **Real-time subscriptions**: WebSocket-based live updates (ready for Phase 4)
- **Storage**: File storage with CDN (ready for use)

**Auth Flow**:
1. User signs up/signs in via Supabase Auth
2. AuthContext (`src/contexts/AuthContext.jsx`) listens to auth state changes
3. On signup: Database trigger auto-creates organization, adds user as owner, creates free subscription
4. Profile is auto-synced to `profiles` table on auth state change
5. Session stored in Supabase (cookies/localStorage with auto-refresh)

**Database Schema**: See `supabase/migrations/` for complete schema

**Query Functions**: All database operations in `src/lib/supabase/queries.ts` (400+ lines, fully typed)

### Hostinger E-commerce API

**Endpoint**: `https://api-ecommerce.hostinger.com`

**Store ID**: `store_01K7V25HH4FA9E1ER2GJR6EEY1`

**API Client**: `src/api/EcommerceApi.js` provides:
- `getProducts()`: Fetch product catalog
- `getProduct(id)`: Fetch single product with variants
- `extractVariants(product)`: Transform product variants
- `extractImages(product)`: Extract product images
- `formatCurrency(amount, currency)`: Format prices

**Features**: Products, variants, inventory, pricing, collections, images

### Visual Editor (Hostinger Horizons)

**Purpose**: Inline component editing when embedded in Hostinger's visual editor

**Enabled**: Development mode only

**Parent Origins**:
- `https://horizons.hostinger.com`
- `https://horizons.hostinger.dev`
- `https://horizons-frontend-local.hostinger.dev`

**Communication**: PostMessage API for error reporting (Vite errors, runtime errors, console errors, network failures)

## Routing Map

### Public Routes
- `/` - Landing page
- `/pricing` - Pricing
- `/store` - E-commerce store
- `/product/:id` - Product detail
- `/resources/*` - Documentation, guides, support, blog
- `/company/*` - About, careers, contact
- `/legal/*` - Terms, privacy

### Auth Routes
- `/auth/signin` - Sign in
- `/auth/signup` - Sign up

### Protected App Routes (requires session)
- `/app/dashboard` - Project dashboard with real data
- `/app/project/:projectId` - Project workspace with task management
- `/app/team` - Team management with invitations
- `/app/templates` - Templates library (placeholder)
- `/app/calendar` - Calendar (placeholder)
- `/app/settings` - User and organization settings

### Special Routes
- `/accept-invitation?token=xxx` - Public invitation acceptance page

**Fallback**: Redirects to `/app/dashboard` if authenticated, otherwise `/`

## Key Components Reference

### Organization Management

**OrganizationContext** (`src/contexts/OrganizationContext.tsx`)
- Manages current organization state
- Provides CRUD operations for organizations
- Handles organization switching with localStorage persistence
- Auto-loads user role for permission checking
- **Key exports**: `currentOrganization`, `organizations`, `switchOrganization`, `createOrganization`, `updateOrganization`, `deleteOrganization`, `getUserRole`, `hasPermission`

**OrganizationSwitcher** (`src/components/shared/OrganizationSwitcher.tsx`)
- Dropdown for switching between organizations
- Create organization dialog with auto-slug generation
- Displays current organization with Building2 icon
- Integrated in AppHeader

**OrganizationSettings** (`src/components/settings/OrganizationSettings.tsx`)
- Update organization name and slug
- Logo upload (ready for Supabase Storage)
- Organization ID display for API integrations
- Danger zone with delete confirmation (owner only)
- Permission-based UI (admin+ for editing)

### Team Management

**TeamManagementPage** (`src/pages/TeamManagementPage.tsx`)
- Real member list from database
- Role badges with icons (Crown, Shield, Edit, Eye)
- Role change dropdown (admin+)
- Member removal with confirmation (admin+)
- Integrated InviteMemberDialog and PendingInvitations

**InviteMemberDialog** (`src/components/team/InviteMemberDialog.tsx`)
- Email input with validation
- Role selection (Owner/Admin/Editor/Viewer) with descriptions
- Creates invitation with 7-day expiration token
- Toast notifications on success/failure

**PendingInvitations** (`src/components/team/PendingInvitations.tsx`)
- Lists all pending invitations
- Copy invitation link to clipboard
- Revoke invitation with confirmation
- Time-ago formatting and expiration warnings

**AcceptInvitationPage** (`src/pages/AcceptInvitationPage.tsx`)
- Public page accessible via token
- Token validation and expiration checking
- Accept button (redirects to signup if not logged in)
- Decline button
- Email mismatch warning

### Project Management

**DashboardPage** (`src/pages/DashboardPage.tsx`)
- Grid of project cards (responsive 1-4 columns)
- Real data from `getOrganizationProjects()`
- Color-coded project headers with Folder icon
- Click to navigate to project workspace
- Create project button (permission-based)
- Delete project with confirmation
- Loading and empty states

**CreateProjectDialog** (`src/components/projects/CreateProjectDialog.tsx`)
- Project name and description inputs
- Color picker (10 preset colors)
- Icon selection (8 icons - currently all Folder)
- Form validation
- Callback to refresh project list

### Task Management

**ProjectWorkspacePage** (`src/pages/ProjectWorkspacePage.tsx`)
- Project header with back button and color icon
- Create task button (permission-based)
- Sidebar with view options (List active, Board/Calendar coming soon)
- TaskListView integration with refresh trigger

**CreateTaskDialog** (`src/components/tasks/CreateTaskDialog.tsx`)
- Task title and description
- Status dropdown (To Do, In Progress, Review, Done)
- Priority dropdown (Low, Medium, High, Urgent)
- Assignee selection from organization members
- Due date picker
- Form validation

**TaskListView** (`src/components/tasks/TaskListView.tsx`)
- Tasks grouped by status with count
- Status icons (Circle, Clock, Alert, CheckCircle)
- Priority badges with color coding
- Checkbox for quick completion (editors+)
- Click card to open detail modal
- Delete button with confirmation (admins+)
- Due date display with overdue highlighting
- Empty state messaging

**TaskDetailModal** (`src/components/tasks/TaskDetailModal.tsx`)
- Full task details in modal dialog
- Edit mode with inline field editing
- Status and priority badges
- Assignee and due date display
- Edit/Save/Cancel buttons (permission-based)
- Delete button with confirmation (admins+)
- Integrated TaskComments component
- Responsive max-width layout

**TaskComments** (`src/components/tasks/TaskComments.tsx`)
- Comment form with textarea
- Real-time comment list with avatars
- Time-ago formatting (just now, 5m ago, 2h ago, etc.)
- Delete own comments with confirmation
- Edit indicator for modified comments
- Comment count display
- Empty state with encouraging message

### Permission System

**usePermissions** (`src/hooks/usePermissions.ts`)
- Returns user role and permission flags
- **Role checks**: `isOwner`, `isAdmin`, `canEdit`, `canView`
- **Organization**: `canDeleteOrganization`, `canEditOrganization`
- **Members**: `canManageMembers`, `canInviteMembers`, `canRemoveMembers`, `canChangeRoles`
- **Projects**: `canManageProjects`
- **Tasks**: `canCreateTasks`, `canEditTasks`, `canDeleteTasks`, `canAssignTasks`
- **Generic**: `hasPermission(requiredRole)` with role hierarchy

**PermissionGuard** (`src/components/shared/PermissionGuard.tsx`)
- Conditionally render children based on permissions
- Props: `requiredRole`, `hasPermission`, `fallback`, `disableOnly`
- Can hide completely or just disable elements
- HOC version: `withPermission(Component, guardProps)`

### UI Components (Radix wrappers in `src/components/ui/`)

**Core Components**:
- Button, Card, Input, Label, Textarea
- Dialog, AlertDialog, DropdownMenu, Select
- Avatar, Badge, Checkbox, Separator
- Table, Tabs, Tooltip, Switch
- Toast/Toaster for notifications

All follow shadcn/ui patterns with Tailwind styling and CVA variants.

## Important Patterns

### Adding a New Page

1. Create page component in `src/pages/`
2. Wrap in appropriate layout (AppLayout for protected routes)
3. Add route to `src/App.jsx`
4. For protected routes, ensure AuthContext session check

### Adding a New UI Component

1. Check if Radix UI has a primitive for it
2. If yes, create wrapper in `src/components/ui/` following existing patterns
3. Use `class-variance-authority` for variants
4. Use `tailwind-merge` to handle className conflicts
5. Use HSL color variables from theme system

### Working with Cart State

```jsx
import { useCart } from '@/hooks/useCart';

const { items, addItem, removeItem, updateQuantity, clearCart, total } = useCart();

// Add item
addItem({ id: '1', name: 'Product', price: 29.99, quantity: 1 });

// Update quantity
updateQuantity('1', 2);

// Remove item
removeItem('1');
```

### Working with Authentication

```jsx
import { useAuth } from '@/contexts/AuthContext';

const { user, session, loading, signIn, signUp, signOut } = useAuth();

// Sign in
await signIn(email, password);

// Sign up
await signUp(email, password, metadata);

// Sign out
await signOut();

// Check if authenticated
if (session) {
  // User is logged in
}
```

### Working with Theme

```jsx
import { useTheme } from '@/contexts/ThemeContext';

const { theme, setTheme } = useTheme();

// Toggle theme
setTheme(theme === 'dark' ? 'light' : 'dark');
```

### Working with Database (TypeScript)

**IMPORTANT**: Always use centralized query functions from `src/lib/supabase/queries.ts`. Never write raw Supabase queries in components.

```typescript
import {
  getUserOrganizations,
  getOrganizationProjects,
  createProject,
  getProjectTasks,
  createTask
} from '@/lib/supabase/queries';

// Get user's organizations
const organizations = await getUserOrganizations(userId);

// Get projects for an organization
const projects = await getOrganizationProjects(orgId);

// Create a new project
const newProject = await createProject({
  organization_id: orgId,
  name: 'New Project',
  description: 'Project description',
  color: '#3B82F6',
  icon: 'folder',
  status: 'active',
  created_by: userId
});

// Get tasks for a project
const tasks = await getProjectTasks(projectId);

// Create a new task
const newTask = await createTask({
  project_id: projectId,
  title: 'New Task',
  description: 'Task description',
  status: 'todo',
  priority: 'medium',
  created_by: userId,
  assignee_id: userId
});
```

**Type Safety**: All query functions are fully typed with TypeScript. Your IDE will provide autocomplete and type checking.

**Error Handling**: All query functions throw errors. Always use try/catch:

```typescript
try {
  const projects = await getOrganizationProjects(orgId);
  // Use projects
} catch (error) {
  console.error('Failed to fetch projects:', error);
  // Show error to user
}
```

**Available Query Functions** (see `src/lib/supabase/queries.ts` for full list):
- **Profiles**: `getProfile()`, `updateProfile()`
- **Organizations**: `getUserOrganizations()`, `getOrganization()`, `createOrganization()`, `updateOrganization()`, `deleteOrganization()`
- **Members**: `getOrganizationMembers()`, `getUserRole()`, `updateMemberRole()`, `removeMember()`
- **Projects**: `getOrganizationProjects()`, `getProject()`, `createProject()`, `updateProject()`, `deleteProject()`
- **Tasks**: `getProjectTasks()`, `getTask()`, `createTask()`, `updateTask()`, `deleteTask()`
- **Comments**: `getTaskComments()`, `createComment()`, `updateComment()`, `deleteComment()`
- **Invitations**: `getOrganizationInvitations()`, `createInvitation()`, `acceptInvitation()`, `declineInvitation()`
- **Activity**: `getOrganizationActivity()`
- **Subscriptions**: `getOrganizationSubscription()`, `updateSubscription()`

## Build Considerations

**External Dependencies**: Babel modules are externalized and not bundled. This is intentional for the visual editor integration.

**CORS Policy**: Dev server uses `credentialless` policy to support iframe embedding.

**Error Monitoring**: In development, errors are communicated to parent frames via postMessage for Hostinger Horizons integration.

**Asset Optimization**: Images use Unsplash URLs. Consider adding local image optimization in production.

## Known Limitations & Future Work

### Current Limitations
- **No testing framework** - Jest or Vitest needs to be added (Phase 6)
- **Mock data** - DashboardPage, TeamManagementPage, ProjectWorkspacePage use hardcoded data (Phases 2-3)
- **Supabase anon key exposed** - Standard practice for client-side Supabase, protected by RLS
- **E-commerce integration** - To be removed in Phase 6 cleanup
- **Visual editor features** - Only work in Hostinger Horizons environment (legacy)

### Phase 2 Priorities (Next)
1. Create OrganizationContext for state management
2. Build organization switcher component
3. Implement real team management (replace mock data)
4. Add invitation system for team members
5. Role-based UI restrictions

### Phase 3 Priorities
1. Replace project mock data with real CRUD operations
2. Implement task management with full functionality
3. Add comments system
4. Build Kanban board view
5. Add calendar view for tasks

### Testing Strategy (Phase 6)
- **Unit tests**: Utility functions, hooks, query functions
- **Component tests**: UI components with React Testing Library
- **Integration tests**: User flows (signup → create org → create project → create task)
- **E2E tests**: Critical paths with Playwright

### Performance Optimizations (Phase 6)
- Code splitting per route
- Lazy loading for heavy components
- Image optimization
- Bundle size analysis
- React Query for data fetching and caching

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines on:
- Code standards
- Commit message format
- Pull request process
- Development workflow

## Resources

- **GitHub Repository**: https://github.com/code-craka/flow-sync-webapp
- **Issue Tracker**: https://github.com/code-craka/flow-sync-webapp/issues
- **Releases**: https://github.com/code-craka/flow-sync-webapp/releases
- **License**: [MIT](LICENSE)
- **Author**: Sayem Abdullah Rihan ([@code-craka](https://github.com/code-craka))
- **Email**: codecraka@gmail.com

---

**Last Updated**: January 18, 2025 - v0.1.0 Release
