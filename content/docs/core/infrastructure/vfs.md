---
title: VFS Package
weight: 8
---

The `vfs` package provides a unified, abstract interface for accessing multiple file systems in Go. It creates an abstraction layer that allows applications to interact with different storage backends using a consistent API, regardless of where the files are actually stored.

## Features

- **Unified API**: Common interface for different file systems
- **Local File System**: Built-in support for the local OS file system
- **Extensible Design**: Easy integration of new file system implementations
- **File Operations**: Standard operations like read, write, create, delete
- **Directory Management**: Create, list, and navigate directory structures
- **Path Management**: Consistent path handling across different systems
- **VFS Manager**: Central coordination of multiple file systems

## Core Components

### VFS Interface

The main interface that defines a virtual file system:

```go
type VFS interface {
    // Create a new file
    Create(path string) (VFile, error)

    // Open an existing file
    Open(path string) (VFile, error)

    // Check if a file exists
    Exists(path string) (bool, error)

    // Create a directory
    Mkdir(path string) error

    // Create a directory and any necessary parent directories
    MkdirAll(path string) error

    // Remove a file
    Remove(path string) error

    // Remove a directory and all its contents
    RemoveAll(path string) error

    // List contents of a directory
    ReadDir(path string) ([]os.FileInfo, error)

    // Get file statistics
    Stat(path string) (os.FileInfo, error)

    // Additional methods omitted for brevity
}
```

### VFile Interface

Interface representing a file in the virtual file system:

```go
type VFile interface {
    // Read from the file
    Read(p []byte) (n int, err error)

    // Write to the file
    Write(p []byte) (n int, err error)

    // Close the file
    Close() error

    // Get file name
    Name() string

    // Seek to a position in the file
    Seek(offset int64, whence int) (int64, error)

    // Get file statistics
    Stat() (os.FileInfo, error)

    // Additional methods omitted for brevity
}
```

### VFS Manager

Coordinates multiple file systems:

```go
type VFSManager interface {
    // Register a VFS implementation
    RegisterVFS(scheme string, fs VFS)

    // Get a VFS implementation by scheme
    GetVFS(scheme string) (VFS, bool)

    // Create a file using a raw URI
    CreateRaw(uri string) (VFile, error)

    // Open a file using a raw URI
    OpenRaw(uri string) (VFile, error)

    // Additional methods that mirror VFS but work with URIs
    // including scheme (e.g., "file:///path/to/file")
}
```

## Usage Examples

### Basic File Operations

```go
package main

import (
    "fmt"
    "io"
    "log"

    "oss.nandlabs.io/golly/vfs"
)

func main() {
    // Get the VFS manager
    manager := vfs.GetManager()

    // Create a file using the local file system
    file, err := manager.CreateRaw("file:///tmp/example.txt")
    if err != nil {
        log.Fatalf("Error creating file: %v", err)
    }

    // Write to the file
    _, err = file.Write([]byte("Hello, VFS!"))
    if err != nil {
        log.Fatalf("Error writing to file: %v", err)
    }

    // Close the file
    file.Close()

    // Open the file for reading
    file, err = manager.OpenRaw("file:///tmp/example.txt")
    if err != nil {
        log.Fatalf("Error opening file: %v", err)
    }
    defer file.Close()

    // Read the file content
    content := make([]byte, 100)
    n, err := file.Read(content)
    if err != nil && err != io.EOF {
        log.Fatalf("Error reading file: %v", err)
    }

    fmt.Printf("Read %d bytes: %s\n", n, content[:n])
}
```

### Working with Directories

```go
package main

import (
    "fmt"
    "log"
    "os"

    "oss.nandlabs.io/golly/vfs"
)

func main() {
    // Get the VFS manager
    manager := vfs.GetManager()

    // Create a directory structure
    err := manager.MkdirAllRaw("file:///tmp/vfs/example/nested")
    if err != nil {
        log.Fatalf("Error creating directories: %v", err)
    }

    // Create some files in the directory
    for i := 1; i <= 3; i++ {
        filePath := fmt.Sprintf("file:///tmp/vfs/example/file%d.txt", i)
        file, err := manager.CreateRaw(filePath)
        if err != nil {
            log.Fatalf("Error creating file: %v", err)
        }
        file.Write([]byte(fmt.Sprintf("This is file %d", i)))
        file.Close()
    }

    // List the directory contents
    files, err := manager.ReadDirRaw("file:///tmp/vfs/example")
    if err != nil {
        log.Fatalf("Error reading directory: %v", err)
    }

    fmt.Println("Directory contents:")
    for _, file := range files {
        fileType := "file"
        if file.IsDir() {
            fileType = "directory"
        }
        fmt.Printf("- %s (type: %s, size: %d bytes)\n", file.Name(), fileType, file.Size())
    }

    // Check if a file exists
    exists, err := manager.ExistsRaw("file:///tmp/vfs/example/file1.txt")
    if err != nil {
        log.Fatalf("Error checking file existence: %v", err)
    }
    fmt.Printf("File exists: %v\n", exists)

    // Get file information
    fileInfo, err := manager.StatRaw("file:///tmp/vfs/example/file2.txt")
    if err != nil {
        log.Fatalf("Error getting file info: %v", err)
    }
    fmt.Printf("File info: name=%s, size=%d, mode=%v\n",
               fileInfo.Name(), fileInfo.Size(), fileInfo.Mode())
}
```

