---
title: "Golly — Enterprise Toolkit for Go"
layout: hextra-home
---

{{< hextra/hero-badge >}}

  <div class="hx-w-2 hx-h-2 hx-rounded-full hx-bg-primary-400"></div>
  <span>Free, open source</span>
  {{< icon name="arrow-circle-right" attributes="height=14" >}}
{{< /hextra/hero-badge >}}

<div class="hx-mt-6 hx-mb-6">
{{< hextra/hero-headline >}}
  Build Enterprise-Grade&nbsp;<br class="sm:hx-block hx-hidden" />Go Applications <span class="gradient-text">with Confidence</span>
{{< /hextra/hero-headline >}}
</div>

<div class="hx-mb-12">
{{< hextra/hero-subtitle >}}
  A robust, self-contained collection of 25+ production-ready Go libraries.&nbsp;<br class="sm:hx-block hx-hidden" />
  Minimal dependencies. Maximum productivity.
{{< /hextra/hero-subtitle >}}
</div>

<div class="hero-buttons">
{{< hextra/hero-button text="Get Started" link="docs/getting-started" >}}
{{< hextra/hero-button text="Browse Packages" link="docs/core" style="outline" >}}
</div>

<div class="why-golly-section hx-mt-12">

<h2 class="why-title">Why Golly?</h2>
<p class="why-subtitle">What makes Golly different from other Go libraries</p>

<div class="why-grid">
  <div class="why-card">
    <div class="why-card-icon">⚡</div>
    <h3>Zero Bloat</h3>
    <p>Minimal external dependencies. Import only the packages you need — each one is self-contained with no hidden coupling.</p>
  </div>
  <div class="why-card">
    <div class="why-card-icon">🛡️</div>
    <h3>Production Ready</h3>
    <p>Battle-tested in enterprise environments. Thread-safe, well-documented, and thoroughly tested with comprehensive coverage.</p>
  </div>
  <div class="why-card">
    <div class="why-card-icon">💎</div>
    <h3>Pure Go</h3>
    <p>Idiomatic Go design with generics, interfaces, and zero global state. Feels native, works everywhere Go runs.</p>
  </div>
  <div class="why-card">
    <div class="why-card-icon">📜</div>
    <h3>Open Source & MIT Licensed</h3>
    <p>Fully open source under the MIT License. Use it freely in personal, commercial, and enterprise projects with no restrictions.</p>
  </div>
</div>

</div>

<div class="category-section category-fundamentals">
<div class="category-header">
  <div class="category-badge badge-fundamentals">🔧</div>
  <div>
    <h2 id="fundamentals"><a href="docs/core/fundamentals/">Fundamentals</a></h2>
    <p class="category-desc">Core building blocks and essential utilities that form the foundation of every Golly project.</p>
  </div>
</div>

{{< hextra/feature-grid >}}
{{< hextra/feature-card title="Assertion" subtitle="Flexible assertion library for validating conditions across different types." link="docs/core/fundamentals/assertion" >}}
{{< hextra/feature-card title="CLI" subtitle="Intuitive API for building complex command-line applications with argument parsing and nested subcommands." link="docs/core/fundamentals/cli" >}}
{{< hextra/feature-card title="Collections" subtitle="Generic, thread-safe data structures: Stack, Queue, ArrayList, LinkedList, and HashSet." link="docs/core/fundamentals/collections" >}}
{{< hextra/feature-card title="Config" subtitle="Environment variable helpers and properties file management for clean, type-safe configuration." link="docs/core/fundamentals/config" >}}
{{< hextra/feature-card title="Error Utilities" subtitle="Custom formatted errors and multi-error aggregation for robust error handling." link="docs/core/fundamentals/errutils" >}}
{{< hextra/feature-card title="Function Utilities" subtitle="Deferred and timed function execution utilities for scheduling and delayed invocations." link="docs/core/fundamentals/fnutils" >}}
{{< /hextra/feature-grid >}}

</div>

<div class="category-section category-data">
<div class="category-header">
  <div class="category-badge badge-data">🗃️</div>
  <div>
    <h2 id="data--encoding"><a href="docs/core/data-encoding/">Data & Encoding</a></h2>
    <p class="category-desc">Serialization, encoding/decoding, text processing, and identifier generation.</p>
  </div>
</div>

{{< hextra/feature-grid >}}
{{< hextra/feature-card title="Codec" subtitle="Unified interface for encoding and decoding data in JSON, XML, and YAML with validation." link="docs/core/data-encoding/codec" >}}
{{< hextra/feature-card title="Data" subtitle="Pipeline key-value container with typed extraction and JSON Schema generation from Go structs." link="docs/core/data-encoding/data" >}}
{{< hextra/feature-card title="SemVer" subtitle="Semantic versioning parser and comparator following SemVer 2.0.0 specification." link="docs/core/data-encoding/semver" >}}
{{< hextra/feature-card title="Text Utilities" subtitle="Named ASCII character constants for writing readable, self-documenting code." link="docs/core/data-encoding/textutils" >}}
{{< hextra/feature-card title="UUID" subtitle="UUID generation (V1-V4) and parsing for standards-compliant identifiers." link="docs/core/data-encoding/uuid" >}}
{{< /hextra/feature-grid >}}

