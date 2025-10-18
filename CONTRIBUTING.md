# Contributing to FlowSync

First off, thank you for considering contributing to FlowSync! 🎉

FlowSync is an open-source project management SaaS platform, and we welcome contributions from the community. Whether you're fixing a bug, adding a new feature, improving documentation, or suggesting improvements, your help is appreciated!

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)
- [Community](#community)

---

## Code of Conduct

This project adheres to a code of conduct that we expect all contributors to follow. Please be respectful, inclusive, and constructive in all interactions.

### Our Standards

- **Be respectful**: Treat everyone with respect and kindness
- **Be inclusive**: Welcome newcomers and diverse perspectives
- **Be constructive**: Provide helpful feedback and suggestions
- **Be patient**: Remember that everyone is learning
- **Be professional**: Keep discussions focused and on-topic

---

## Getting Started

### Prerequisites

Before you begin, make sure you have:

- **Node.js** 20.19.1+ (see `.nvmrc`)
- **Bun** 1.3.0+ ([Install Bun](https://bun.sh))
- **Git** for version control
- **Supabase Account** ([Sign up free](https://supabase.com))
- **Code Editor** (VS Code recommended with Prettier + ESLint extensions)

### Areas We Need Help

We're especially looking for contributions in these areas:

- 🐛 **Bug fixes**: Report and fix bugs you encounter
- ✨ **New features**: Implement features from our roadmap
- 📖 **Documentation**: Improve docs, add examples, fix typos
- 🎨 **UI/UX**: Enhance design and user experience
- 🧪 **Testing**: Add unit tests, integration tests, e2e tests
- ♿ **Accessibility**: Improve keyboard navigation, screen reader support
- 🌍 **Internationalization**: Add translations and i18n support
- ⚡ **Performance**: Optimize rendering, reduce bundle size

---

## Development Setup

### 1. Fork and Clone

```bash
# Fork the repo on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/flow-sync-webapp.git
cd flow-sync-webapp

# Add upstream remote
git remote add upstream https://github.com/code-craka/flow-sync-webapp.git
```

### 2. Install Dependencies

```bash
# Using Bun (recommended - 10x faster)
bun install

# Or using npm
npm install
```

### 3. Set Up Environment

```bash
# Copy environment template
cp .env.example .env

# Edit .env and add your Supabase credentials
# Get them from: https://app.supabase.com/project/_/settings/api
```

### 4. Apply Database Migrations

See [supabase/README.md](supabase/README.md) for detailed instructions on setting up the database.

### 5. Start Development Server

```bash
bun run dev
# Opens on http://localhost:3000
```

### 6. Verify Setup

- Visit http://localhost:3000
- Try signing up for a new account
- Check Supabase dashboard to verify organization was created
- Test theme switching (light/dark mode)

---

## How to Contribute

### 🐛 Reporting Bugs

Before creating a bug report:

1. **Check existing issues** to avoid duplicates
2. **Use the latest version** to confirm the bug still exists
3. **Provide clear reproduction steps**

When creating a bug report, include:

- **Description**: Clear and concise description of the bug
- **Steps to Reproduce**: Numbered list of steps to reproduce
- **Expected Behavior**: What you expected to happen
- **Actual Behavior**: What actually happened
- **Screenshots**: If applicable
- **Environment**: Browser, OS, Node version, etc.
- **Additional Context**: Any other relevant information

### ✨ Suggesting Features

Before suggesting a feature:

1. **Check the roadmap** in [SAAS_TRANSFORMATION_PROGRESS.md](SAAS_TRANSFORMATION_PROGRESS.md)
2. **Search existing issues** to see if it's already proposed
3. **Consider if it aligns** with the project's goals

When suggesting a feature:

- **Use Case**: Describe the problem this feature solves
- **Proposed Solution**: How you envision the feature working
- **Alternatives**: Other solutions you've considered
- **Additional Context**: Mockups, examples, references

### 💻 Code Contributions

1. **Find or create an issue** to work on
2. **Comment on the issue** to let others know you're working on it
3. **Fork the repo** and create a feature branch
4. **Implement your changes** following our coding standards
5. **Test your changes** thoroughly
6. **Submit a pull request** with a clear description

---

## Pull Request Process

### Before Submitting

- [ ] Code follows the [Coding Standards](#coding-standards)
- [ ] Commits follow the [Commit Guidelines](#commit-guidelines)
- [ ] Code passes TypeScript type checking (`bun tsc --noEmit`)
- [ ] Code passes linting (`bun run lint`)
- [ ] All tests pass (once testing is set up)
- [ ] Documentation is updated if needed
- [ ] No merge conflicts with `main` branch

### PR Checklist

When submitting a pull request:

1. **Create a descriptive title**
   - Good: "Add organization switcher component"
   - Bad: "Update code"

2. **Write a clear description**
   - What changes were made?
   - Why were these changes necessary?
   - How do these changes work?
   - Any breaking changes?
   - Screenshots/GIFs for UI changes

3. **Link related issues**
   - Use "Fixes #123" or "Closes #456" in the description

4. **Request review**
   - Tag relevant maintainers if needed

5. **Respond to feedback**
   - Address review comments promptly
   - Update the PR as needed

### PR Review Process

1. Maintainers will review your PR within 1-3 business days
2. Feedback may be provided for improvements
3. Once approved, a maintainer will merge your PR
4. Your contribution will be included in the next release!

---

## Coding Standards

### TypeScript

- **Use TypeScript** for all new files (`.tsx`, `.ts`)
- **Enable strict mode** - no `any` types without justification
- **Define interfaces** for all props and complex objects
- **Use type imports**: `import type { User } from '@/types'`

### React

- **Use functional components** with hooks
- **Use custom hooks** for reusable logic
- **Keep components small** and focused (< 200 lines)
- **Use proper prop typing** with TypeScript interfaces
- **Memoize expensive operations** with `useMemo`/`useCallback`

### File Naming

- **Components**: PascalCase (e.g., `OrganizationSwitcher.tsx`)
- **Hooks**: camelCase starting with "use" (e.g., `useOrganization.ts`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Types**: PascalCase (e.g., `Organization`, `User`)

### Code Style

- **Use Prettier** for formatting (config in `.prettierrc`)
- **Use ESLint** for linting (config in `.eslintrc`)
- **2 spaces** for indentation
- **Single quotes** for strings
- **No semicolons** (Prettier default)
- **Trailing commas** for multiline

### Database Queries

- **Use centralized queries** from `src/lib/supabase/queries.ts`
- **Don't write raw Supabase calls** in components
- **Create new query functions** if needed, don't duplicate
- **Handle errors** properly with try/catch

### Styling

- **Use Tailwind CSS** classes, not inline styles
- **Use Radix UI** primitives for accessible components
- **Use CSS variables** from theme (HSL colors)
- **Mobile-first** responsive design
- **Use framer-motion** for animations

---

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) for clear commit history.

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, no logic change)
- **refactor**: Code refactoring (no feature change)
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Maintenance tasks, dependency updates

### Examples

```bash
feat(orgs): add organization switcher component

Implemented a dropdown component that allows users to switch between
their organizations. Includes keyboard navigation and current org indicator.

Closes #42

---

fix(auth): resolve session persistence issue

Fixed a bug where user sessions were not persisting after page reload
due to incorrect localStorage key.

Fixes #56

---

docs(readme): update installation instructions

Added Bun installation steps and clarified Supabase setup requirements.
```

---

## Testing Guidelines

### Running Tests (Once Set Up)

```bash
# Run all tests
bun test

# Run tests in watch mode
bun test --watch

# Run tests with coverage
bun test --coverage
```

### Writing Tests

- **Unit tests** for utilities and hooks
- **Component tests** for UI components
- **Integration tests** for user flows
- **Test edge cases** and error states
- **Use meaningful test names**

Example test structure:

```typescript
describe('OrganizationSwitcher', () => {
  it('should display current organization name', () => {
    // Test implementation
  })

  it('should switch organization when option is clicked', () => {
    // Test implementation
  })

  it('should handle keyboard navigation', () => {
    // Test implementation
  })
})
```

---

## Documentation

### Code Documentation

- **Add JSDoc comments** for complex functions
- **Document parameters** and return types
- **Explain "why"**, not just "what"
- **Include usage examples** for utilities

Example:

```typescript
/**
 * Calculates the remaining days in a trial subscription
 * @param trialEndsAt - ISO date string when trial ends
 * @returns Number of days remaining (0 if expired)
 *
 * @example
 * const daysLeft = getRemainingTrialDays('2025-02-01T00:00:00Z')
 * console.log(`${daysLeft} days left in trial`)
 */
export function getRemainingTrialDays(trialEndsAt: string): number {
  // Implementation
}
```

### Documentation Files

When updating documentation:

- **README.md**: High-level project information
- **CLAUDE.md**: Architecture and development guide
- **CONTRIBUTING.md**: This file
- **CHANGELOG.md**: Version history
- **supabase/README.md**: Database documentation

---

## Community

### Getting Help

- **GitHub Issues**: Report bugs or request features
- **GitHub Discussions**: Ask questions, share ideas
- **Email**: codecraka@gmail.com for private inquiries

### Staying Updated

- **Watch the repo** for new issues and PRs
- **Star the repo** to show support
- **Follow [@code-craka](https://github.com/code-craka)** on GitHub

---

## Recognition

All contributors will be:

- Listed in the project README
- Mentioned in release notes
- Given credit for their contributions

Thank you for helping make FlowSync better! 🚀

---

**Questions?** Feel free to reach out:
- GitHub: [@code-craka](https://github.com/code-craka)
- Email: codecraka@gmail.com
