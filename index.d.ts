import { Moment } from 'moment';
import { Plugin, TAbstractFile, TFile } from 'obsidian';

export const PLUGIN_NAME = 'periodic-notes';
export const PERIODIC_NOTES_EVENT_SETTING_UPDATED = 'periodic-notes:settings-updated';

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

export abstract class Note {
  abstract create(): Promise<TFile>;
  abstract getAllPaths(): string[];
  abstract getCurrent(): TFile;
  abstract getNextDate(): Moment;
  abstract getPrevious(): TFile;
  abstract isPresent(): boolean;
  abstract isValid(file: TAbstractFile): boolean;
}

export class DailyNote extends Note {
  create(): Promise<TFile>;
  getAllPaths(): string[];
  getCurrent(): TFile;
  getNextDate(): Moment;
  getPrevious(): TFile;
  isPresent(): boolean;
  isValid(file: TAbstractFile): boolean;
}

export class WeeklyNote extends Note {
  create(): Promise<TFile>;
  getAllPaths(): string[];
  getCurrent(): TFile;
  getNextDate(): Moment;
  getPrevious(): TFile;
  isPresent(): boolean;
  isValid(file: TAbstractFile): boolean;
}

export class MonthlyNote extends Note {
  create(): Promise<TFile>;
  getAllPaths(): string[];
  getCurrent(): TFile;
  getNextDate(): Moment;
  getPrevious(): TFile;
  isPresent(): boolean;
  isValid(file: TAbstractFile): boolean;
}

export class QuarterlyNote extends Note {
  create(): Promise<TFile>;
  getAllPaths(): string[];
  getCurrent(): TFile;
  getNextDate(): Moment;
  getPrevious(): TFile;
  isPresent(): boolean;
  isValid(file: TAbstractFile): boolean;
}

export class YearlyNote extends Note {
  create(): Promise<TFile>;
  getAllPaths(): string[];
  getCurrent(): TFile;
  getNextDate(): Moment;
  getPrevious(): TFile;
  isPresent(): boolean;
  isValid(file: TAbstractFile): boolean;
}

export function checkCreateTime(file: TFile): boolean;

type CommunityPluginManager = {
  enabledPlugins: Set<string>;
  getPlugin(id: string): Plugin | undefined;
}

type ObsidianAppWithPlugins = {
  plugins: CommunityPluginManager;
};

export class PeriodicNotesPluginAdapter {
  constructor(app: ObsidianAppWithPlugins);
  isEnabled(): boolean;
  convertSettings(): ISettings;
}

export class V0Provider implements IPeriodicNotesProvider {
  convertSettings(from: IPeriodicNotesPluginSettings): ISettings;
}
export class V1Provider implements IPeriodicNotesProvider {
  convertSettings(from: IPeriodicNotesPluginSettings): ISettings;
}
