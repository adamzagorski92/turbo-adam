# Styles (Design System)

This package provides global CSS (tokens + base + minimal utilities) for the monorepo.

- Entry point: import `@my-monorepo/styles/global.css`
- Single source of truth for _raw color values_: `tokens/colors.css` (palette)
- Single source of truth for _meaning/roles_: `themes/light.css` and `themes/dark.css` (semantic tokens)

## Token layers

### 1) Palette (primitive tokens)

**Where:** `tokens/colors.css`

These are the only tokens that contain hard-coded color values (hex). They should not be used directly in components/apps.

Naming: `--palette-*` (e.g. `--palette-brand-500`, `--palette-neutral-800`).

### 2) Semantic (alias/role tokens)

**Where:** `themes/*.css`

These map palette values to UI roles. Components/apps should use these.

Naming: `--color-*`.

## When to use which token (cheat sheet)

| Use case (intent)                  | Use token                                     | Example usage                                                             |
| ---------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------- |
| Default page text                  | `--color-fg-primary`                          | `color: var(--color-fg-primary);`                                         |
| Secondary/muted text               | `--color-fg-secondary`, `--color-fg-tertiary` | `color: var(--color-fg-secondary);`                                       |
| App background (behind everything) | `--color-bg-canvas`                           | `background: var(--color-bg-canvas);`                                     |
| Standard surface (cards, panels)   | `--color-bg-surface`                          | `background: var(--color-bg-surface);`                                    |
| Elevated surface (if needed later) | `--color-bg-surface-elevated`                 | `background: var(--color-bg-surface-elevated);`                           |
| Hover surface (if needed later)    | `--color-bg-surface-hover`                    | `background: var(--color-bg-surface-hover);`                              |
| Default borders/dividers           | `--color-border-default`                      | `border-color: var(--color-border-default);`                              |
| Accent borders (highlights)        | `--color-border-accent`                       | `border-left-color: var(--color-border-accent);`                          |
| Accent color (links, highlights)   | `--color-accent`                              | `color: var(--color-accent);`                                             |
| Accent hover                       | `--color-accent-hover`                        | `color: var(--color-accent-hover);`                                       |
| Text/icon on accent background     | `--color-fg-on-accent`                        | `color: var(--color-fg-on-accent);`                                       |
| Strong background blocks (rare)    | `--color-bg-strong`                           | `background: var(--color-bg-strong);`                                     |
| Scrim/overlay background           | `--color-bg-scrim`                            | `background: color-mix(in srgb, var(--color-bg-scrim) 60%, transparent);` |
| Brand-tinted subtle background     | `--color-bg-brand-subtle`                     | `background: var(--color-bg-brand-subtle);`                               |

## Rules (to keep it scalable)

- **Do not use palette tokens (`--palette-*`) in components/apps.** Only themes should reference them.
- **Prefer semantic tokens (`--color-*`) everywhere else.** This makes re-theming and rebranding cheap.
- **Avoid creating “color-named” tokens** (no `blue/gray/black` in names). Name by intent/role.
- If a new use case appears, first try to map it to an existing role; only then add a new semantic token.

## Base containers

Base layout containers (background roles like `surface/strong/brandSubtle/scrim`) live in `@my-monorepo/components` under `basePageContainers`.
They are intentionally wired to semantic background roles from this package.
