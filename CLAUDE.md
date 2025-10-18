# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FlowSync Webapp is a modern React 18 SPA being transformed into a full-featured Project Management SaaS platform (like Asana/Monday.com). Built with Vite + TypeScript, it uses Supabase for serverless backend with Row Level Security for multi-tenancy.

**Tech Stack**: React 18.3.1 + TypeScript 5.9.3 + Vite 4.5.14 + Radix UI + Tailwind CSS + Framer Motion + Supabase

**Package Manager**: Bun 1.3.0 (fastest JavaScript runtime)

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

## SaaS Architecture (Current State)

**Status**: Under active transformation from prototype to production SaaS

**Phase 1 Complete** ✅:
- Environment variables secured (no hardcoded credentials)
- Complete database schema with RLS policies
- TypeScript configuration and type definitions
- Bun package manager migration

**Current Implementation**:
- ✅ Authentication (Supabase - fully functional)
- ✅ Theme system (light/dark mode)
- ⚠️ E-commerce integration (to be removed - not core feature)
- ❌ Organizations/Workspaces (planned)
- ❌ Projects (UI only - needs real CRUD)
- ❌ Tasks (UI only - needs real CRUD)
- ❌ Team management (mock data)
- ❌ Billing/Subscriptions (Stripe integration planned)
- ❌ Real-time collaboration (planned)

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

### Supabase

**Instance**: `icwvyhodxprpvkolbjnq.supabase.co`

**Client Initialization**: See `src/lib/supabaseClient.js`

**Features Used**:
- Authentication (email, OAuth, OTP)
- PostgreSQL database
- User profiles table (auto-synced on auth state change)
- Real-time subscriptions

**Auth Flow**:
1. User signs in via Supabase Auth
2. AuthContext listens to auth state changes
3. On session change, profile is upserted to `profiles` table
4. Session stored in Supabase (cookies/localStorage)

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

## Build Considerations

**External Dependencies**: Babel modules are externalized and not bundled. This is intentional for the visual editor integration.

**CORS Policy**: Dev server uses `credentialless` policy to support iframe embedding.

**Error Monitoring**: In development, errors are communicated to parent frames via postMessage for Hostinger Horizons integration.

**Asset Optimization**: Images use Unsplash URLs. Consider adding local image optimization in production.

## Known Limitations

- No testing framework configured (consider adding Jest or Vitest)
- Some pages contain mock data (DashboardPage, TeamManagementPage)
- Supabase anon key is exposed in client code (standard for public operations)
- Visual editor features only work in Hostinger Horizons environment
