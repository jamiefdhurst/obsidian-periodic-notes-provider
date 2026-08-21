import { ISettings } from '..';
import { ObsidianAppWithPlugins } from '../types';
export declare class PeriodicNotesPluginAdapter {
    private app;
    constructor(app: ObsidianAppWithPlugins);
    private getProvider;
    private getPlugin;
    /**
     * Whether the Periodic Notes plugin is installed and enabled.
     *
     * This no longer gates whether periodic notes can be used at all - see
     * {@link isNative}. It reports only whether the plugin is the settings source.
     *
     * @returns True if the Periodic Notes plugin is enabled
     */
    isEnabled(): boolean;
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
    isNative(): boolean;
    /**
     * Resolves the available periodicities.
     *
     * Uses the Periodic Notes plugin's own settings when it is installed, and
     * falls back to the native provider otherwise, so this never throws for a
     * missing plugin.
     *
     * @returns The available periodicities
     */
    convertSettings(): ISettings;
}
