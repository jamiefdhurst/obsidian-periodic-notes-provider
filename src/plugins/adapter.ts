import { IPeriodicNotesPlugin, IPeriodicNotesProvider, ISettings, PLUGIN_NAME } from 'src';
import { ObsidianAppWithPlugins } from 'src/types';
import { IV0Settings, V0Provider } from './v0';
import { V1Provider } from './v1';

export class PeriodicNotesPluginAdapter {
  private app: ObsidianAppWithPlugins;

  constructor(app: ObsidianAppWithPlugins) {
    this.app = app;
  }

  private getProvider(): IPeriodicNotesProvider {
    const settings = this.getPlugin().settings;
    if ((settings as IV0Settings).daily !== undefined) {
      return new V0Provider();
    }

    return new V1Provider();
  }

  private getPlugin(): IPeriodicNotesPlugin {
    return this.app.plugins.getPlugin(PLUGIN_NAME) as IPeriodicNotesPlugin;
  }

  isEnabled(): boolean {
    return this.app.plugins.enabledPlugins.has(PLUGIN_NAME);
  }

  convertSettings(): ISettings {
    return this.getProvider().convertSettings(this.getPlugin().settings);
  }
}
