---
title: SemVer Package
weight: 3
---

The `semver` package provides a complete implementation of the [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html) specification in Go. It offers tools for parsing, comparing, and manipulating version strings following the SemVer standard.

## Features

- **Full SemVer Support**: Complete implementation of SemVer 2.0.0 specification
- **Version Parsing**: Parse version strings into structured objects
- **Version Comparison**: Compare versions to determine precedence
- **Pre-release Support**: Handle pre-release version suffixes (e.g., alpha, beta)
- **Build Metadata**: Support for build metadata
- **Version Increment**: Methods to increment major, minor, and patch versions

## Core Components

### Version

The central type in the package is the `Version` struct, which represents a semantic version with all its components:

```go
type Version struct {
    // Major version component (incompatible API changes)
    Major int

    // Minor version component (backwards-compatible functionality)
    Minor int

    // Patch version component (backwards-compatible bug fixes)
    Patch int

    // Pre-release version information
    PreRelease string

    // Build metadata
    Build string
}
```

### Parser Functions

- `Parse(version string) (*Version, error)`: Parse a version string into a Version object
- `MustParse(version string) *Version`: Like Parse, but panics on error

### Comparison Functions

- `Compare(v1, v2 *Version) int`: Compare two versions for precedence
- `LessThan(v1, v2 *Version) bool`: Check if v1 is less than v2
- `Equal(v1, v2 *Version) bool`: Check if v1 is equal to v2

## Usage Examples

### Parsing a Version String

```go
package main

import (
    "fmt"
    "oss.nandlabs.io/golly/semver"
)

func main() {
    // Parse a basic version
    version, err := semver.Parse("1.2.3")
    if err != nil {
        fmt.Printf("Error parsing version: %v\n", err)
        return
    }

    // Access version components
    fmt.Printf("Major: %d\n", version.CurrentMajor())
    fmt.Printf("Minor: %d\n", version.CurrentMinor())
    fmt.Printf("Patch: %d\n", version.CurrentPatch())

    // Parse a version with pre-release and build metadata
    complexVersion, err := semver.Parse("2.0.0-alpha.1+build.123")
    if err != nil {
        fmt.Printf("Error parsing complex version: %v\n", err)
        return
    }

    fmt.Printf("Complex version: %s\n", complexVersion.String())
    fmt.Printf("Pre-release: %s\n", complexVersion.CurrentPreRelease())
    fmt.Printf("Build metadata: %s\n", complexVersion.CurrentBuild())
}
```

### Comparing Versions

```go
package main

import (
    "fmt"
    "oss.nandlabs.io/golly/semver"
)

func main() {
    v1, _ := semver.Parse("1.2.3")
    v2, _ := semver.Parse("1.3.0")
    v3, _ := semver.Parse("1.2.3-alpha")
    v4, _ := semver.Parse("1.2.3")

    // Compare versions
    fmt.Println("v1 < v2:", semver.LessThan(v1, v2))  // true
    fmt.Println("v3 < v1:", semver.LessThan(v3, v1))  // true (pre-release is less than regular)
    fmt.Println("v1 == v4:", semver.Equal(v1, v4))    // true

    // Sort a slice of versions
    versions := []*semver.Version{v3, v1, v2, v4}
    semver.Sort(versions)

    fmt.Println("Sorted versions:")
    for _, v := range versions {
        fmt.Println(v.String())
    }
    // Output:
    // 1.2.3-alpha
    // 1.2.3
    // 1.2.3
    // 1.3.0
}
```

### Incrementing Versions

```go
package main

import (
    "fmt"
    "oss.nandlabs.io/golly/semver"
)

func main() {
    version, _ := semver.Parse("1.2.3")

    // Increment major version (2.0.0)
    majorVersion := version.IncrementMajor()
    fmt.Printf("Incremented major: %s\n", majorVersion.String())

    // Increment minor version (1.3.0)
    minorVersion := version.IncrementMinor()
    fmt.Printf("Incremented minor: %s\n", minorVersion.String())

    // Increment patch version (1.2.4)
    patchVersion := version.IncrementPatch()
    fmt.Printf("Incremented patch: %s\n", patchVersion.String())

    // Working with pre-release versions
    preRelease, _ := semver.Parse("1.2.3-alpha.1")
    nextPreRelease := preRelease.IncrementPreRelease()
    fmt.Printf("Next pre-release: %s\n", nextPreRelease.String())  // 1.2.3-alpha.2
}
```

### Version Validation

```go
package main

import (
    "fmt"
    "oss.nandlabs.io/golly/semver"
)

func main() {
    validVersions := []string{
        "1.0.0",
        "1.0.0-alpha",
        "1.0.0-alpha.1",
        "1.0.0-alpha.beta",
        "1.0.0+build.1",
        "1.0.0-alpha+build.1",
    }

    invalidVersions := []string{
        "1",
        "1.0",
        "1.a.0",
        "v1.0.0",  // 'v' prefix is not allowed by the strict spec
        "1.0.0.0",
    }

    fmt.Println("Valid versions:")
    for _, v := range validVersions {
        _, err := semver.Parse(v)
        fmt.Printf("%s: %v\n", v, err == nil)
    }

    fmt.Println("Invalid versions:")
    for _, v := range invalidVersions {
        _, err := semver.Parse(v)
        fmt.Printf("%s: %v (%v)\n", v, err == nil, err)
    }
}
```

## Installation

```bash
go get oss.nandlabs.io/golly/semver
```
