# Documentation Versioning Guide

This document explains how versioned documentation works for the Golly project using Hugo + Hextra theme, deployed via GitHub Pages.

## Overview

The golly-docs site supports versioned documentation so users can access docs for the specific version of Golly they are using. The latest version is always served at the root URL (`/`), and older versions are available at `/<version>/` (e.g., `/v1.2.0/`).

**Live site:** [https://golly.nandlabs.io](https://golly.nandlabs.io)

## Architecture

```
golly.nandlabs.io/
├── /                  ← Latest version (main branch)
├── /v1.3.0/           ← Snapshot of docs at v1.3.0 tag
├── /v1.2.0/           ← Snapshot of docs at v1.2.0 tag
└── ...
```

### Components

| Component               | File                                    | Purpose                                                      |
| ----------------------- | --------------------------------------- | ------------------------------------------------------------ |
| Version config          | `hugo.yaml` → `params.versioning`       | Declares current version and all available versions          |
| Version selector UI     | `static/js/version-selector.js`         | Dropdown injected into the navbar via JavaScript             |
| Version data injection  | `layouts/partials/custom/head-end.html` | Hugo template that outputs version config as JSON            |
| Version selector styles | `assets/css/custom.css`                 | CSS for the dropdown (light/dark mode support)               |
| CI/CD workflow          | `.github/workflows/pages.yaml`          | Builds latest + all tagged versions, deploys to GitHub Pages |

## How It Works

### 1. Version Selector (Frontend)

The version selector dropdown appears in the navbar after the "About" link. It is implemented as:

1. **`layouts/partials/custom/head-end.html`** — Uses Hextra's built-in custom hook to inject a `<script type="application/json">` block containing the version configuration from `hugo.yaml`, plus a reference to the JS file.

2. **`static/js/version-selector.js`** — Pure JavaScript that:
   - Reads the JSON config from the `#version-config` element
   - Creates a styled dropdown button showing the current version
   - Populates the dropdown menu with all available versions
   - Injects the dropdown into the navbar after the "About" link
   - Handles open/close, outside click, and Escape key

3. **`assets/css/custom.css`** — Styles the dropdown with:
   - Light and dark mode support (`:root.dark` selectors)
   - Hover states, border transitions
   - Checkmark icon on the current version
   - Proper z-index layering above page content

### 2. CI/CD Pipeline (GitHub Actions)

The workflow in `.github/workflows/pages.yaml` handles versioned builds:

1. **Trigger:** Runs on push to `main`, on version tag creation (`v*`), or manual dispatch.
2. **Build latest:** Runs `hugo --gc --minify` with the root baseURL — this becomes the `/` site.
3. **Build versioned snapshots:** For each `v*` tag in the repository:
   - Checks out `content/` and `hugo.yaml` from that tag
   - Builds with `--baseURL "/<tag>/"` and `--destination "public/<tag>/"`
   - Restores the current branch files for the next iteration
4. **Deploy:** Uploads the entire `public/` directory (containing `/` + all version subdirectories) to GitHub Pages.

### 3. Version Configuration (hugo.yaml)

The version list is maintained in `hugo.yaml` under `params.versioning`:

```yaml
params:
  versioning:
    enable: true
    current: "v1.3.0"
    versions:
      - label: "v1.3.0 (latest)"
        url: "/"
        current: true
      - label: "v1.2.0"
        url: "/v1.2.0/"
        current: false
```

## How to Release a New Version

Follow these steps when releasing a new version of Golly:

### Step 1: Tag the Current Docs

Before making changes for the new version, tag the current state:

```bash
cd golly-docs
git tag v1.3.0
git push origin v1.3.0
```

This creates a snapshot. The CI pipeline will automatically build and deploy it to `/v1.3.0/`.

### Step 2: Update Documentation

Make your documentation changes for the new version on the `main` branch.

### Step 3: Update hugo.yaml

Update the version configuration to reflect the new version:

```yaml
params:
  versioning:
    enable: true
    current: "v1.4.0" # ← Update to new version
    versions:
      - label: "v1.4.0 (latest)" # ← New version first
        url: "/"
        current: true
      - label: "v1.3.0" # ← Previous version, no longer "current"
        url: "/v1.3.0/"
        current: false
      - label: "v1.2.0"
        url: "/v1.2.0/"
        current: false
```

### Step 4: Push to Main

```bash
git add -A
git commit -m "docs: update for v1.4.0"
git push origin main
```

The CI pipeline will automatically:

1. Build the latest docs at `/`
2. Rebuild all tagged version snapshots at `/<tag>/`
3. Deploy everything to GitHub Pages

## Directory Structure

```
golly-docs/
├── .github/workflows/pages.yaml        # CI/CD with versioned builds
├── assets/
│   ├── css/custom.css                   # Version selector styles
│   └── images/
│       ├── golly-logo.png               # Site logo
│       └── favicon.png                  # Source favicon
├── content/
│   ├── _index.md                        # Homepage
│   ├── about.md                         # About page
│   └── docs/
│       ├── _index.md                    # Docs welcome
│       └── core/                        # Package documentation
│           ├── _index.md                # Core packages index
│           ├── assertion.md
│           ├── cli.md
│           ├── ...
│           ├── genai/                   # Section with sub-pages
│           │   ├── _index.md
│           │   ├── openai.md
│           │   ├── claude.md
│           │   └── ollama.md
│           └── turbo/                   # Section with sub-pages
│               ├── _index.md
│               ├── auth.md
│               └── filters.md
├── hugo.yaml                            # Hugo config (includes versioning)
├── layouts/
│   └── partials/
│       ├── custom/head-end.html         # Version config injection
│       └── favicons.html                # Favicon override
├── static/
│   ├── favicon.ico                      # Browser tab icon
│   └── js/version-selector.js           # Version dropdown logic
├── go.mod
├── README.md
└── Versioning.md                        # This file
```

## Adding a Version Without Tagging

If you need to add a version that points to an external URL (e.g., a separate deployment), you can simply add it to `hugo.yaml` without creating a git tag:

```yaml
versions:
  - label: "v2.0.0-beta"
    url: "https://beta.golly.nandlabs.io/"
    current: false
```

## Removing Old Versions

To remove a version from the dropdown, simply delete its entry from `hugo.yaml`. To also remove the deployed files, delete the corresponding git tag:

```bash
git tag -d v1.0.0
git push origin --delete v1.0.0
```

Then trigger a rebuild (push to `main` or use workflow dispatch).

## Troubleshooting

| Problem                         | Solution                                                                                                          |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Version dropdown not visible    | Check browser console for JS errors. Verify `versioning.enable: true` in `hugo.yaml`. Hard refresh (Cmd+Shift+R). |
| Dropdown shows but links 404    | Ensure the version tag exists (`git tag -l`). Check CI logs for build errors on that tag.                         |
| Styles look broken in dark mode | Verify `:root.dark` selectors in `assets/css/custom.css`.                                                         |
| Old version shows new content   | The tag snapshot may have been overwritten. Re-tag from the correct commit.                                       |
| CI build fails on old tag       | The old tag's `content/` or `hugo.yaml` may be incompatible with current layouts. Fix the tag or exclude it.      |

## Design Decisions

1. **JavaScript injection over navbar override** — Hextra's navbar partial uses internal naming that changes between versions (e.g., `partials/` vs `_partials/`). Using the `custom/head-end.html` hook with JS injection is safe across Hextra upgrades.

2. **JSON data block** — Version config is rendered as `<script type="application/json">` by Hugo templates, keeping Go template syntax out of JavaScript files and avoiding IDE warnings.

3. **Tag-based versioning** — Git tags are the source of truth for versions. The CI pipeline automatically discovers and builds all `v*` tags, requiring no manual workflow changes when adding versions.

4. **Subdirectory deployment** — Versioned docs live at `/<version>/` under the same domain, avoiding the complexity of multiple deployments or subdomains.
