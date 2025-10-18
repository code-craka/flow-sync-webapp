# 🚀 FlowSync - Modern Project Management SaaS Platform

<div align="center">

![FlowSync Logo](https://img.shields.io/badge/FlowSync-Project%20Management-6366f1?style=for-the-badge&logo=trello&logoColor=white)

**A modern, full-featured project management SaaS platform built with React, TypeScript, and Supabase**

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)
[![Bun](https://img.shields.io/badge/Bun-1.3.0-f472b6?style=flat-square&logo=bun&logoColor=white)](https://bun.sh)
[![React](https://img.shields.io/badge/React-18.3.1-61dafb?style=flat-square&logo=react&logoColor=white)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-4.5.14-646cff?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ecf8e?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.18-06b6d4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

[![Status](https://img.shields.io/badge/Status-In%20Development-yellow?style=flat-square)](SAAS_TRANSFORMATION_PROGRESS.md)
[![Phase](https://img.shields.io/badge/Phase-1%20Complete-success?style=flat-square)](SAAS_TRANSFORMATION_PROGRESS.md)
[![Progress](https://img.shields.io/badge/Progress-15%25-orange?style=flat-square)](SAAS_TRANSFORMATION_PROGRESS.md)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Documentation](#-documentation) • [Roadmap](#-roadmap) • [Contributing](#-contributing)

</div>

---

## 📖 Overview

FlowSync is a modern, enterprise-grade project management SaaS platform designed to compete with industry leaders like Asana, Monday.com, and ClickUp. Built with cutting-edge technologies and a serverless-first architecture, FlowSync provides teams with powerful collaboration tools, real-time updates, and a beautiful user experience.

### 🎯 Key Highlights

- **🏢 Multi-Tenancy**: Complete workspace/organization support with data isolation
- **🔐 Enterprise Security**: Row Level Security (RLS) with role-based access control
- **⚡ Real-Time Collaboration**: Live updates across all users (coming soon)
- **🎨 Beautiful UI**: Modern design with Radix UI components and Tailwind CSS
- **📱 Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **🚀 Blazing Fast**: Powered by Bun and Vite for instant development feedback
- **🔒 Type-Safe**: Full TypeScript coverage with strict mode enabled
- **💳 Subscription Billing**: Stripe integration for seamless payments (coming soon)

---

## ✨ Features

### Current (Phase 1 - Foundation Complete ✅)

- ✅ **Secure Authentication**
  - Email/Password authentication
  - OAuth (Google, GitHub)
  - Magic link (OTP) authentication
  - Session management with auto-refresh

- ✅ **User Profiles**
  - Extended profile information
  - Avatar support
  - Auto-sync with authentication

- ✅ **Theme System**
  - Light/Dark/System modes
  - Persistent preferences
  - Smooth transitions

- ✅ **Database Architecture**
  - Complete multi-tenant schema
  - Row Level Security (RLS) policies
  - Automatic organization creation on signup
  - Activity logging and audit trail

- ✅ **Type Safety**
  - Full TypeScript integration
  - Auto-generated database types
  - Centralized typed query functions

### Coming Soon (Phases 2-6)

- 🔄 **Organizations & Workspaces** (Phase 2)
  - Create and manage multiple workspaces
  - Organization switcher
  - Workspace settings and branding

- 🔄 **Team Collaboration** (Phase 2)
  - Invite team members via email
  - Role-based permissions (Owner, Admin, Editor, Viewer)
  - Member management

- 🔄 **Project Management** (Phase 3)
  - Create and organize projects
  - Project status tracking
  - Custom colors and icons
  - Project archiving

- 🔄 **Task Management** (Phase 3)
  - Create, assign, and track tasks
  - Multiple views: List, Kanban, Calendar, Timeline
  - Task priorities and due dates
  - Comments and mentions
  - File attachments

- 🔄 **Real-Time Collaboration** (Phase 4)
  - Live updates across all users
  - User presence indicators
  - Typing indicators
  - Conflict resolution

- 🔄 **Notifications** (Phase 4)
  - In-app notification center
  - Email notifications
  - Mention notifications
  - Activity feed

- 🔄 **Billing & Subscriptions** (Phase 5)
  - Stripe integration
  - Multiple pricing tiers
  - Usage-based limits
  - Subscription management

- 🔄 **Analytics & Reporting** (Phase 6)
  - Project insights
  - Team productivity metrics
  - Export capabilities

---

## 🛠️ Tech Stack

### Core Technologies

- **[React 18.3.1](https://reactjs.org)** - UI framework with concurrent features
- **[TypeScript 5.9.3](https://www.typescriptlang.org)** - Type-safe JavaScript
- **[Vite 4.5.14](https://vitejs.dev)** - Next-generation frontend tooling
- **[Bun 1.3.0](https://bun.sh)** - All-in-one JavaScript runtime (10x faster than npm)

### Backend & Database

- **[Supabase](https://supabase.com)** - Serverless PostgreSQL database
- **Row Level Security (RLS)** - Database-level authorization
- **Supabase Auth** - Multi-provider authentication
- **Supabase Realtime** - WebSocket-based live updates
- **Supabase Storage** - File storage and CDN

### UI & Styling

- **[Tailwind CSS 3.4.18](https://tailwindcss.com)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com)** - Unstyled, accessible components
- **[Framer Motion 10.18.0](https://www.framer.com/motion)** - Animation library
- **[Lucide React](https://lucide.dev)** - Beautiful icon set
- **[class-variance-authority](https://cva.style)** - Component variant management

### Developer Experience

- **TypeScript Strict Mode** - Maximum type safety
- **ESLint** - Code quality and consistency
- **PostCSS + Autoprefixer** - CSS processing
- **Environment Variables** - Secure configuration management

### Future Integrations

- **Stripe** - Payment processing
- **Sentry** - Error monitoring
- **Analytics** - Usage tracking
- **Email Service** - Transactional emails

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20.19.1 or higher (see `.nvmrc`)
- **Bun** 1.3.0 or higher (recommended) or npm
- **Supabase Account** ([Sign up free](https://supabase.com))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/code-craka/flow-sync-webapp.git
   cd flow-sync-webapp
   ```

2. **Install dependencies**
   ```bash
   # Using Bun (recommended - 10x faster)
   bun install

   # Or using npm
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example file
   cp .env.example .env

   # Edit .env and add your Supabase credentials
   # Get them from: https://app.supabase.com/project/_/settings/api
   ```

4. **Apply database migrations**

   See [supabase/README.md](supabase/README.md) for detailed instructions.

   **Quick method** (Supabase Dashboard):
   - Go to your Supabase project → SQL Editor
   - Run each migration file in order:
     1. `20250118000001_initial_schema.sql`
     2. `20250118000002_row_level_security.sql`
     3. `20250118000003_profiles_and_auto_org.sql`

5. **Start the development server**
   ```bash
   bun run dev
   # Opens on http://localhost:3000
   ```

### Project Structure

```
flowsync-webapp/
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # Radix UI wrappers
│   │   ├── layout/       # Layout components
│   │   ├── sections/     # Landing page sections
│   │   └── shared/       # Shared components
│   ├── contexts/         # React contexts (Auth, Theme, etc.)
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utilities and configurations
│   │   ├── supabaseClient.ts
│   │   └── supabase/
│   │       └── queries.ts # Centralized database queries
│   ├── pages/            # Route components
│   ├── types/            # TypeScript type definitions
│   │   ├── database.ts   # Auto-generated DB types
│   │   └── index.ts      # Application types
│   └── main.tsx          # Application entry point
├── supabase/
│   ├── migrations/       # Database migration files
│   └── README.md         # Migration documentation
├── public/               # Static assets
├── .env                  # Environment variables (not in git)
├── .env.example          # Environment template
├── tsconfig.json         # TypeScript configuration
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── package.json          # Project dependencies
```

---

## 📚 Documentation

- **[SAAS_TRANSFORMATION_PROGRESS.md](SAAS_TRANSFORMATION_PROGRESS.md)** - Detailed progress report and implementation notes
- **[CLAUDE.md](CLAUDE.md)** - Architecture documentation and development guide
- **[supabase/README.md](supabase/README.md)** - Database schema and migration guide
- **[CHANGELOG.md](CHANGELOG.md)** - Version history and release notes
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Contribution guidelines

---

## 🗺️ Roadmap

### Phase 1: Foundation & Security ✅ (Complete)
- [x] Environment & security cleanup
- [x] Database schema with RLS
- [x] TypeScript migration
- [x] Bun integration

### Phase 2: Multi-Tenancy & Teams (Week 2)
- [ ] Organization system
- [ ] Role-based access control
- [ ] Invitation system
- [ ] Team management

### Phase 3: Core Features (Week 3)
- [ ] Project management
- [ ] Task management
- [ ] Comments system

### Phase 4: Real-Time Collaboration (Week 4)
- [ ] Real-time updates
- [ ] User presence
- [ ] Notifications

### Phase 5: Billing & Subscriptions (Week 5)
- [ ] Stripe integration
- [ ] Subscription management
- [ ] Usage limits

### Phase 6: Polish & Launch (Week 6)
- [ ] Onboarding flow
- [ ] Analytics integration
- [ ] Testing & QA
- [ ] Production deployment

**See [SAAS_TRANSFORMATION_PROGRESS.md](SAAS_TRANSFORMATION_PROGRESS.md) for detailed progress tracking.**

---

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run type checking: `bun tsc --noEmit`
5. Run linting: `bun run lint`
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Sayem Abdullah Rihan**

- GitHub: [@code-craka](https://github.com/code-craka)
- Email: [codecraka@gmail.com](mailto:codecraka@gmail.com)

---

## 🙏 Acknowledgments

- [Supabase](https://supabase.com) - Amazing backend-as-a-service platform
- [Radix UI](https://www.radix-ui.com) - Accessible component primitives
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [Bun](https://bun.sh) - Lightning-fast JavaScript runtime
- [Vite](https://vitejs.dev) - Next-generation frontend tooling

---

## 📊 Project Status

![Phase 1 Complete](https://img.shields.io/badge/Phase%201-Complete-success?style=flat-square)
![Phase 2](https://img.shields.io/badge/Phase%202-In%20Planning-blue?style=flat-square)
![Overall Progress](https://img.shields.io/badge/Overall%20Progress-15%25-orange?style=flat-square)

**Last Updated**: January 18, 2025

---

<div align="center">

**Built with ❤️ by [Sayem Abdullah Rihan](https://github.com/code-craka)**

[![Star this repo](https://img.shields.io/github/stars/code-craka/flow-sync-webapp?style=social)](https://github.com/code-craka/flow-sync-webapp)
[![Follow @code-craka](https://img.shields.io/github/followers/code-craka?style=social)](https://github.com/code-craka)

</div>
