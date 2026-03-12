---
title: GenAI
weight: 2
---

The `genai` package is a Google Cloud GenAI implementation of the [golly genai](https://pkg.go.dev/oss.nandlabs.io/golly/genai) `Provider` interface. It uses the [google.golang.org/genai](https://pkg.go.dev/google.golang.org/genai) SDK for a unified interface to **Vertex AI**, **Gemini API**, and **Model Garden** backends.

## Installation

```sh
go get oss.nandlabs.io/golly-gcp/genai
```

## Features

- **Generate** — Synchronous inference via the Google GenAI API
- **GenerateStream** — Streaming inference via the Google GenAI streaming API
- **Multi-Model** — Works with any Google GenAI model (Gemini, Model Garden, etc.)
- **Rich Content** — Text, inline images/audio/video, file URIs, and raw binary data
- **Tool Use** — Full function calling support
- **System Prompts** — Via options or system-role messages
- **Inference Config** — Max tokens, temperature, top-p, top-k, candidate count, stop sequences, penalties, seed
- **Structured Output** — Response MIME type and JSON schema for controlled output
- **Token Usage** — Input, output, total, cached, and thinking token counts
- **Thinking/Reasoning** — Thinking parts preserved with `thought` attribute
- **Grounding** — Web and retrieved context grounding metadata
- **Dual Backend** — Vertex AI (default) and Gemini API via explicit `Backend` selection
- **Config Resolution** — Leverages `gcpsvc` for GCP project and location management

## Quick Start

```go
package main

import (
    "context"
    "fmt"
    "log"

    gcpgenai "oss.nandlabs.io/golly-gcp/genai"
    "oss.nandlabs.io/golly/genai"
)

func main() {
    provider, err := gcpgenai.NewGCPProvider(context.Background(), &gcpgenai.ProviderConfig{
        ProjectId: "my-project",
        Location:  "us-central1",
        Backend:   gcpgenai.BackendVertexAI,
        Models:    []string{"gemini-2.0-flash"},
    })
    if err != nil {
        log.Fatal(err)
    }
    defer provider.Close()

    msg := genai.NewTextMessage(genai.RoleUser, "What is Google Gemini?")

    options := genai.NewOptionsBuilder().
        SetMaxTokens(1024).
        SetTemperature(0.7).
        Add(genai.OptionSystemInstructions, "You are a helpful assistant.").
        Build()

    resp, err := provider.Generate(
        context.Background(),
        "gemini-2.0-flash",
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
│  │  genai.GCPProvider                           │  │
│  │                                              │  │
│  │  generateAPI (interface)                     │  │
│  │  • GenerateContent(ctx, model, ...) → resp   │  │
│  │  • GenerateContentStream(ctx, ...) → iter    │  │
│  └──────────────────────────────────────────────┘  │
│                        │                           │
│                        ▼                           │
│               Google GenAI SDK                     │
│           (Vertex AI / Gemini API)                 │
└────────────────────────────────────────────────────┘
```

## Configuration

### Vertex AI (Default)

```go
provider, err := gcpgenai.NewGCPProvider(ctx, &gcpgenai.ProviderConfig{
    ProjectId: "my-project",
    Location:  "us-central1",
    Backend:   gcpgenai.BackendVertexAI,
    Models:    []string{"gemini-2.0-flash"},
})
```

### Gemini API (API Key)

```go
provider, err := gcpgenai.NewGCPProvider(ctx, &gcpgenai.ProviderConfig{
    APIKey:  "your-api-key",
    Backend: gcpgenai.BackendGeminiAPI,
    Models:  []string{"gemini-2.0-flash"},
})
```

### Configuration Resolution Order

1. **Explicit `ProjectId` / `Location`** — uses the values directly from `ProviderConfig`
2. **Named config (`CfgName`)** — looks up a named config from `gcpsvc.Manager`
3. **Environment / ADC** — the underlying SDK uses Application Default Credentials

The `Backend` field is inferred when zero: `BackendGeminiAPI` if `APIKey` is set, else `BackendVertexAI`.

## Streaming

```go
respChan, errChan := provider.GenerateStream(
    context.Background(),
    "gemini-2.0-flash",
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
