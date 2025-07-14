# Obsidian Periodic Notes Provider

A wrapper for [Liam Cain's Periodic Notes plugin](https://github.com/liamcain/obsidian-periodic-notes) for [Obsidian](https://obsidian.md).

This has been specifically designed to provide shared functionality for the following plugins:

- [Auto Periodic Notes](https://github.com/jamiefdhurst/obsidian-auto-periodic-notes)
- [Auto Tasks](https://github.com/jamiefdhurst/obsidian-auto-tasks)

This can be used to extend the same functionality in other plugins for Obsidian, too.

## Features

- Supports the existing (v0.0.17) and upcoming (v1.0.0-beta) versions of the Periodic Notes plugin
- Respects settings from both apps and translates these for the resulting plugin
- Provides a consistent interface to query and create notes within both plugins

## Development

This plugin has been developed using Typescript with the Obsidian and Periodic Notes APIs.

To test the plugin using just, you can run it with or without coverage:

```bash
npm run test
npm run coverage
```

When submitting a PR, the plugin will be automatically tested, and when merged into main this will be built and released using GitHub Actions.

## Thanks

Many thanks to [Liam Cain](https://liamca.in/hello) for the awesome work on the Periodic Notes plugin!
