---
title: Multiple Commands
draft: false
weight: 2
prev: /docs/cli/basic
next: /docs/cli/flags
---

In many cases, a CLI tool will need to support more than one command. For example, let’s add another command to print a farewell message.

## Adding Multiple Commands

The following code snippet demonstrates how to add a goodbye command to the greetcli tool:

### Example: Greet and Goodbye Commands

```go
app.Commands = []*cli.Command{
    {
        Name:   "greet",
        Usage:  "Prints a greeting message",
        Action: func(c *cli.Context) error {
            fmt.Println("Hello, world!")
            return nil
        },
    },
    {
        Name:   "goodbye",
        Usage:  "Prints a farewell message",
        Action: func(c *cli.Context) error {
            fmt.Println("Goodbye!")
            return nil
        },
    },
}
```

Now your CLI has two commands: greet and goodbye. The user can run greetcli greet to see “Hello, world!” and greetcli goodbye to see “Goodbye!”

## Working with Subcommands

For complex applications, you may need to nest commands within each other, known as subcommands. Subcommands allow you to organize your CLI more effectively. Here’s an example of how to create a deploy command with start and stop subcommands:

### Example: Deploy Command with Subcommands

```go
app.Commands = []*cli.Command{
    {
        Name: "deploy",
        Usage: "Manage deployments",
        Subcommands: []*cli.Command{
            {
                Name:   "start",
                Usage:  "Start a deployment",
                Action: func(c *cli.Context) error {
                    fmt.Println("Deployment started")
                    return nil
                },
            },
            {
                Name:   "stop",
                Usage:  "Stop a deployment",
                Action: func(c *cli.Context) error {
                    fmt.Println("Deployment stopped")
                    return nil
                },
            },
        },
    },
}
```

With this structure, users can now run greetcli deploy start to start a deployment and greetcli deploy stop to stop it. This kind of structure is useful for CLIs that need to handle multiple operations under a single command.

## Final Thoughts

By organizing your CLI commands into subcommands, you can create a more intuitive and user-friendly experience for your users. Subcommands help users navigate your CLI tool more effectively and understand the different operations it supports. When designing your CLI, consider how subcommands can help you structure your commands in a logical and user-friendly way.

For more information, check out the official [Golly CLI package documentation](https://pkg.go.dev/oss.nandlabs.io/golly/cli).
