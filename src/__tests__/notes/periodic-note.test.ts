import { moment, TFile } from 'obsidian';
import { unitOfTime } from 'moment';
import * as dailyNotesInterface from 'obsidian-daily-notes-interface';
import { DailyNote } from '../../notes/daily';
import { WeeklyNote } from '../../notes/weekly';
import { MonthlyNote } from '../../notes/monthly';
import { QuarterlyNote } from '../../notes/quarterly';
import { YearlyNote } from '../../notes/yearly';
import { checkCreateTime, PeriodicNote } from '../../notes/periodic-note';

jest.mock('obsidian');
jest.mock('obsidian-daily-notes-interface');

type PeriodicNoteConstructor = new () => PeriodicNote;

interface PeriodicNoteFunctions {
  create: jest.MockedFunction<any>;
  getAll: jest.MockedFunction<any>;
  get: jest.MockedFunction<any>;
}

describe('PeriodicNote', () => {
  it('checkCreateTime returns false usually', () => {
    const file = new TFile();
    file.name = 'file1.md';
    file.stat = {
      ctime: 1000000,
      mtime: 0,
      size: 2,
    };

    expect(checkCreateTime(file)).toEqual(false);
  });

  it('checkCreateTime returns true when the file was just created', () => {
    const file = new TFile();
    file.name = 'file2.md';
    file.stat = {
      ctime: new Date().getTime(),
      mtime: 0,
      size: 26,
    };

    expect(checkCreateTime(file)).toEqual(true);
  });
});

describe.each<
  [string, PeriodicNoteConstructor, unitOfTime.DurationConstructor, PeriodicNoteFunctions]
