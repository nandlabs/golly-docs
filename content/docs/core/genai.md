---
title: GenAI Package
draft: false
prev: /docs/core/fsutils
next: /docs/core/ioutils
---

The `genai` package provides a unified interface for working with generative AI models in Go applications. It offers a comprehensive framework for interacting with various AI providers, managing prompts, handling responses, and maintaining conversation state.

## Features

- **Provider Abstraction**: Work with multiple AI models and providers through a consistent API
- **Message Exchange**: Framework for structured communication with AI models
- **Template Management**: Create and use templates for dynamic prompt generation
- **Option Configuration**: Flexible configuration options for AI model parameters
- **Memory Management**: Store and retrieve conversation history
- **Extensible Design**: Easily add support for additional AI providers

## Core Components

### Provider Interface

The `Provider` interface abstracts the details of different AI providers, allowing you to work with various AI models through a consistent API. It includes methods for:

- Getting provider information (name, description, version)
- Generating content with models
- Streaming responses
- Listing available models

### Messages and Exchange

The package provides a structured way to handle messages between your application and AI models:

- `Message`: Represents a single message with MIME type and content
- `Exchange`: Manages a set of messages in a conversation, with support for different actor roles (user, system, AI)

### Options Management

The `Options` and `OptionsBuilder` types allow you to configure model-specific parameters:

- Temperature, top-k, top-p for controlling randomness
- Max tokens, stop words for output control
- Penalties for repetition and frequency
- Schema definitions for structured output

### Template System

The templating system enables dynamic prompt generation:

- Create templates with variable placeholders
- Format templates with data at runtime
- Support for Go templates

### Memory Interface

The `Memory` interface provides conversation persistence:

- Store conversation exchanges
- Retrieve conversation history
- Support for different storage backends

## Usage Examples

### Basic Generation

```go
import (
    "oss.nandlabs.io/golly/genai"
    "fmt"
)

func main() {
    // Get a registered provider
    provider := genai.Providers.Get("provider-name")

    // Create a new exchange
    exchange := genai.NewExchange("session-id")

    // Add a user message
    exchange.AddTxtMsg("Tell me a joke about programming", genai.UserActor)

    // Generate a response
    options := genai.NewOptionsBuilder().
        SetTemperature(0.7).
        SetMaxTokens(100).
        Build()

    err := provider.Generate("model-name", exchange, options)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }

    // Get AI responses
    responses := exchange.MsgsByActors(genai.AIActor)
    for _, msg := range responses {
        fmt.Println("AI:", msg.String())
    }
}
```

### Streaming Generation

```go
import (
    "oss.nandlabs.io/golly/genai"
    "fmt"
)

func main() {
    provider := genai.Providers.Get("provider-name")
    exchange := genai.NewExchange("session-id")
    exchange.AddTxtMsg("Explain quantum computing", genai.UserActor)

    // Define a handler for streaming responses
    handler := func(last bool, messages ...*genai.Message) {
        for _, msg := range messages {
            fmt.Print(msg)
        }
        if last {
            fmt.Println("\nGeneration complete")
        }
    }

    // Generate streaming content
    options := genai.NewOptionsBuilder().Build()
    err := provider.GenerateStream("model-name", exchange, handler, options)
    if err != nil {
        fmt.Println("Error:", err)
    }
}
```

## Provider Extensions

The core `genai` package can be extended with provider-specific implementations:

- **golly-gcp**: Support for Google Cloud's Vertex AI models (gemini, etc.)
- **golly-azure**: Support for Azure OpenAI models
- **golly-genai**: Additional provider implementations (Ollama, etc.)

## Installation

To use the GenAI package, first install the Golly core library:

```bash
go get oss.nandlabs.io/golly
```

For provider-specific extensions, install the corresponding packages:

```bash
go get oss.nandlabs.io/golly-gcp    # For Google Cloud
go get oss.nandlabs.io/golly-azure  # For Azure
go get oss.nandlabs.io/golly-genai  # For additional providers
```
