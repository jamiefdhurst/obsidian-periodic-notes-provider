import { buildSettings, DEFAULT_SETTINGS } from '../..';
import { IV0Settings, IV1Settings, V0Provider, V1Provider } from '../../plugins';
import { writable } from 'svelte/store';

const allEnabled: IV0Settings = {
  daily: { enabled: true },
  weekly: { enabled: true },
  monthly: { enabled: true },
  quarterly: { enabled: true },
  yearly: { enabled: true },
};

describe('Settings isolation', () => {
  it('builds settings sharing no references with DEFAULT_SETTINGS', () => {
    const built = buildSettings(true);

    expect(built.daily).not.toBe(DEFAULT_SETTINGS.daily);
    expect(built.yearly).not.toBe(DEFAULT_SETTINGS.yearly);
  });

  it('does not mutate DEFAULT_SETTINGS when converting v0 settings', () => {
    new V0Provider().convertSettings(allEnabled);

    expect(DEFAULT_SETTINGS.daily.available).toEqual(false);
    expect(DEFAULT_SETTINGS.weekly.available).toEqual(false);
    expect(DEFAULT_SETTINGS.monthly.available).toEqual(false);
    expect(DEFAULT_SETTINGS.quarterly.available).toEqual(false);
    expect(DEFAULT_SETTINGS.yearly.available).toEqual(false);
  });

  it('does not mutate DEFAULT_SETTINGS when converting v1 settings', () => {
    const settings: IV1Settings = {
      activeCalendarSet: 'foobar',
      calendarSets: [{ id: 'foobar', day: { enabled: true }, year: { enabled: true } }],
    };

    new V1Provider().convertSettings(writable(settings) as never);

    expect(DEFAULT_SETTINGS.daily.available).toEqual(false);
    expect(DEFAULT_SETTINGS.yearly.available).toEqual(false);
  });

  it('does not leak state between successive conversions', () => {
    const provider = new V0Provider();

    provider.convertSettings(allEnabled);
    const second = provider.convertSettings({
      daily: { enabled: false },
      weekly: { enabled: false },
      monthly: { enabled: false },
      quarterly: { enabled: false },
      yearly: { enabled: false },
    } as IV0Settings);

    expect(second.daily.available).toEqual(false);
    expect(second.yearly.available).toEqual(false);
  });
});
