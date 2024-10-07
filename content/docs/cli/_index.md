---
title: CLI (Commad-Line Interface)
draft: false
weight: 2
prev: /docs
next: /docs/cli/basic
---

### Introduction

Command-Line Interfaces (CLIs) are a critical tool for automating tasks, configuring software, and managing systems. They provide developers and users with quick and efficient ways to interact with applications from the command line. In Go, creating such interfaces is simplified with the help of libraries like Golly’s cli package.

### Why Golly’s cli Package?

- Modular and Scalable: It supports multiple commands, subcommands, flags, and argument parsing, making it easy to build both small utilities and complex, multi-level CLI applications.
- Auto-Generated Help: Automatically provides help text based on your defined commands and flags, improving usability without extra effort.
- Extensibility: Custom hooks, error handling make the cli package highly extensible.

### Setting Up Golly’s cli Package

To begin building a CLI application with Golly, you first need to install the package in your Go environment:

```bash
go get oss.nandlabs.io/golly/cli
```

Once installed, create a new Go file for your CLI tool.
In the next chapter let’s set up a basic application that prints a greeting message.
