---
title: ☁️ AWS
weight: 1
sidebar:
  open: false
---

AWS service integrations for the Golly ecosystem using the [AWS SDK for Go v2](https://github.com/aws/aws-sdk-go-v2).

```bash
go get oss.nandlabs.io/golly-aws
```

Golly AWS provides implementations of core Golly interfaces — VFS, Messaging, and GenAI — backed by AWS services. It follows Golly's provider pattern: blank-import a package to auto-register it, then use standard Golly managers with `s3://`, `sqs://`, or `sns://` URLs.

| Package                             | Category  | Description                                                              |
| ----------------------------------- | --------- | ------------------------------------------------------------------------ |
| [awscfg]({{< relref "awscfg" >}})   | Config    | Centralized AWS config with named registry, multi-account/region support |
| [bedrock]({{< relref "bedrock" >}}) | GenAI     | AWS Bedrock GenAI provider — Claude, Titan, Llama, Mistral, and more     |
| [s3]({{< relref "s3" >}})           | Storage   | S3 VFS — read, write, copy, move, list, walk, and directory operations   |
| [sns]({{< relref "sns" >}})         | Messaging | SNS messaging — publish, batch publish, FIFO support                     |
| [sqs]({{< relref "sqs" >}})         | Messaging | SQS messaging — send, receive, listeners, FIFO support                   |

> 📖 Full API documentation: [pkg.go.dev/oss.nandlabs.io/golly-aws](https://pkg.go.dev/oss.nandlabs.io/golly-aws)
