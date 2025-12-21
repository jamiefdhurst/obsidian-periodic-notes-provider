import {
  DEFAULT_SETTINGS,
  IPeriodicNotesPeriodicitySettings,
  IPeriodicNotesPluginSettings,
  IPeriodicNotesProvider,
  ISettings,
} from '..';

export interface IV0Settings extends IPeriodicNotesPluginSettings {
  daily: IPeriodicNotesPeriodicitySettings;
  weekly: IPeriodicNotesPeriodicitySettings;
  monthly: IPeriodicNotesPeriodicitySettings;
  quarterly: IPeriodicNotesPeriodicitySettings;
  yearly: IPeriodicNotesPeriodicitySettings;
}

export class V0Provider implements IPeriodicNotesProvider {
  convertSettings(from: IPeriodicNotesPluginSettings): ISettings {
    const convertedFrom = from as IV0Settings;
    const to: ISettings = Object.assign({}, DEFAULT_SETTINGS);

    to.daily.available = convertedFrom.daily.enabled;
    to.weekly.available = convertedFrom.weekly.enabled;
    to.monthly.available = convertedFrom.monthly.enabled;
    to.quarterly.available = convertedFrom.quarterly.enabled;
    to.yearly.available = convertedFrom.yearly.enabled;

    return to;
  }
}
