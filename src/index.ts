import type { Plugin } from 'obsidian';

export const PERIODIC_NOTES_EVENT_SETTING_UPDATED: string = 'periodic-notes:settings-updated';
export const PLUGIN_NAME: string = 'periodic-notes';

export interface IPeriodicSettings {
  available: boolean;
}

export interface ISettings {
  daily: IPeriodicSettings;
  weekly: IPeriodicSettings;
  monthly: IPeriodicSettings;
  quarterly: IPeriodicSettings;
  yearly: IPeriodicSettings;
}

export const DEFAULT_SETTINGS: ISettings = {
  daily: { available: false },
  weekly: { available: false },
  monthly: { available: false },
  quarterly: { available: false },
  yearly: { available: false },
};

/**
 * Builds a fresh ISettings with every periodicity set to the given availability.
 *
 * Providers must not start from DEFAULT_SETTINGS via Object.assign - that is a
 * shallow copy, so the nested IPeriodicSettings objects would be shared with the
 * exported constant and writing to them would mutate it for every consumer.
 *
 * @param available - The availability to apply to all periodicities
 * @returns A new ISettings object sharing no references with DEFAULT_SETTINGS
 */
export function buildSettings(available: boolean = false): ISettings {
  return {
    daily: { available },
    weekly: { available },
    monthly: { available },
    quarterly: { available },
    yearly: { available },
  };
}

export interface IPeriodicNotesPeriodicitySettings {
  enabled: boolean;
}

export interface IPeriodicNotesPluginSettings {}

export interface IPeriodicNotesPlugin extends Plugin {
  settings: IPeriodicNotesPluginSettings;
}

export interface IPeriodicNotesProvider {
  /**
   * @param from - The source plugin's settings, absent for providers that do
   *   not read from another plugin
   */
  convertSettings(from?: IPeriodicNotesPluginSettings): ISettings;
}

export * from './notes';
export * from './plugins';
