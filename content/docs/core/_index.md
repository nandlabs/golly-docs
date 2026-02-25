---
title: Golly Core
draft: false
prev: /docs
next: /docs/core/assertion
sidebar:
  open: true
---

This section contains the documentation for all the core packages available in Golly, a robust collection of enterprise-grade Go libraries.

The core packages provide the foundation for Golly's functionality, offering solutions for common programming challenges while adhering to Go's philosophy of simplicity and performance.

## Available Core Packages

- **[Assertion]({{< relref "assertion" >}})**: A flexible and extensible assertion library for consistent testing
- **[CLI]({{< relref "cli" >}})**: Command-line interface tools for building complex applications
- **[Clients]({{< relref "clients" >}})**: Flexible package to manage different types of clients with auth support
- **[Codec]({{< relref "codec" >}})**: Unified interface for encoding and decoding structured data (JSON, XML, YAML) with struct validation
- **[Collections]({{< relref "collections" >}})**: Generic data structures — ArrayList, LinkedList, HashSet, Queue, Stack
- **[Config]({{< relref "config" >}})**: Configuration management utilities
- **[Data]({{< relref "data" >}})**: Data structures and schema management
- **[ErrUtils]({{< relref "errutils" >}})**: Error handling utilities
- **[FnUtils]({{< relref "fnutils" >}})**: Function utilities for common operations
- **[FSUtils]({{< relref "fsutils" >}})**: File system utilities
- **[GenAI]({{< relref "genai" >}})**: Generative AI provider abstraction — OpenAI, Claude (Anthropic), and Ollama
- **[IOUtils]({{< relref "ioutils" >}})**: Input/output utilities
- **[L3]({{< relref "l3" >}})**: Lightweight, level-based logging library
- **[Lifecycle]({{< relref "lifecycle" >}})**: Application lifecycle management
- **[Managers]({{< relref "managers" >}})**: Thread-safe generic item registry
- **[Messaging]({{< relref "messaging" >}})**: Interface for producing and consuming messages
- **[Pool]({{< relref "pool" >}})**: Generic thread-safe object pool with lifecycle management
- **[REST]({{< relref "rest" >}})**: Comprehensive HTTP client package with auth, circuit breaker, and retry
- **[Secrets]({{< relref "secrets" >}})**: Secrets management utilities
- **[SemVer]({{< relref "semver" >}})**: Semantic versioning utilities
- **[Testing]({{< relref "testing" >}})**: Testing utilities and assertion library
- **[TextUtils]({{< relref "textutils" >}})**: Text manipulation utilities and ASCII constants
- **[Turbo]({{< relref "turbo" >}})**: High-performance HTTP routing framework with middleware, auth, and CORS
- **[UUID]({{< relref "uuid" >}})**: UUID generation and validation
- **[VFS]({{< relref "vfs" >}})**: Virtual file system implementation for local, S3, GCS, and more
