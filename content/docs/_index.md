---
title: Golly
draft: false
sidebar:
  open: true
---

**Golly** is a collection of enterprise-grade, open-source Go libraries designed to simplify modern software development. Zero bloat, minimal dependencies, production-ready.

{{< callout type="info" >}}
**Go 1.24+** required — [Get started in minutes]({{< relref "getting-started" >}})
{{< /callout >}}

## Why Golly?

|                          |                                                                          |
| ------------------------ | ------------------------------------------------------------------------ |
| **Modular**              | Import only the packages you need — no monolithic framework              |
| **Minimal Dependencies** | Self-contained toolkit that reduces dependency conflicts                 |
| **Enterprise-Grade**     | Battle-tested for reliability, scalability, and maintainability          |
| **Idiomatic Go**         | Follows Go conventions — interfaces, context propagation, error handling |

## Package Categories

Golly organises **31 packages** into six thematic categories:

### 🔧 [Fundamentals]({{< relref "core/fundamentals" >}})

Core building blocks — assertions, CLI tools, generic collections, configuration management, error utilities, and deferred function helpers.

### 📦 [Data & Encoding]({{< relref "core/data-encoding" >}})

Structured data handling — multi-format codec (JSON/XML/YAML), data pipelines, semantic versioning, text utilities, and UUID generation.

### 📡 [Networking]({{< relref "core/networking" >}})

HTTP clients and servers — REST client with retries and auth, high-performance Turbo router, and cross-platform messaging interfaces.

### 🏗️ [Infrastructure]({{< relref "core/infrastructure" >}})

Operational foundations — chrono task scheduler, L3 structured logging, lifecycle management, object pooling, filesystem utilities, secret management, and virtual filesystem.

### 🤖 [AI]({{< relref "core/ai" >}})

Generative AI framework — provider-agnostic LLM interface with OpenAI, Claude, and Ollama implementations, prompt templates, and streaming support.

### 🧪 [Testing]({{< relref "core/testing" >}})

Test utilities — flexible assertion library for consistent, readable test code.

## Quick Start

```bash
go get oss.nandlabs.io/golly
```

```go
package main

import "oss.nandlabs.io/golly/l3"

func main() {
    logger := l3.Get()
    logger.Info("Hello from Golly!")
}
```

{{< cards >}}
{{< card link="getting-started" title="Getting Started" subtitle="Installation, examples, and first steps" icon="play" >}}
{{< card link="core" title="All Packages" subtitle="Browse the complete package reference" icon="document-text" >}}
{{< /cards >}}
