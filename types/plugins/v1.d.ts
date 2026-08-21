import { IPeriodicNotesPeriodicitySettings, IPeriodicNotesPluginSettings, IPeriodicNotesProvider, ISettings } from '..';
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
export declare class V1Provider implements IPeriodicNotesProvider {
    convertSettings(from: IPeriodicNotesPluginSettings): ISettings;
}
