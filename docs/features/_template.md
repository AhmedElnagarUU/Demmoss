# Feature: <name>

Status: planned | in progress | done

## Purpose

What business value this feature brings, in one or two sentences.

## Flow in plain words

1. …
2. …

## User stories

| # | As a … I want to… | So that… |
|---|---|---|
| X1 | | |

## Flow diagram

```mermaid
flowchart TD
  A[Start] --> B[Step]
```

## Sequence (only if the browser talks to the server)

```mermaid
sequenceDiagram
  participant B as Browser
  participant R as route.ts
  participant S as service.ts
  B->>R: request
  R->>S: call
  S-->>R: result
  R-->>B: response
```

## Data

What is stored, where (MongoDB / localStorage), and its shape.

## Files

```
src/features/<name>/
  ...
```

## Out of scope

- …