</div>

<div class="category-section category-networking">
<div class="category-header">
  <div class="category-badge badge-networking">📡</div>
  <div>
    <h2 id="networking--communication"><a href="docs/core/networking/">Networking & Communication</a></h2>
    <p class="category-desc">HTTP clients, servers, routers, and messaging interfaces for networked applications.</p>
  </div>
</div>

{{< hextra/feature-grid >}}
{{< hextra/feature-card title="Clients" subtitle="HTTP client with pluggable auth, exponential backoff retry, and circuit breaker." link="docs/core/networking/clients" >}}
{{< hextra/feature-card title="REST" subtitle="Full-featured HTTP server with routing, middleware pipeline, and TLS configuration." link="docs/core/networking/rest" >}}
{{< hextra/feature-card title="Turbo" subtitle="Enterprise-grade HTTP router with path/query parameters, filters, CORS, and auth middleware." link="docs/core/networking/turbo" >}}
{{< hextra/feature-card title="Messaging" subtitle="Producer/consumer interfaces for messaging platforms with local channel-based provider." link="docs/core/networking/messaging" >}}
{{< /hextra/feature-grid >}}

</div>

<div class="category-section category-infra">
<div class="category-header">
  <div class="category-badge badge-infra">🛠️</div>
  <div>
    <h2 id="infrastructure"><a href="docs/core/infrastructure/">Infrastructure</a></h2>
    <p class="category-desc">System-level utilities for filesystem, logging, lifecycle management, pooling, and security.</p>
  </div>
</div>

{{< hextra/feature-grid >}}
{{< hextra/feature-card title="Chrono" subtitle="Task scheduler with cron, interval, and one-shot scheduling, pluggable storage, and cluster support." link="docs/core/infrastructure/chrono" >}}
{{< hextra/feature-card title="L3 Logger" subtitle="Lightweight Levelled Logger with console/file writers, per-package log levels, and async support." link="docs/core/infrastructure/l3" >}}
{{< hextra/feature-card title="VFS" subtitle="Virtual File System with unified interface across local storage, AWS S3, GCP, and Azure." link="docs/core/infrastructure/vfs" >}}
{{< hextra/feature-card title="Lifecycle" subtitle="Component lifecycle management with dependency ordering, start/stop hooks, and state tracking." link="docs/core/infrastructure/lifecycle" >}}
{{< hextra/feature-card title="Pool" subtitle="Generic, thread-safe object pool with configurable min/max capacity." link="docs/core/infrastructure/pool" >}}
{{< hextra/feature-card title="Secrets" subtitle="AES encryption and decryption for strings and byte slices." link="docs/core/infrastructure/secrets" >}}
{{< hextra/feature-card title="And More..." icon="sparkles" subtitle="FS Utilities, IO Utilities, Managers and more." link="docs/core/infrastructure" >}}
{{< /hextra/feature-grid >}}

</div>

<div class="category-section category-ai">
<div class="category-header">
  <div class="category-badge badge-ai">🤖</div>
  <div>
    <h2 id="ai--intelligence"><a href="docs/core/ai/">AI & Intelligence</a></h2>
    <p class="category-desc">Provider-agnostic interfaces for Generative AI and Large Language Model integration.</p>
  </div>
</div>

{{< hextra/feature-grid >}}
{{< hextra/feature-card title="GenAI" subtitle="Unified interface for generative AI with prompt templates, multi-part messages, and streaming." link="docs/core/ai/genai" >}}
{{< hextra/feature-card title="OpenAI Provider" subtitle="Full OpenAI API integration including GPT models, tool calling, vision, and streaming." link="docs/core/ai/genai/openai" >}}
{{< hextra/feature-card title="Claude Provider" subtitle="Anthropic Claude Messages API with streaming, vision, and tool use." link="docs/core/ai/genai/claude" >}}
{{< hextra/feature-card title="Ollama Provider" subtitle="Local LLM inference via Ollama with the same unified GenAI API." link="docs/core/ai/genai/ollama" >}}
{{< /hextra/feature-grid >}}

</div>

<div class="category-section category-testing">
<div class="category-header">
  <div class="category-badge badge-testing">🧪</div>
  <div>
    <h2 id="testing"><a href="docs/core/testing/">Testing</a></h2>
    <p class="category-desc">Testing utilities and assertion helpers for writing clean, expressive unit tests.</p>
  </div>
</div>

{{< hextra/feature-grid >}}
{{< hextra/feature-card title="Assert" subtitle="Lightweight assertion helpers for unit tests with type-safe equality, nil checks, and error assertions." link="docs/core/testing/assert" >}}
{{< /hextra/feature-grid >}}

</div>

<div class="footer-note">
  <p>© NandLabs Pty Ltd. All rights reserved.</p>
</div>
