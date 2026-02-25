---
title: About Golly
toc: true
---

## What is Golly?

Golly is a collection of reusable, production-grade utilities for the Go programming language. It provides a comprehensive set of packages that address common enterprise development needs — from HTTP routing and REST clients to logging, configuration, messaging, and generative AI — all in a single, self-contained module with minimal external dependencies.

## Goals

- **Reusable utilities** — Create a common collection of packages targeting enterprise use cases.
- **Self-contained** — Minimise external dependencies to keep the footprint small and reduce supply-chain risk.
- **Idiomatic Go** — Follow Go conventions, leverage generics, and support concurrent use by default.

## Installation

```bash
go get oss.nandlabs.io/golly
```

Requires **Go 1.21** or later.

## Architecture

Golly is organised as a single Go module (`oss.nandlabs.io/golly`) containing 25+ packages. Each package is independently importable and designed around clear interfaces.

| Category                    | Packages                                                                                     |
| --------------------------- | -------------------------------------------------------------------------------------------- |
| **Web & API**               | `turbo` (HTTP router), `rest` (client & server), `turbo/auth`, `turbo/filters`               |
| **Data & Serialisation**    | `codec` (JSON, XML, YAML), `codec/validator`, `data`, `collections`                          |
| **AI & ML**                 | `genai` (provider abstraction), `genai/impl` (OpenAI, Claude, Ollama)                        |
| **Infrastructure**          | `messaging`, `vfs` (virtual file system), `secrets`, `config`                                |
| **Observability**           | `l3` (lightweight levelled logger)                                                           |
| **Lifecycle & Concurrency** | `lifecycle`, `managers`, `pool`                                                              |
| **Utilities**               | `cli`, `clients`, `errutils`, `fnutils`, `fsutils`, `ioutils`, `semver`, `textutils`, `uuid` |
| **Testing**                 | `testing/assert` (assertion helpers)                                                         |

## Extension Modules

Cloud-specific and protocol-specific integrations are provided as separate modules to keep the core dependency-free:

| Module                                                 | Description                                      |
| ------------------------------------------------------ | ------------------------------------------------ |
| [golly-aws](https://github.com/nandlabs/golly-aws)     | AWS services — S3 VFS, SNS, SQS                  |
| [golly-gcp](https://github.com/nandlabs/golly-gcp)     | GCP services — Cloud Storage, Pub/Sub, Vertex AI |
| [golly-azure](https://github.com/nandlabs/golly-azure) | Azure services integration                       |

## Contributing

We welcome contributions of all kinds — bug reports, feature requests, documentation improvements, and code contributions.

- **Bug Reports** — [Open an issue](https://github.com/nandlabs/golly/issues/new/choose) using the bug template.
- **Feature Requests** — [Open an issue](https://github.com/nandlabs/golly/issues/new/choose) using the feature template.
- **Pull Requests** — Fork the repository, create a feature branch, and submit a PR with a clear description.

Please see the [Contributing Guide](https://github.com/nandlabs/golly/blob/main/CONTRIBUTING.md) for full details.

## License

Golly is licensed under the [MIT License](https://github.com/nandlabs/golly/blob/main/LICENSE).

Copyright &copy; Nandlabs Pty Ltd 2024.

## Links

- [GitHub Repository](https://github.com/nandlabs/golly)
- [Go Package Documentation](https://pkg.go.dev/oss.nandlabs.io/golly)
- [Issue Tracker](https://github.com/nandlabs/golly/issues)
- [Security Policy](https://github.com/nandlabs/golly/blob/main/SECURITY.md)
