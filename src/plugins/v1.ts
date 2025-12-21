import { get, Readable } from 'svelte/store';
import {
  DEFAULT_SETTINGS,
  IPeriodicNotesPeriodicitySettings,
  IPeriodicNotesPluginSettings,
  IPeriodicNotesProvider,
  ISettings,
} from '..';

export interface IV1CalendarSet {
  id: string;

  day?: IPeriodicNotesPeriodicitySettings;
  week?: IPeriodicNotesPeriodicitySettings;
  month?: IPeriodicNotesPeriodicitySettings;
  quarter?: IPeriodicNotesPeriodicitySettings;
  year?: IPeriodicNotesPeriodicitySettings;
}

export interface IV1Settings extends IPeriodicNotesPluginSettings {
  activeCalendarSet: string;
  calendarSets: IV1CalendarSet[];
}

export class V1Provider implements IPeriodicNotesProvider {
  convertSettings(from: IPeriodicNotesPluginSettings): ISettings {
    const readableFrom = from as Readable<IV1Settings>;
    const convertedFrom = get(readableFrom) as IV1Settings;
    const activeCalendarSet = convertedFrom.calendarSets.filter(
      (c) => c.id === convertedFrom.activeCalendarSet
    );

    const to: ISettings = Object.assign({}, DEFAULT_SETTINGS);
    to.daily.available = false;
    to.weekly.available = false;
    to.monthly.available = false;
    to.quarterly.available = false;
    to.yearly.available = false;
    if (activeCalendarSet.length) {
      to.daily.available = activeCalendarSet[0]!.day?.enabled || false;
      to.weekly.available = activeCalendarSet[0]!.week?.enabled || false;
      to.monthly.available = activeCalendarSet[0]!.month?.enabled || false;
      to.quarterly.available = activeCalendarSet[0]!.quarter?.enabled || false;
      to.yearly.available = activeCalendarSet[0]!.year?.enabled || false;
    }

    return to;
  }
}
