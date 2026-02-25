---
title: IO Utilities
weight: 2
---

The `ioutils` package provides utility functions for input/output operations in Go applications. It simplifies common IO tasks including safe resource management, MIME type detection, and checksum calculations.

## Features

- **Resource Management**: Safely close IO resources to prevent leaks
- **MIME Type Utilities**: Comprehensive mapping between file extensions and MIME types
- **Channel Operations**: Functions for safely working with Go channels
- **Checksum Calculations**: Utilities for computing file checksums
- **Extensive MIME Type Support**: Support for numerous media formats, document types, and archive formats

## Core Components

### IO Utilities

- `CloserFunc`: Function for safely closing `io.Closer` resources
- `IsChanClosed[T any](ch chan T) bool`: Check if a channel is closed
- `CloseChannel[T any](ch chan T)`: Safely close a channel

### MIME Type Operations

- `GetMimeFromExt(ext string) string`: Get MIME type from file extension
- `GetExtsFromMime(mime string) []string`: Get file extensions for a MIME type
- Extensive predefined MIME type constants for various file formats:
  - Text formats (plain, HTML, CSS, CSV, Markdown, YAML, XML)
  - Application formats (JSON, PDF, ZIP, Office documents)
  - Image formats (PNG, JPEG, GIF, SVG)
  - Audio formats (MP3, WAV, FLAC, AAC, etc.)
  - Video formats (MP4, WebM, AVI, etc.)

## Usage Examples

### IO Resource Management

```go
package main

import (
    "fmt"
    "os"
    "oss.nandlabs.io/golly/ioutils"
)

func main() {
    // Open a file
    file, err := os.Open("example.txt")
    if err != nil {
        fmt.Printf("Error opening file: %v\n", err)
        return
    }

    // Use a deferred call to close the file safely
    defer ioutils.CloserFunc(file)

    // Work with the file
    // ...
}
```

### Working with MIME Types

```go
package main

import (
    "fmt"
    "oss.nandlabs.io/golly/ioutils"
)

func main() {
    // Get MIME type from file extension
    mimeType := ioutils.GetMimeFromExt(".pdf")
    fmt.Printf("MIME type for .pdf: %s\n", mimeType)

    // Get file extensions for a MIME type
    extensions := ioutils.GetExtsFromMime(ioutils.MimeApplicationJSON)
    fmt.Printf("Extensions for JSON: %v\n", extensions)

    // Using MIME constants directly
    fmt.Println("MIME type for HTML:", ioutils.MimeTextHTML)
    fmt.Println("MIME type for PNG images:", ioutils.MimeImagePNG)
}
```

### Safe Channel Operations

```go
package main

import (
    "fmt"
    "oss.nandlabs.io/golly/ioutils"
)

func main() {
    // Create a channel
    ch := make(chan int)

    // Check if channel is closed
    if ioutils.IsChanClosed(ch) {
        fmt.Println("Channel is closed")
    } else {
        fmt.Println("Channel is open")
    }

    // Safely close the channel
    ioutils.CloseChannel(ch)

    // Now the channel is closed
    if ioutils.IsChanClosed(ch) {
        fmt.Println("Channel is now closed")
    }
}
```

### File Handling with MIME Detection

```go
package main

import (
    "fmt"
    "path/filepath"
    "oss.nandlabs.io/golly/ioutils"
)

func handleFile(filePath string) {
    // Get file extension
    ext := filepath.Ext(filePath)

    // Get MIME type from extension
    mimeType := ioutils.GetMimeFromExt(ext)

    // Handle file based on MIME type
    switch mimeType {
    case ioutils.MimeImageJPEG, ioutils.MimeImagePNG, ioutils.MimeImageGIF:
        fmt.Printf("Processing image file: %s\n", filePath)
        // Image processing logic...

    case ioutils.MimeApplicationPDF:
        fmt.Printf("Processing PDF document: %s\n", filePath)
        // PDF processing logic...

    case ioutils.MimeApplicationJSON:
        fmt.Printf("Processing JSON data: %s\n", filePath)
        // JSON processing logic...

    default:
        fmt.Printf("Unsupported file type for %s: %s\n", filePath, mimeType)
    }
}

func main() {
    // Example usage
    handleFile("document.pdf")
    handleFile("image.jpg")
    handleFile("data.json")
    handleFile("unknown.xyz")
}
```

## Installation

```bash
go get oss.nandlabs.io/golly/ioutils
```
