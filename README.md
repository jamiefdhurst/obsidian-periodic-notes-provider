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
- Works without the Periodic Notes plugin installed, falling back to native defaults

## The Periodic Notes plugin is optional

Notes are created and read through [obsidian-daily-notes-interface](https://github.com/liamcain/obsidian-daily-notes-interface), which supplies its own defaults for every periodicity when the Periodic Notes plugin is absent — `YYYY-MM-DD`, `gggg-[W]ww` (or the Calendar plugin's settings, if installed), `YYYY-MM`, `YYYY-[Q]Q` and `YYYY`, each in the vault root with no template.

`PeriodicNotesPluginAdapter` selects the settings source at runtime, so `convertSettings()` never throws for a missing plugin:

```typescript
const adapter = new PeriodicNotesPluginAdapter(app);

adapter.isEnabled(); // Is the Periodic Notes plugin installed and enabled?
adapter.isNative(); // Are we falling back to native defaults?

const settings = adapter.convertSettings(); // Works either way
```

When falling back, all five periodicities are reported as available — which ones a user actually wants is left to the consuming plugin's own settings.

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
