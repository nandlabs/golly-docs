---
title: Basic Usage
draft: false
weight: 1
prev: /docs/cli
next: /docs/cli/multiple-commands
---

Here’s a simple example of a CLI tool with a single greet command:

```go
package main

import (
"fmt"
"oss.nandlabs.io/golly/cli"
"os"
)

func main() {
app := cli.NewApp()
app.Name = "greetcli"
app.Usage = "A simple CLI to greet people"

    app.Commands = []*cli.Command{
        {
            Name:   "greet",
            Usage:  "Prints a greeting message",
            Action: func(c *cli.Context) error {
                fmt.Println("Hello, world!")
                return nil
            },
        },
    }

    err := app.Run(os.Args)
    if err != nil {
        fmt.Println("Error running app:", err)
    }

}
```

Running the command greetcli greet will print “Hello, world!” to the console.
Let’s break down what’s happening:

- app.Name: Sets the CLI tool’s name.
- app.Usage: Describes what the tool does, which is used in the help message.
- app.Commands: Defines the list of commands that your CLI will support.
- Action: This is the function that executes when the command is run.
