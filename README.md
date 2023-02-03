This is a Micro Fronted project using Next.js with Module Federation and Typescript

## Getting Started

First, run the development server

```bash
npm run start

# or

yarn start
```

## Context

We have two next.js applications

- `home` - port 3000
- `chat` - port 3001

The applications utilize omnidirectional routing and pages or components are able to be federated between applications like a SPA
