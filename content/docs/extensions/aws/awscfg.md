---
title: awscfg
weight: 1
---

The `awscfg` package provides centralized AWS configuration management for [golly-aws](https://pkg.go.dev/oss.nandlabs.io/golly-aws). It offers a named registry of AWS configurations that can be resolved by name or URL, enabling multi-account, multi-region, and per-resource setups.

## Installation

```sh
go get oss.nandlabs.io/golly-aws/awscfg
```

## Features

- **Named Config Registry** — Thread-safe `Manager` for registering and retrieving `*Config` instances by name
- **URL-Based Resolution** — `GetConfig` resolves the best config for a given URL via a three-step fallback chain
- **Full AWS SDK v2 Support** — Produces a standard `aws.Config` compatible with any AWS SDK v2 client
- **Static Credentials** — Access key, secret key, and session token via `SetStaticCredentials`
- **Profile Support** — AWS shared config profile selection via `SetProfile`
- **Custom Endpoints** — Point at LocalStack, MinIO, or VPC endpoints via `SetEndpoint`
- **Shared Config/Credentials Files** — Additional file paths for non-default locations
- **Custom Load Options** — Arbitrary `config.LoadOptions` via `AddLoadOption`
- **Multi-Account/Region** — Register different configs for different resources, accounts, or regions

## Quick Start

```go
package main

import (
    "context"
    "log"

    "oss.nandlabs.io/golly-aws/awscfg"
    s3svc "github.com/aws/aws-sdk-go-v2/service/s3"
)

func main() {
    // Create and register a config
    cfg := awscfg.NewConfig("us-east-1")
    awscfg.Manager.Register("s3", cfg)

    // Load the AWS SDK config
    awsCfg, err := cfg.LoadAWSConfig(context.Background())
    if err != nil {
        log.Fatal(err)
    }

    // Use with any AWS SDK v2 client
    client := s3svc.NewFromConfig(awsCfg)
    _ = client
}
```

## Architecture

```
┌───────────────────┐      Register       ┌──────────────┐
│  Your Application │ ──────────────────▶ │   Manager    │
│  (setup code)     │                     │  (registry)  │
└───────────────────┘                     └──────┬───────┘
                                                 │
                                          GetConfig(url, name)
                                                 │
                                                 ▼
┌───────────────────┐      LoadAWSConfig ┌──────────────┐
│  AWS SDK Client   │ ◀────────────────  │   *Config    │
│  (s3, sqs, etc.)  │                    │  (resolved)  │
└───────────────────┘                    └──────────────┘
```

## Config Resolution

`GetConfig(url, name)` resolves the best `*Config` for a given URL using a three-step fallback:

| Step | Lookup Key                  | Description                           |
| ---- | --------------------------- | ------------------------------------- |
| 1    | `url.Host`                  | Resource-specific (e.g., bucket name) |
| 2    | `url.Host + "/" + url.Path` | Path-specific (most granular)         |
| 3    | `name`                      | Fallback (e.g., `"s3"`)               |

All sub-packages (`s3`, `sqs`, `sns`, `bedrock`) use this resolution mechanism automatically.

## Per-Resource Configuration

```go
// Default for all S3 operations
awscfg.Manager.Register("s3", defaultCfg)

// Bucket-specific config (different region/credentials)
prodCfg := awscfg.NewConfig("eu-west-1")
prodCfg.SetProfile("prod")
awscfg.Manager.Register("prod-bucket", prodCfg)
```

| URL                          | Resolved Config |
| ---------------------------- | --------------- |
| `s3://prod-bucket/data.csv`  | `prodCfg`       |
| `s3://other-bucket/file.txt` | `defaultCfg`    |
