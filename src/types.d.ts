declare module 'obsidian-periodic-notes-adapter';

import { Plugin } from 'obsidian';

export type CommunityPluginManager = {
  enabledPlugins: Set<string>;
  getPlugin(id: string): Plugin | undefined;
}

export type ObsidianAppWithPlugins = {
  plugins: CommunityPluginManager;
};
