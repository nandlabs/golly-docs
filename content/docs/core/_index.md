---
title: Golly Core
draft: false
weight: 2
sidebar:
  open: true
---

This section contains the documentation for all the core packages available in Golly, a robust collection of enterprise-grade Go libraries.

The core packages provide the foundation for Golly's functionality, offering solutions for common programming challenges while adhering to Go's philosophy of simplicity and performance.

## Package Categories

### 🔧 Fundamentals

Core building blocks and essential utilities.

| Package                                                  | Description                                                            |
| -------------------------------------------------------- | ---------------------------------------------------------------------- |
| [Assertion]({{< relref "fundamentals/assertion" >}})     | A flexible and extensible assertion library for consistent testing     |
| [CLI]({{< relref "fundamentals/cli" >}})                 | Command-line interface tools for building complex applications         |
| [Collections]({{< relref "fundamentals/collections" >}}) | Generic data structures — ArrayList, LinkedList, HashSet, Queue, Stack |
| [Config]({{< relref "fundamentals/config" >}})           | Configuration management utilities                                     |
| [ErrUtils]({{< relref "fundamentals/errutils" >}})       | Error handling and multi-error aggregation                             |
| [FnUtils]({{< relref "fundamentals/fnutils" >}})         | Deferred and timed function execution utilities                        |

### 📡 Networking & Communication

HTTP clients, servers, routers, and messaging interfaces.

| Package                                            | Description                                                                             |
| -------------------------------------------------- | --------------------------------------------------------------------------------------- |
| [Clients]({{< relref "networking/clients" >}})     | HTTP client with auth providers, retry with backoff, and circuit breaker                |
| [REST]({{< relref "networking/rest" >}})           | HTTP server with routing, middleware, TLS, and transport configuration                  |
| [Turbo]({{< relref "networking/turbo" >}})         | Enterprise-grade HTTP router with path/query params, filters, CORS, and auth middleware |
| [Messaging]({{< relref "networking/messaging" >}}) | Producer/consumer interfaces with local channel-based provider                          |

### 🗃️ Data & Encoding

Data serialization, encoding/decoding, and identifier generation.

| Package                                               | Description                                                                   |
| ----------------------------------------------------- | ----------------------------------------------------------------------------- |
| [Codec]({{< relref "data-encoding/codec" >}})         | Unified encoding/decoding for JSON, XML, YAML with struct validation          |
| [Data]({{< relref "data-encoding/data" >}})           | Pipeline key-value container with typed extraction and JSON Schema generation |
| [SemVer]({{< relref "data-encoding/semver" >}})       | Semantic versioning parser and comparator                                     |
| [TextUtils]({{< relref "data-encoding/textutils" >}}) | Named ASCII character constants for readable code                             |
| [UUID]({{< relref "data-encoding/uuid" >}})           | UUID generation (V1–V4) and parsing                                           |

### 🤖 AI & Intelligence

Provider-agnostic Generative AI integration.

| Package                            | Description                                                                                       |
| ---------------------------------- | ------------------------------------------------------------------------------------------------- |
| [GenAI]({{< relref "ai/genai" >}}) | Provider-agnostic GenAI/LLM interface with prompt templates — supports OpenAI, Claude, and Ollama |

### 🛠️ Infrastructure

System-level utilities for filesystem, logging, lifecycle, and security.

| Package                                                | Description                                                               |
| ------------------------------------------------------ | ------------------------------------------------------------------------- |
| [FSUtils]({{< relref "infrastructure/fsutils" >}})     | Filesystem utilities: existence checks, content type detection            |
| [IOUtils]({{< relref "infrastructure/ioutils" >}})     | MIME type lookup, channel utilities, and checksum calculation             |
| [L3]({{< relref "infrastructure/l3" >}})               | Lightweight Levelled Logger with console/file writers and async support   |
| [Lifecycle]({{< relref "infrastructure/lifecycle" >}}) | Component lifecycle management with dependency ordering                   |
| [Managers]({{< relref "infrastructure/managers" >}})   | Generic item manager for registering, retrieving, and listing named items |
| [Pool]({{< relref "infrastructure/pool" >}})           | Generic, thread-safe object pool with configurable capacity               |
| [Secrets]({{< relref "infrastructure/secrets" >}})     | AES encryption and decryption for strings and byte slices                 |
| [VFS]({{< relref "infrastructure/vfs" >}})             | Virtual File System with unified interface, extensible for cloud storage  |

### 🧪 Testing

Testing utilities and assertion helpers.

| Package                             | Description                                  |
| ----------------------------------- | -------------------------------------------- |
| [Testing]({{< relref "testing" >}}) | Lightweight assertion helpers for unit tests |
