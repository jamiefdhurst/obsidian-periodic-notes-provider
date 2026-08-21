import { ISettings } from '..';
import { ObsidianAppWithPlugins } from '../types';
export declare class PeriodicNotesPluginAdapter {
    private app;
    constructor(app: ObsidianAppWithPlugins);
    private getProvider;
    private getPlugin;
    isEnabled(): boolean;
    convertSettings(): ISettings;
}