### Creating Custom VFS Implementations

```go
package main

import (
    "fmt"
    "io"
    "os"
    "time"

    "oss.nandlabs.io/golly/vfs"
)

// MemoryFile implements the VFile interface for in-memory files
type MemoryFile struct {
    name    string
    content []byte
    pos     int64
}

func (m *MemoryFile) Read(p []byte) (n int, err error) {
    if m.pos >= int64(len(m.content)) {
        return 0, io.EOF
    }

    n = copy(p, m.content[m.pos:])
    m.pos += int64(n)
    return n, nil
}

func (m *MemoryFile) Write(p []byte) (n int, err error) {
    // Expand the content slice if necessary
    requiredLen := m.pos + int64(len(p))
    if requiredLen > int64(len(m.content)) {
        newContent := make([]byte, requiredLen)
        copy(newContent, m.content)
        m.content = newContent
    }

    // Write the data
    n = copy(m.content[m.pos:], p)
    m.pos += int64(n)
    return n, nil
}

func (m *MemoryFile) Close() error {
    return nil
}

func (m *MemoryFile) Name() string {
    return m.name
}

func (m *MemoryFile) Seek(offset int64, whence int) (int64, error) {
    switch whence {
    case io.SeekStart:
        m.pos = offset
    case io.SeekCurrent:
        m.pos += offset
    case io.SeekEnd:
        m.pos = int64(len(m.content)) + offset
    }

    if m.pos < 0 {
        m.pos = 0
    }
    return m.pos, nil
}

// MemoryFS implements the VFS interface for an in-memory file system
type MemoryFS struct {
    files map[string]*MemoryFile
}

func NewMemoryFS() *MemoryFS {
    return &MemoryFS{
        files: make(map[string]*MemoryFile),
    }
}

// Implement the VFS methods for MemoryFS

func main() {
    // Create a new memory file system
    memfs := NewMemoryFS()

    // Register it with the VFS manager
    manager := vfs.GetManager()
    manager.RegisterVFS("mem", memfs)

    // Now you can use the memory file system with the "mem:" scheme
    file, _ := manager.CreateRaw("mem:///example.txt")
    file.Write([]byte("Hello from memory!"))
    file.Close()

    // Read the file back
    file, _ = manager.OpenRaw("mem:///example.txt")
    content := make([]byte, 100)
    n, _ := file.Read(content)
    fmt.Printf("Read from memory file: %s\n", content[:n])
}
```

## Extending to Cloud Storage

The VFS package can be extended to work with cloud storage systems by implementing the VFS interface for various cloud providers:

```go
package main

import (
    "fmt"
    "log"

    "oss.nandlabs.io/golly/vfs"
    // Import cloud VFS implementations
    "oss.nandlabs.io/golly-aws/s3vfs"
    "oss.nandlabs.io/golly-gcp/gs"
    "oss.nandlabs.io/golly-azure/blobvfs"
)

func main() {
    // Get the VFS manager
    manager := vfs.GetManager()

    // Register different VFS implementations
    manager.RegisterVFS("file", vfs.NewLocalFS())  // Local files
    manager.RegisterVFS("s3", s3vfs.NewS3FS())     // AWS S3
    manager.RegisterVFS("gs", gs.NewGoogleFS())    // Google Cloud Storage
    manager.RegisterVFS("blob", blobvfs.NewBlobFS()) // Azure Blob Storage

    // Now you can work with files across different storage systems

    // Create a file in S3
    s3File, err := manager.CreateRaw("s3://my-bucket/example.txt")
    if err != nil {
        log.Fatalf("Error creating S3 file: %v", err)
    }
    s3File.Write([]byte("Hello from S3!"))
    s3File.Close()

    // Read a file from Google Cloud Storage
    gsFile, err := manager.OpenRaw("gs://my-gcs-bucket/data.json")
    if err != nil {
        log.Fatalf("Error opening GCS file: %v", err)
    }
    // Process the file...
    gsFile.Close()

    // Copy a file from Azure Blob Storage to local file system
    source, err := manager.OpenRaw("blob://my-container/source.txt")
    if err != nil {
        log.Fatalf("Error opening Azure blob: %v", err)
    }

    destination, err := manager.CreateRaw("file:///tmp/destination.txt")
    if err != nil {
        log.Fatalf("Error creating local file: %v", err)
    }

    // Copy the file
    // (In a real implementation, you would use io.Copy with proper error handling)
    // io.Copy(destination, source)

    source.Close()
    destination.Close()

    fmt.Println("File operations completed across multiple storage systems")
}
```

## Installation

```bash
go get oss.nandlabs.io/golly/vfs
```
