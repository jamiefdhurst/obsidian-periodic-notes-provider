import { IV0Settings, V0Provider } from '../../plugins';

describe('V0 Provider', () => {
  let sut: V0Provider;

  beforeEach(() => {
    sut = new V0Provider();
  });

  it('should convert settings', () => {
    const settings = {
      daily: { enabled: true },
      weekly: { enabled: false },
      monthly: { enabled: false },
      quarterly: { enabled: false },
      yearly: { enabled: true },
    } as IV0Settings;

    const result = sut.convertSettings(settings);

    expect(result.daily.available).toEqual(true);
    expect(result.weekly.available).toEqual(false);
    expect(result.monthly.available).toEqual(false);
    expect(result.quarterly.available).toEqual(false);
    expect(result.yearly.available).toEqual(true);
  });
});
