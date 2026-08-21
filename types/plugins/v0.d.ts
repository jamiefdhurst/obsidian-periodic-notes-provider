import { IPeriodicNotesPeriodicitySettings, IPeriodicNotesPluginSettings, IPeriodicNotesProvider, ISettings } from '..';
export interface IV0Settings extends IPeriodicNotesPluginSettings {
    daily: IPeriodicNotesPeriodicitySettings;
    weekly: IPeriodicNotesPeriodicitySettings;
    monthly: IPeriodicNotesPeriodicitySettings;
    quarterly: IPeriodicNotesPeriodicitySettings;
    yearly: IPeriodicNotesPeriodicitySettings;
}
export declare class V0Provider implements IPeriodicNotesProvider {
    convertSettings(from: IPeriodicNotesPluginSettings): ISettings;
}
