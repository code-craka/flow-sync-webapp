# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FlowSync is a modern, open-source project management SaaS platform designed to compete with Asana, Monday.com, and ClickUp. Built with cutting-edge technologies and a serverless-first architecture, it provides teams with powerful collaboration tools, real-time updates, and a beautiful user experience.

**Repository**: https://github.com/code-craka/flow-sync-webapp

**Version**: v0.1.0 (Phase 1 Complete ✅)

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

**Current Release**: v0.1.0 - Foundation Complete ✅

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

### Current Implementation Status

- ✅ **Authentication** (Supabase - fully functional)
  - Email/password, OAuth (Google, GitHub), Magic links
  - Session management with auto-refresh
  - Profile auto-sync

- ✅ **Theme System** (fully functional)
  - Light/Dark/System modes
  - Persistent preferences

- ✅ **Database Architecture** (ready for use)
  - Multi-tenant schema
  - RLS policies enforced
  - Auto-organization creation

- ⚠️ **E-commerce Integration** (to be removed - Phase 6)
  - Not aligned with project management focus

- 🔄 **Organizations/Workspaces** (Phase 2 - Next)
  - Database schema ready
  - UI implementation pending

- 🔄 **Projects** (Phase 3)
  - UI exists but uses mock data
  - Real CRUD operations needed

- 🔄 **Tasks** (Phase 3)
  - UI exists but uses mock data
  - Real CRUD operations needed

- 🔄 **Team Management** (Phase 2)
  - Database schema ready
  - Replace mock data with real queries

- 📅 **Billing/Subscriptions** (Phase 5)
  - Database schema ready
  - Stripe integration planned

- 📅 **Real-time Collaboration** (Phase 4)
  - Supabase Realtime ready
  - WebSocket integration planned

### Next Steps (Phase 2 - Week 2)

1. **Organization Context** - State management for workspaces
2. **Organization Switcher** - UI component to switch between orgs
3. **Role-Based UI** - Permission guards and restrictions
4. **Invitation System** - Email invites with accept/decline
5. **Team Management** - Real member management with roles

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
│   ├── ui/                # Radix UI wrappers (button, card, dialog, etc.)
│   ├── layout/            # Layout components (Header, Sidebar, AppLayout)
│   ├── sections/          # Landing page sections (Hero, Features, Pricing)
│   └── shared/            # Shared components (AiAssistantButton)
├── contexts/              # React contexts (Auth, Theme, Organization - TBD)
├── hooks/                 # Custom hooks (useCart, useOrganization - TBD)
├── lib/                   # Utilities and database functions
│   ├── supabaseClient.ts  # Typed Supabase client
│   ├── supabase/
│   │   └── queries.ts     # Centralized database queries
│   └── utils.js
├── types/                 # TypeScript type definitions
│   ├── database.ts        # Auto-generated database types
│   └── index.ts           # Application types
├── pages/                 # Route components organized by feature
│   ├── auth/
│   ├── legal/
│   ├── resources/
│   └── company/
└── supabase/              # Database migrations
    ├── migrations/        # SQL migration files with RLS policies
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
- AuthContext: User session, auth methods (signIn, signUp, signOut)
- ThemeContext: Theme state (light/dark) and toggle function
- useCart: Shopping cart with localStorage persistence

**Local State**: Use React.useState for component-specific state. No Redux or other global state libraries.

**Persistence**:
- localStorage: Cart items (`flowsync-cart`), theme preference
- Supabase: User profiles, authentication tokens

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
- `/app/dashboard` - Main dashboard
- `/app/project/:projectId` - Project workspace
- `/app/team` - Team management
- `/app/templates` - Templates library
- `/app/calendar` - Calendar
- `/app/settings` - User settings

**Fallback**: Redirects to `/app/dashboard` if authenticated, otherwise `/`

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
