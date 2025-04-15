---
title: File System Utilities
draft: false
prev: /docs/core/fnutils
next: /docs/core/genai
---

The `fsutils` package provides common utility functions for working with files and directories in Go. It simplifies frequent file system operations like checking file existence, determining content types, and more.

## Features

- **Existence Checking**: Easily check if files or directories exist
- **Content Type Detection**: Determine file content types (MIME types)
- **Path Utilities**: Work with file paths in a cross-platform manner
- **Simple API**: Clean, straightforward functions for common file system operations

## Core Functions

### File and Directory Operations

- `FileExists(path string) bool`: Checks if a file exists at the specified path
- `DirExists(path string) bool`: Checks if a directory exists at the specified path
- `PathExists(p string) bool`: Checks if any path (file or directory) exists

### Content Type Utilities

- `LookupContentType(path string) string`: Determines MIME type based on file extension
- `DetectContentType(path string) (string, error)`: Detects MIME type by examining file contents

## Usage Examples

### Checking File and Directory Existence

```go
package main

import (
    "fmt"
    "oss.nandlabs.io/golly/fsutils"
)

func main() {
    // Check if a file exists
    if fsutils.FileExists("config.json") {
        fmt.Println("Configuration file exists")
    } else {
        fmt.Println("Configuration file not found")
    }

    // Check if a directory exists
    if fsutils.DirExists("logs") {
        fmt.Println("Logs directory exists")
    } else {
        fmt.Println("Logs directory not found")
    }

    // Check if any path exists (file or directory)
    if fsutils.PathExists("data/users.db") {
        fmt.Println("Path exists")
    } else {
        fmt.Println("Path does not exist")
    }
}
```

### Working with Content Types

```go
package main

import (
    "fmt"
    "oss.nandlabs.io/golly/fsutils"
)

func main() {
    // Get content type by file extension
    contentType := fsutils.LookupContentType("document.pdf")
    fmt.Printf("Content type (by extension): %s\n", contentType)

    // Detect content type by examining file contents
    detectedType, err := fsutils.DetectContentType("image.jpg")
    if err != nil {
        fmt.Printf("Error detecting content type: %v\n", err)
    } else {
        fmt.Printf("Detected content type: %s\n", detectedType)
    }
}
```

### Creating a File Processing Function

```go
package main

import (
    "fmt"
    "os"
    "path/filepath"
    "oss.nandlabs.io/golly/fsutils"
)

// processFile processes a file based on its content type
func processFile(filePath string) error {
    // Check if file exists
    if !fsutils.FileExists(filePath) {
        return fmt.Errorf("file does not exist: %s", filePath)
    }

    // Get the content type
    contentType, err := fsutils.DetectContentType(filePath)
    if err != nil {
        return fmt.Errorf("error detecting content type: %v", err)
    }

    // Process based on content type
    switch {
    case contentType == "application/pdf":
        fmt.Printf("Processing PDF: %s\n", filePath)
        // PDF-specific processing logic
    case contentType == "image/jpeg" || contentType == "image/png":
        fmt.Printf("Processing image: %s\n", filePath)
        // Image-specific processing logic
    default:
        fmt.Printf("Unknown content type (%s) for file: %s\n", contentType, filePath)
    }

    return nil
}

func main() {
    // Example usage
    err := processFile("example.pdf")
    if err != nil {
        fmt.Printf("Error: %v\n", err)
    }
}
```

## Installation

```bash
go get oss.nandlabs.io/golly/fsutils
```
