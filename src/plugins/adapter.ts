import { IPeriodicNotesPlugin, IPeriodicNotesProvider, ISettings, PLUGIN_NAME } from '..';
import { ObsidianAppWithPlugins } from '../types';
import { NativeProvider } from './native';
import { IV0Settings, V0Provider } from './v0';
import { V1Provider } from './v1';

export class PeriodicNotesPluginAdapter {
  private app: ObsidianAppWithPlugins;

  constructor(app: ObsidianAppWithPlugins) {
    this.app = app;
  }

  private getProvider(): IPeriodicNotesProvider {
    // Keyed on whether settings are actually readable rather than on
    // isEnabled(), so a plugin that is enabled but not yet loaded - or has been
    // removed leaving a stale enabledPlugins entry - still falls back cleanly.
    const settings = this.getPlugin()?.settings;
    if (settings === undefined) {
      return new NativeProvider();
    }

    if ((settings as IV0Settings).daily !== undefined) {
      return new V0Provider();
    }

    return new V1Provider();
  }

  private getPlugin(): IPeriodicNotesPlugin | undefined {
    return this.app.plugins.getPlugin(PLUGIN_NAME) as IPeriodicNotesPlugin | undefined;
  }

  /**
   * Whether the Periodic Notes plugin is installed and enabled.
   *
   * This no longer gates whether periodic notes can be used at all - see
   * {@link isNative}. It reports only whether the plugin is the settings source.
   *
   * @returns True if the Periodic Notes plugin is enabled
   */
  isEnabled(): boolean {
    return this.app.plugins.enabledPlugins.has(PLUGIN_NAME);
  }

  /**
   * Whether settings are being sourced natively rather than from the plugin.
   *
   * @returns True when the Periodic Notes plugin is absent or unreadable
   * @example
   * ```typescript
   * const adapter = new PeriodicNotesPluginAdapter(app);
   * if (adapter.isNative()) {
   *   // Falling back to obsidian-daily-notes-interface defaults
   * }
   * ```
   */
  isNative(): boolean {
    return this.getProvider() instanceof NativeProvider;
  }

  /**
   * Resolves the available periodicities.
   *
   * Uses the Periodic Notes plugin's own settings when it is installed, and
   * falls back to the native provider otherwise, so this never throws for a
   * missing plugin.
   *
   * @returns The available periodicities
   */
  convertSettings(): ISettings {
    return this.getProvider().convertSettings(this.getPlugin()?.settings);
  }
}
