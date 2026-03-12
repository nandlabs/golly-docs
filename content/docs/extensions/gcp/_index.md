---
title: ☁️ GCP
weight: 2
sidebar:
  open: false
---

Google Cloud service integrations for the Golly ecosystem using official Google Cloud client libraries.

```bash
go get oss.nandlabs.io/golly-gcp
```

Golly GCP provides implementations of core Golly interfaces — VFS, Messaging, and GenAI — backed by Google Cloud services. It follows Golly's provider pattern: blank-import a package to auto-register it, then use standard Golly managers with `gs://` or `pubsub://` URLs.

| Package                           | Category  | Description                                                              |
| --------------------------------- | --------- | ------------------------------------------------------------------------ |
| [gcpsvc]({{< relref "gcpsvc" >}}) | Config    | Centralized GCP config with named registry, multi-project/region support |
| [genai]({{< relref "genai" >}})   | GenAI     | Google GenAI provider — Vertex AI, Gemini API, and Model Garden          |
| [gs]({{< relref "gs" >}})         | Storage   | Google Cloud Storage VFS — read, write, copy, move, list, walk           |
| [pubsub]({{< relref "pubsub" >}}) | Messaging | Cloud Pub/Sub messaging — publish, receive, listeners, ordered delivery  |

> 📖 Full API documentation: [pkg.go.dev/oss.nandlabs.io/golly-gcp](https://pkg.go.dev/oss.nandlabs.io/golly-gcp)
