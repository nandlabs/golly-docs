---
title: gcpsvc
weight: 1
---

The `gcpsvc` package provides centralized GCP configuration management for [golly-gcp](https://pkg.go.dev/oss.nandlabs.io/golly-gcp). It offers a named registry of GCP configurations that can be resolved by name or URL, enabling multi-project, multi-region, and per-resource setups.

## Installation

```sh
go get oss.nandlabs.io/golly-gcp/gcpsvc
```

## Features

- **Named Config Registry** — Thread-safe `Manager` for registering and retrieving `*Config` instances by name
- **URL-Based Resolution** — `GetConfig` resolves the best config for a given URL via a three-step fallback chain
- **Project & Location** — Store `ProjectId` and `Location` alongside client options
- **Credential File Support** — Service account and other credential types via `SetAuthCredentialFile`
- **Credential JSON** — Inline credential JSON via `SetAuthCredentialJSON`
- **Custom Endpoints** — Point at emulators or custom endpoints via `SetEndpoint`
- **Scopes & Quota** — Custom OAuth2 scopes, user agent, and quota project configuration
- **Custom Options** — Arbitrary `option.ClientOption` via `AddOption`

## Quick Start

```go
package main

import (
    "oss.nandlabs.io/golly-gcp/gcpsvc"
    "google.golang.org/api/option"
)

func main() {
    // Create and configure
    cfg := &gcpsvc.Config{
        ProjectId: "my-gcp-project",
        Location:  "us-central1",
    }
    cfg.SetAuthCredentialFile(option.ServiceAccount, "/path/to/credentials.json")

    // Register with the manager
    gcpsvc.Manager.Register("gs", cfg)

    // Sub-packages (gs, pubsub, genai) resolve configs automatically
    // via gcpsvc.GetConfig(url, "gs")
}
```

## Architecture

```
┌───────────────────┐      Register       ┌─────────────┐
│  Your Application │ ──────────────────▶ │   Manager   │
│  (setup code)     │                     │  (registry) │
└───────────────────┘                     └──────┬──────┘
                                                 │
                                          GetConfig(url, name)
                                                 │
                                                 ▼
┌──────────────────┐                    ┌─────────────┐
│  GCP Client      │ ◀────────────────  │   *Config   │
│  (storage, etc.) │   []ClientOption   │  (resolved) │
└──────────────────┘                    └─────────────┘
```

## Config Resolution

`GetConfig(url, name)` resolves the best `*Config` for a given URL using a three-step fallback:

| Step | Lookup Key                  | Description                           |
| ---- | --------------------------- | ------------------------------------- |
| 1    | `url.Host`                  | Resource-specific (e.g., bucket name) |
| 2    | `url.Host + "/" + url.Path` | Path-specific (most granular)         |
| 3    | `name`                      | Fallback (e.g., `"gs"`)               |

All sub-packages (`gs`, `pubsub`, `genai`) use this resolution mechanism automatically.

## Per-Resource Configuration

```go
// Default for all GCS operations
gcpsvc.Manager.Register("gs", defaultCfg)

// Bucket-specific config (different project/credentials)
prodCfg := &gcpsvc.Config{ProjectId: "prod-project"}
prodCfg.SetAuthCredentialFile(option.ServiceAccount, "/path/to/prod-sa.json")
gcpsvc.Manager.Register("prod-bucket", prodCfg)
```

| URL                          | Resolved Config |
| ---------------------------- | --------------- |
| `gs://prod-bucket/data.csv`  | `prodCfg`       |
| `gs://other-bucket/file.txt` | `defaultCfg`    |
