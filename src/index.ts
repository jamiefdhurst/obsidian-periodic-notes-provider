import type { Plugin } from 'obsidian';

export const PLUGIN_NAME: string = 'periodic-notes';
export const PERIODIC_NOTES_EVENT_SETTING_UPDATED: string = 'periodic-notes:settings-updated';

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
  daily: {available: false},
  weekly: {available: false},
  monthly: {available: false},
  quarterly: {available: false},
  yearly: {available: false},
}

export interface IPeriodicNotesPeriodicitySettings {
  enabled: boolean;
}

export interface IPeriodicNotesPluginSettings {}

export interface IPeriodicNotesPlugin extends Plugin {
  settings: IPeriodicNotesPluginSettings;
}

export interface IPeriodicNotesProvider {
  convertSettings(from: IPeriodicNotesPluginSettings): ISettings;
}

export * from './notes';
export * from './plugins';