>([
  [
    'Daily Note',
    DailyNote,
    'day',
    {
      create: dailyNotesInterface.createDailyNote as jest.MockedFunction<
        typeof dailyNotesInterface.createDailyNote
      >,
      getAll: dailyNotesInterface.getAllDailyNotes as jest.MockedFunction<
        typeof dailyNotesInterface.getAllDailyNotes
      >,
      get: dailyNotesInterface.getDailyNote as jest.MockedFunction<
        typeof dailyNotesInterface.getDailyNote
      >,
    },
  ],
  [
    'Weekly Note',
    WeeklyNote,
    'week',
    {
      create: dailyNotesInterface.createWeeklyNote as jest.MockedFunction<
        typeof dailyNotesInterface.createWeeklyNote
      >,
      getAll: dailyNotesInterface.getAllWeeklyNotes as jest.MockedFunction<
        typeof dailyNotesInterface.getAllWeeklyNotes
      >,
      get: dailyNotesInterface.getWeeklyNote as jest.MockedFunction<
        typeof dailyNotesInterface.getWeeklyNote
      >,
    },
  ],
  [
    'Monthly Note',
    MonthlyNote,
    'month',
    {
      create: dailyNotesInterface.createMonthlyNote as jest.MockedFunction<
        typeof dailyNotesInterface.createMonthlyNote
      >,
      getAll: dailyNotesInterface.getAllMonthlyNotes as jest.MockedFunction<
        typeof dailyNotesInterface.getAllMonthlyNotes
      >,
      get: dailyNotesInterface.getMonthlyNote as jest.MockedFunction<
        typeof dailyNotesInterface.getMonthlyNote
      >,
    },
  ],
  [
    'Quarterly Note',
    QuarterlyNote,
    'quarter',
    {
      create: dailyNotesInterface.createQuarterlyNote as jest.MockedFunction<
        typeof dailyNotesInterface.createQuarterlyNote
      >,
      getAll: dailyNotesInterface.getAllQuarterlyNotes as jest.MockedFunction<
        typeof dailyNotesInterface.getAllQuarterlyNotes
      >,
      get: dailyNotesInterface.getQuarterlyNote as jest.MockedFunction<
        typeof dailyNotesInterface.getQuarterlyNote
      >,
    },
  ],
  [
    'Yearly Note',
    YearlyNote,
    'year',
    {
      create: dailyNotesInterface.createYearlyNote as jest.MockedFunction<
        typeof dailyNotesInterface.createYearlyNote
      >,
      getAll: dailyNotesInterface.getAllYearlyNotes as jest.MockedFunction<
        typeof dailyNotesInterface.getAllYearlyNotes
      >,
      get: dailyNotesInterface.getYearlyNote as jest.MockedFunction<
        typeof dailyNotesInterface.getYearlyNote
      >,
    },
  ],
])('%s', (name, NoteClass, unit, fns) => {
  let mockGetAllNotes: jest.MockedFunction<any>;
  let sut: PeriodicNote;

  beforeEach(() => {
    const emptyRecord: Record<string, TFile> = {};
    mockGetAllNotes = fns.getAll;
    mockGetAllNotes.mockReturnValue(emptyRecord);

    sut = new NoteClass();
  });

  afterEach(() => {
    mockGetAllNotes.mockReset();
  });

  it('creates a new note', async () => {
    const mock = fns.create;
    mock.mockImplementation(async () => {
      const file = new TFile();
      file.basename = 'example';
      return file;
    });

    const result = await sut.create();

    expect(result.basename).toEqual('example');

    mock.mockReset();
  });

  it('gets the paths of all notes', () => {
    const files: Record<string, TFile> = {
      example1: new TFile(),
      example2: new TFile(),
    };
    files.example1.path = 'example/example-1.md';
    files.example2.path = 'example/example-2.md';
    mockGetAllNotes.mockReturnValue(files);

    const result = sut.getAllPaths();

    expect(result.length).toEqual(2);
    expect(result[0]).toEqual('example/example-1.md');
    expect(result[1]).toEqual('example/example-2.md');
  });

  it('returns current note', () => {
    const mock = fns.get;
    const fileName = moment().format('YYYY-MM-DD');
    mock.mockImplementation(() => {
      const file = new TFile();
      file.basename = fileName;
      return file;
    });

    const result = sut.getCurrent();

    expect(result.basename).toEqual(fileName);
  });

  it('gets next date', () => {
    expect(sut.getNextDate()).toEqual(moment().startOf(unit).add(1, unit));
  });

  it('gets immediately previous note', () => {
    const mock = fns.get;
    const fileName = moment().subtract(1, 'day').format('YYYY-MM-DD');
    mock.mockImplementation(() => {
      const file = new TFile();
      file.basename = fileName;
      return file;
    });

    const result = sut.getPrevious();

    expect(result.basename).toEqual(fileName);
  });

  it('gets an undefined note if the previous limit is reached', () => {
    const mock = fns.get;
    mock.mockReturnValue(undefined as unknown as TFile);

    const result = sut.getPrevious();

    expect(result).toBe(undefined);
  });

  it('returns if present', () => {
    const mock = fns.get;
    mock.mockImplementation(() => {
      const file = new TFile();
      file.basename = 'example';
      return file;
    });

    const result = sut.isPresent();

    expect(result).toEqual(true);

    mock.mockReset();
  });

  it('returns valid but false when files do not match', () => {
    const mock = fns.get;
    mock.mockImplementation(() => {
      const file = new TFile();
      file.name = 'file1.md';
      return file;
    });

    const input = new TFile();
    input.name = 'file2.md';

    expect(sut.isValid(input)).toEqual(false);
  });

  it('returns valid but false when files match but create time is out', () => {
    const mock = fns.get;
    mock.mockImplementation(() => {
      const file = new TFile();
      file.name = 'file1.md';
      file.stat = {
        ctime: 1000000,
        mtime: 0,
        size: 2,
      };
      return file;
    });

    const input = new TFile();
    input.name = 'file1.md';

    expect(sut.isValid(input)).toEqual(false);
  });

  it('returns valid but false when no file is found', () => {
    const mock = fns.get;
    mock.mockReturnValue(undefined as unknown as TFile);

    const input = new TFile();
    input.name = 'file1.md';

    expect(sut.isValid(input)).toEqual(false);
  });

  it('returns valid', () => {
    const mock = fns.get;
    mock.mockImplementation(() => {
      const file = new TFile();
      file.name = 'file1.md';
      file.stat = {
        ctime: new Date().getTime(),
        mtime: new Date().getTime(),
        size: 200,
      };
      return file;
    });

    const input = new TFile();
    input.name = 'file1.md';

    expect(sut.isValid(input)).toEqual(true);
  });
});
