import { buildSettings, IPeriodicNotesPluginSettings, IPeriodicNotesProvider, ISettings } from '..';

/**
 * Provides periodic note settings without the Periodic Notes plugin installed.
 *
 * Note creation and lookup already run through obsidian-daily-notes-interface,
 * which falls back to its own defaults for every granularity when the plugin is
 * absent - `YYYY-MM-DD` for daily, `gggg-[W]ww` for weekly (or the Calendar
 * plugin's settings if it is present), `YYYY-MM`, `YYYY-[Q]Q` and `YYYY` for the
 * rest, each in the vault root with no template. Every periodicity is therefore
 * usable natively, and all five are reported as available.
 *
 * Which periodicities a user actually wants is left to the consuming plugin's
 * own settings, rather than being inferred here.
 *
 * @example
 * ```typescript
 * const provider = new NativeProvider();
 * const settings = provider.convertSettings();
 * // settings.quarterly.available === true
 * ```
 */
export class NativeProvider implements IPeriodicNotesProvider {
  /**
   * Reports every periodicity as available.
   *
   * @param _from - Unused; there is no external plugin to read settings from
   * @returns Settings with all five periodicities available
   */
  convertSettings(_from?: IPeriodicNotesPluginSettings): ISettings {
    return buildSettings(true);
  }
}
