import type { Plugin } from 'obsidian';
export declare const PERIODIC_NOTES_EVENT_SETTING_UPDATED: string;
export declare const PLUGIN_NAME: string;
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
export declare const DEFAULT_SETTINGS: ISettings;
export interface IPeriodicNotesPeriodicitySettings {
    enabled: boolean;
}
export interface IPeriodicNotesPluginSettings {
}
export interface IPeriodicNotesPlugin extends Plugin {
    settings: IPeriodicNotesPluginSettings;
}
export interface IPeriodicNotesProvider {
    convertSettings(from: IPeriodicNotesPluginSettings): ISettings;
}
export * from './notes';
export * from './plugins';
