# Contributing to NordLion

Thank you for your interest in contributing to NordLion! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and professional environment for all contributors.

## Getting Started

1. **Fork the repository**
2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/nordlion_updated.git
   ```
3. **Create a branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Guidelines

### Code Style

- **TypeScript**: Use strict type checking
- **Naming Conventions**:
  - Components: PascalCase (`UserProfile.tsx`)
  - Files: camelCase (`authMiddleware.ts`)
  - Variables: camelCase (`userData`)
  - Constants: UPPER_SNAKE_CASE (`API_URL`)

### Component Structure

```tsx
// Imports
import { useState } from 'react'
import { ComponentProps } from '@/types'

// Types/Interfaces
interface Props {
  title: string
  onSubmit: () => void
}

// Component
export default function MyComponent({ title, onSubmit }: Props) {
  // Hooks
  const [state, setState] = useState()
  
  // Functions
  const handleClick = () => {}
  
  // Render
  return <div>{title}</div>
}
```

### Commit Messages

Use conventional commits:

```
feat: add vehicle search filter
fix: resolve authentication bug
docs: update setup guide
style: format code
refactor: restructure API routes
test: add vehicle controller tests
chore: update dependencies
```

### Testing

- Write tests for new features
- Ensure all tests pass before submitting PR
- Maintain test coverage above 80%

```bash
npm test
```

## Pull Request Process

1. **Update documentation** for any changed functionality
2. **Add tests** for new features
3. **Update CHANGELOG.md** with your changes
4. **Ensure CI/CD passes** all checks
5. **Request review** from maintainers

### PR Title Format

```
[Type] Brief description

Examples:
[Feature] Add vehicle comparison tool
[Fix] Resolve login session timeout
[Docs] Add API documentation
```

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe testing performed

## Screenshots
(if applicable)

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added and passing
```

## Bug Reports

Use the issue template:

```markdown
**Describe the bug**
A clear description of the bug

**To Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What should happen

**Screenshots**
If applicable

**Environment**
- OS: [e.g. macOS]
- Browser: [e.g. Chrome 120]
- Node version: [e.g. 18.17.0]
```

## Feature Requests

```markdown
**Feature Description**
Clear description of the feature

**Use Case**
Why this feature is needed

**Proposed Solution**
How you envision it working

**Alternatives**
Other solutions considered
```

## Development Workflow

### Branch Naming

- Feature: `feature/description`
- Bug fix: `fix/description`
- Hotfix: `hotfix/description`
- Release: `release/version`

### Before Submitting

```bash
# Format code
npm run format

# Lint
npm run lint

# Type check
npm run type-check

# Run tests
npm test

# Build
npm run build
```

## Questions?

Feel free to:
- Open an issue for questions
- Join our Discord (if available)
- Email: dev@nordlionauto.com

Thank you for contributing! 🦁
