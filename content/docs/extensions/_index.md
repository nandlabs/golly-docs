---
title: Cloud Extensions
draft: false
weight: 3
sidebar:
  open: true
---

Cloud provider extensions for Golly — plug-and-play implementations of core Golly interfaces (VFS, Messaging, GenAI) backed by real cloud services.

Each extension follows Golly's **provider pattern**: blank-import a package to auto-register it, then use standard Golly managers with cloud-specific URL schemes (`s3://`, `gs://`, `sqs://`, `pubsub://`, etc.).

## Available Extensions

### ☁️ [AWS]({{< relref "aws" >}})

AWS service integrations using the [AWS SDK for Go v2](https://github.com/aws/aws-sdk-go-v2).

| Package                                 | Category  | Description                                           |
| --------------------------------------- | --------- | ----------------------------------------------------- |
| [awscfg]({{< relref "aws/awscfg" >}})   | Config    | Centralized AWS config management with named registry |
| [bedrock]({{< relref "aws/bedrock" >}}) | GenAI     | AWS Bedrock provider via the Converse API             |
| [s3]({{< relref "aws/s3" >}})           | Storage   | S3 implementation of the golly VFS interface          |
| [sns]({{< relref "aws/sns" >}})         | Messaging | SNS implementation of the golly messaging provider    |
| [sqs]({{< relref "aws/sqs" >}})         | Messaging | SQS implementation of the golly messaging provider    |

### ☁️ [GCP]({{< relref "gcp" >}})

Google Cloud service integrations using official Google Cloud client libraries.

| Package                               | Category  | Description                                            |
| ------------------------------------- | --------- | ------------------------------------------------------ |
| [gcpsvc]({{< relref "gcp/gcpsvc" >}}) | Config    | Centralized GCP config management with named registry  |
| [genai]({{< relref "gcp/genai" >}})   | GenAI     | Google GenAI provider for Vertex AI and Gemini API     |
| [gs]({{< relref "gcp/gs" >}})         | Storage   | Google Cloud Storage implementation of the golly VFS   |
| [pubsub]({{< relref "gcp/pubsub" >}}) | Messaging | Google Cloud Pub/Sub implementation of golly messaging |
