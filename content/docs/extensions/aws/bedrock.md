---
title: Bedrock
weight: 2
---

The `bedrock` package is an AWS Bedrock implementation of the [golly genai](https://pkg.go.dev/oss.nandlabs.io/golly/genai) `Provider` interface. It uses the **Converse API** for a unified interface across all foundation models available on Amazon Bedrock.

## Installation

```sh
go get oss.nandlabs.io/golly-aws/bedrock
```

## Features

- **Generate** — Synchronous inference via the Bedrock Converse API
- **GenerateStream** — Streaming inference via the Bedrock ConverseStream API
- **Multi-Model** — Works with any Bedrock model that supports the Converse API (Claude, Titan, Llama, Mistral, Cohere, AI21)
- **Rich Content** — Text, images (PNG/JPEG/GIF/WebP), and documents (PDF/CSV/DOC/DOCX/XLS/XLSX/HTML/TXT/MD)
- **Tool Use** — Full function calling / tool use support
- **System Prompts** — Via options or system-role messages
- **Inference Config** — Max tokens, temperature, top-p, stop sequences
- **Token Usage** — Input, output, total, and cached token counts in response metadata
- **Custom Endpoint** — Works with LocalStack and VPC endpoints
- **Config Resolution** — Leverages `awscfg` for AWS credential and region management

## Quick Start

```go
package main

import (
    "context"
    "fmt"
    "log"

    "oss.nandlabs.io/golly-aws/bedrock"
    "oss.nandlabs.io/golly/genai"
)

func main() {
    provider, err := bedrock.NewBedrockProvider(&bedrock.ProviderConfig{
        Models: []string{"anthropic.claude-3-5-sonnet-20241022-v2:0"},
    })
    if err != nil {
        log.Fatal(err)
    }
    defer provider.Close()

    msg := genai.NewTextMessage(genai.RoleUser, "What is Amazon Bedrock?")

    options := genai.NewOptionsBuilder().
        SetMaxTokens(1024).
        SetTemperature(0.7).
        Add(genai.OptionSystemInstructions, "You are a helpful assistant.").
        Build()

    resp, err := provider.Generate(
        context.Background(),
        "anthropic.claude-3-5-sonnet-20241022-v2:0",
        msg,
        options,
    )
    if err != nil {
        log.Fatal(err)
    }

    for _, candidate := range resp.Candidates {
        for _, part := range candidate.Message.Parts {
            if part.Text != nil {
                fmt.Println(part.Text.Text)
            }
        }
    }

    fmt.Printf("Tokens: in=%d out=%d total=%d\n",
        resp.Meta.InputTokens, resp.Meta.OutputTokens, resp.Meta.TotalTokens)
}
```

## Architecture

```
┌────────────────────────────────────────────────────┐
│  genai.Provider interface                          │
│  ┌──────────────────────────────────────────────┐  │
│  │  bedrock.BedrockProvider                     │  │
│  │                                              │  │
│  │  converseAPI (interface)                     │  │
│  │  • Converse(ctx, input) → output             │  │
│  │  • ConverseStream(ctx, input) → stream       │  │
│  └──────────────────────────────────────────────┘  │
│                        │                           │
│                        ▼                           │
│               AWS Bedrock Runtime                  │
│               (Converse API)                       │
└────────────────────────────────────────────────────┘
```

## Configuration

### Using ProviderConfig

```go
provider, err := bedrock.NewBedrockProvider(&bedrock.ProviderConfig{
    // Named awscfg configuration
    CfgName: "my-bedrock-config",

    // Or explicit config
    Config: &awscfg.Config{
        Region:   "us-east-1",
        Endpoint: "http://localhost:4566",
    },

    // Supported model IDs
    Models: []string{
        "anthropic.claude-3-5-sonnet-20241022-v2:0",
        "amazon.titan-text-premier-v1:0",
    },
})
```

### Configuration Resolution Order

1. **Explicit `Config`** — uses the provided `awscfg.Config` directly
2. **Named config (`CfgName`)** — looks up a named config from `awscfg.Manager`
3. **Default** — loads the default AWS SDK config (env vars, `~/.aws/`, IMDS)

## Streaming

```go
respChan, errChan := provider.GenerateStream(
    context.Background(),
    "anthropic.claude-3-5-sonnet-20241022-v2:0",
    msg,
    nil,
)

for resp := range respChan {
    for _, candidate := range resp.Candidates {
        if candidate.Message != nil {
            for _, part := range candidate.Message.Parts {
                if part.Text != nil {
                    fmt.Print(part.Text.Text)
                }
            }
        }
    }
}
if err := <-errChan; err != nil {
    log.Fatal(err)
}
```
