import { writable } from 'svelte/store';
import { IV1Settings, V1Provider } from '../../plugins';

describe('V1 Provider', () => {
  let sut: V1Provider;

  beforeEach(() => {
    sut = new V1Provider();
  });

  it('should set everything to false with no calendar sets', () => {
    let settings = writable<IV1Settings>();
    settings.set({
      activeCalendarSet: '',
      calendarSets: [],
    } as IV1Settings);

    const result = sut.convertSettings(settings);

    expect(result.daily.available).toEqual(false);
    expect(result.weekly.available).toEqual(false);
    expect(result.monthly.available).toEqual(false);
    expect(result.quarterly.available).toEqual(false);
    expect(result.yearly.available).toEqual(false);
  });

  it('should work with the default calendar set correctly', () => {
    let settings = writable<IV1Settings>();
    settings.set({
      activeCalendarSet: '1234',
      calendarSets: [{
        id: '1234',
        day: { enabled: true },
        week: { enabled: true },
        month: { enabled: false },
        quarter: { enabled: false },
        year: { enabled: true },
      }],
    } as IV1Settings);

    const result = sut.convertSettings(settings);

    expect(result.daily.available).toEqual(true);
    expect(result.weekly.available).toEqual(true);
    expect(result.monthly.available).toEqual(false);
    expect(result.quarterly.available).toEqual(false);
    expect(result.yearly.available).toEqual(true);
  });

  it('should work with an empty calendar set', () => {
    let settings = writable<IV1Settings>();
    settings.set({
      activeCalendarSet: '1234',
      calendarSets: [{
        id: '1234',
      }],
    } as IV1Settings);

    const result = sut.convertSettings(settings);

    expect(result.daily.available).toEqual(false);
    expect(result.weekly.available).toEqual(false);
    expect(result.monthly.available).toEqual(false);
    expect(result.quarterly.available).toEqual(false);
    expect(result.yearly.available).toEqual(false);
  });
});
