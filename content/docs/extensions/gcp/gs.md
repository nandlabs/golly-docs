---
title: GS (Cloud Storage)
weight: 3
---

The `gs` package is a Google Cloud Storage implementation of the [golly VFS](https://pkg.go.dev/oss.nandlabs.io/golly/vfs) (Virtual File System) interface. Blank-import it to auto-register the `gs://` scheme with the VFS manager.

## Installation

```sh
go get oss.nandlabs.io/golly-gcp/gs
```

## Features

- **Read / Write** — Stream objects from GCS; buffered writes flushed on `Close()`
- **Create / Open** — Create new or open existing objects
- **Delete / DeleteAll** — Delete single objects or recursively under a prefix
- **Copy / Move** — Server-side copy using GCS `CopierFrom`; move = copy + delete
- **List / Walk / Find** — List direct children, recursively walk, or filter with a custom `FileFilter`
- **Mkdir / MkdirAll** — Create directory markers (zero-byte objects with trailing `/`)
- **Metadata** — Object info (size, last modified, content type), custom properties
- **Auto-Registration** — Blank import registers the `gs://` scheme with `vfs.GetManager()`
- **Config Resolution** — Per-bucket or global GCP config via `gcpsvc.GetConfig`

## Quick Start

```go
package main

import (
    "fmt"
    "io"

    "oss.nandlabs.io/golly-gcp/gcpsvc"
    _ "oss.nandlabs.io/golly-gcp/gs"
    "oss.nandlabs.io/golly/vfs"
)

func main() {
    // Register GCP config
    cfg := &gcpsvc.Config{ProjectId: "my-project"}
    gcpsvc.Manager.Register("gs", cfg)

    mgr := vfs.GetManager()

    // Write a file
    w, _ := mgr.CreateRaw("gs://my-bucket/hello.txt")
    w.Write([]byte("Hello from Golly!"))
    w.Close()

    // Read it back
    r, _ := mgr.OpenRaw("gs://my-bucket/hello.txt")
    data, _ := io.ReadAll(r)
    r.Close()
    fmt.Println(string(data))

    // List files
    files, _ := mgr.ListRaw("gs://my-bucket/")
    for _, f := range files {
        info, _ := f.Info()
        fmt.Printf("%s (%d bytes)\n", info.Name(), info.Size())
    }
}
```

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│  import _ "oss.nandlabs.io/golly-gcp/gs"                │
│                                                         │
│  vfs.GetManager().OpenRaw("gs://bucket/key")            │
└───────────────────────┬─────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│  golly/vfs.Manager                                      │
│  Routes to filesystem by URL scheme ("gs")              │
└───────────────────────┬─────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│  gs.StorageFS (VFileSystem)                             │
│  1. parseURL(u) → bucket + key                          │
│  2. getStorageClient → gcpsvc.GetConfig(u, "gs")        │
│  3. GCS API call → storage.Client operations            │
└─────────────────────────────────────────────────────────┘
```

## URL Format

```
gs://bucket-name/path/to/object.txt
gs://bucket-name/path/to/folder/
```

| URL                              | Bucket      | Key               | Type      |
| -------------------------------- | ----------- | ----------------- | --------- |
| `gs://my-bucket/data/report.csv` | `my-bucket` | `data/report.csv` | File      |
| `gs://my-bucket/logs/`           | `my-bucket` | `logs/`           | Directory |

## Configuration

Configuration is resolved via `gcpsvc.GetConfig(url, "gs")` using a three-step fallback:

1. **`url.Host`** — bucket-specific config (e.g., `"my-bucket"`)
2. **`url.Host + "/" + url.Path`** — path-specific config
3. **Fallback `"gs"`** — default config for all GCS operations

If no config is found, the client falls back to Application Default Credentials (ADC).

```go
// Per-bucket configuration
gcpsvc.Manager.Register("gs", defaultCfg)
gcpsvc.Manager.Register("prod-bucket", prodCfg)
```

### With Service Account Credentials

```go
cfg := &gcpsvc.Config{ProjectId: "my-project"}
cfg.SetAuthCredentialFile(option.ServiceAccount, "/path/to/sa.json")
gcpsvc.Manager.Register("gs", cfg)
```
