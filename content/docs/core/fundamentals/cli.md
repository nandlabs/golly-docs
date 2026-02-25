---
title: CLI
weight: 2
---

The `cli` package is a powerful Go library for building user-friendly command-line interfaces (CLIs). It provides an intuitive API for creating and managing complex command structures, parsing command-line arguments, and providing helpful error messages and usage information.

## Features

- Simple API for building nested command structures
- Automatic argument parsing and validation
- Built-in support for command flags and options
- Automatic generation of usage and help information
- Follows Go best practices for command-line application development

## Core Concepts

### Commands

Commands are the basic building blocks of your CLI application. Each command can have a name, description, handler function, and subcommands.

### Flags

Flags allow you to define parameters that can be passed to your commands. The package supports both short and long flag names, default values, and usage descriptions.

### Context

The context provides access to the parsed command-line arguments and flags within command handlers.

## Usage Examples

### Basic Command

```go
package main

import (
    "fmt"
    "log"
    "oss.nandlabs.io/golly/cli"
)

func main() {
    app := cli.NewCLI()

    gollyCmd := &cli.Command{
        Name:        "welcome",
        Description: "Welcome command",
        Handler: func(ctx *cli.Context) error {
            fmt.Println("welcome to golly!")
            return nil
        },
    }

    app.AddCommand(gollyCmd)

    if err := app.Execute(); err != nil {
        log.Fatal(err)
    }
}
```

### Nested Commands

```go
package main

import (
    "fmt"
    "log"
    "oss.nandlabs.io/golly/cli"
)

func main() {
    app := cli.NewCLI()

    welcomeCmd := &cli.Command{
        Name: "welcome",
        Description: "Welcome to golly",
        Handler: func(ctx *cli.Context) error {
            fmt.Println("welcome to golly")
            return nil
        },
        SubCommands: map[string]*cli.Command{
            "home": {
                Name:        "home",
                Description: "welcome home",
                Handler: func(ctx *cli.Context) error {
                    fmt.Println("welcome home")
                    return nil
                },
            },
            "office": {
                Name:        "office",
                Description: "welcome to the office",
                Handler: func(ctx *cli.Context) error {
                    fmt.Println("welcome office")
                    return nil
                },
            },
        },
    }

    app.AddCommand(welcomeCmd)

    if err := app.Execute(); err != nil {
        log.Fatal(err)
    }
}
```

### Working with Flags

```go
package main

import (
    "fmt"
    "log"
    "oss.nandlabs.io/golly/cli"
)

func main() {
    app := cli.NewCLI()

    server := &cli.Command{
        Name:        "server",
        Description: "Server command",
        Handler: func(ctx *cli.Context) error {
            region, _ := ctx.GetFlag("region")
            fmt.Printf("IN REGION, %s\n", region)
            return nil
        },
        Flags: []cli.Flag{
            {
                Name:    "region",
                Aliases: []string{"r"},
                Usage:   "Provide region",
                Default: "",
            },
        },
        SubCommands: map[string]*cli.Command{
            "create": {
                Name:        "create",
                Description: "create server",
                Handler: func(ctx *cli.Context) error {
                    typ, _ := ctx.GetFlag("type")
                    fmt.Printf("SERVER TYPE %s\n", typ)
                    return nil
                },
                Flags: []cli.Flag{
                    {
                        Name:    "type",
                        Aliases: []string{"t"},
                        Usage:   "server type",
                        Default: "",
                    },
                },
            },
        },
    }

    app.AddCommand(server)

    if err := app.Execute(); err != nil {
        log.Fatal(err)
    }
}
```

## Installation

```bash
go get oss.nandlabs.io/golly/cli
```
