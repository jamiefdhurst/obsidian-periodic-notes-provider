import { IPeriodicNotesPlugin, PLUGIN_NAME } from '../..';
import { PeriodicNotesPluginAdapter } from '../../plugins';
import { CommunityPluginManager, ObsidianAppWithPlugins } from '../../types';

describe('Plugin Adapter', () => {
  let app: ObsidianAppWithPlugins;

  let sut: PeriodicNotesPluginAdapter;

  beforeEach(() => {
    app = jest.fn() as unknown as ObsidianAppWithPlugins;
    app.plugins = jest.fn() as unknown as CommunityPluginManager;
    app.plugins.getPlugin = jest.fn();

    sut = new PeriodicNotesPluginAdapter(app);
  });

  it('returns enabled as false when plugin is disabled', () => {
    app.plugins.enabledPlugins = new Set<string>();

    expect(sut.isEnabled()).toEqual(false);
  });

  it('returns enabled when plugin is enabled', () => {
    app.plugins.enabledPlugins = new Set<string>([PLUGIN_NAME]);

    expect(sut.isEnabled()).toEqual(true);
  });

  it('converts settings correctly for v0', () => {
    const plugin = {
      settings: {
        daily: { enabled: true },
        weekly: { enabled: false },
        monthly: { enabled: false },
        quarterly: { enabled: false },
        yearly: { enabled: false },
      },
    } as unknown as IPeriodicNotesPlugin;
    jest.spyOn(app.plugins, 'getPlugin').mockReturnValue(plugin);

    const result = sut.convertSettings();

    expect(result.daily.available).toEqual(true);
    expect(result.weekly.available).toEqual(false);
  });
});
