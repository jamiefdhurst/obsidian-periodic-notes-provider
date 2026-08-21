import { DEFAULT_SETTINGS } from '../..';
import { NativeProvider } from '../../plugins';

describe('Native Provider', () => {
  let sut: NativeProvider;

  beforeEach(() => {
    sut = new NativeProvider();
  });

  it('reports every periodicity as available', () => {
    const result = sut.convertSettings();

    expect(result.daily.available).toEqual(true);
    expect(result.weekly.available).toEqual(true);
    expect(result.monthly.available).toEqual(true);
    expect(result.quarterly.available).toEqual(true);
    expect(result.yearly.available).toEqual(true);
  });

  it('ignores any settings passed to it', () => {
    const result = sut.convertSettings({ daily: { enabled: false } } as never);

    expect(result.daily.available).toEqual(true);
  });

  it('does not mutate DEFAULT_SETTINGS', () => {
    sut.convertSettings();

    expect(DEFAULT_SETTINGS.daily.available).toEqual(false);
    expect(DEFAULT_SETTINGS.yearly.available).toEqual(false);
  });

  it('returns a fresh object on each call', () => {
    const first = sut.convertSettings();
    first.daily.available = false;

    expect(sut.convertSettings().daily.available).toEqual(true);
  });
});
