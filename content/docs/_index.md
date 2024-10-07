---
title: Golly
draft: false
prev: /docs
next: /docs/cli
---

Welcome to **Golly**, a robust collection of enterprise-grade, open-source libraries written in Go (Golang). This project is designed to simplify and enhance the development of modern software systems by providing developers with highly reusable, well-documented utilities tailored to meet enterprise needs. Whether you are building scalable microservices, crafting middleware, or handling complex messaging systems, Golly offers solutions to common programming challenges while adhering to Go’s philosophy of simplicity and performance.

## Background and Motivation

In today's fast-paced development landscape, building scalable and maintainable software requires efficient tools and libraries. Golly was born out of the need for reusable components that tackle common programming tasks with minimal external dependencies, ensuring developers can focus on their core applications without compromising on performance or flexibility.

The project aims to be a **self-contained toolkit**, minimizing the need for additional external libraries while maintaining modularity and flexibility. This approach makes it easier for developers to integrate the libraries into various systems, regardless of their scale or complexity, while ensuring that they can handle high-demand, production-level environments.

## Why Golly?

- **Modular and Lightweight**: Golly is designed with a modular architecture, allowing developers to integrate only the components they need, without unnecessary bloat.
- **Enterprise-Focused**: The libraries in Golly are built with enterprise use cases in mind, ensuring reliability, scalability, and maintainability.
- **Minimal Dependencies**: A key focus of Golly is reducing external dependencies, making it easier to integrate and maintain, while minimizing potential conflicts and complexities during updates or changes.

## Available Packages

Golly contains a rich set of libraries to handle various aspects of development. Here's a breakdown of some core packages available in the Golly repository:

1. **Clients**: A flexible package to manage different types of clients. This module supports various client types like REST and messaging clients, simplifying the integration of external services into your application.
2. **CLI (Command-Line Interface)**: This package provides easy-to-use APIs for building complex command-line applications. It supports argument parsing, validation, and command structuring, making it ideal for automation tasks or command-line tools.

3. **Codec**: A unified interface for encoding and decoding structured data formats such as JSON, XML, and YAML. It simplifies data handling and ensures compatibility with various formats out of the box.

4. **L3 (Logging)**: A lightweight, level-based logging library. L3 supports various logging levels (OFF, ERROR, INFO, DEBUG, TRACE) and allows configuration through files, environment variables, or runtime values. It also provides asynchronous logging support and the ability to specify log levels per package.

5. **Messaging**: A general interface for producing and consuming messages across different messaging platforms, making it ideal for event-driven applications. It supports both local and remote messaging systems.

6. **REST**: A comprehensive HTTP client package, supporting common HTTP methods (GET, POST, PUT, DELETE), query parameters, headers, SSL, TLS, and error handling. This makes it an excellent choice for interacting with APIs or building RESTful services.

7. **SemVer**: A simple API for working with [Semantic Versioning 2.0.0](https://semver.org), providing utilities to parse, compare, and generate semantic versions, supporting pre-releases and build metadata.

8. **Testing/Assertion**: A flexible and extensible assertion library designed to facilitate consistent testing practices in Go projects. It provides a unified interface for asserting conditions in tests.

Each of these packages comes with extensive documentation and usage examples, making it easy for developers to get started and integrate them into their existing projects.

## How to Get Started

To install Golly, you can use the following command:

```bash
go get oss.nandlabs.io/golly
```
