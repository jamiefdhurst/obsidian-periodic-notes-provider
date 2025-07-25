import { moment, TFile } from 'obsidian';
import * as dailyNotesInterface from 'obsidian-daily-notes-interface';
import { DailyNote } from '../../notes/daily';

jest.mock('obsidian');
jest.mock('obsidian-daily-notes-interface');

describe('Daily Note', () => {

  let mockGetAllNotes: jest.MockedFunction<typeof dailyNotesInterface.getAllDailyNotes>;

  let sut: DailyNote;

  beforeEach(() => {
    const emptyRecord: Record<string, TFile> = {};
    mockGetAllNotes = dailyNotesInterface.getAllDailyNotes as jest.MockedFunction<typeof dailyNotesInterface.getAllDailyNotes>;
    mockGetAllNotes.mockReturnValue(emptyRecord);

    sut = new DailyNote();
  });

  afterEach(() => {
    mockGetAllNotes.mockReset();
  });

  it('creates a new note', async () => {
    const mock = dailyNotesInterface.createDailyNote as jest.MockedFunction<typeof dailyNotesInterface.createDailyNote>;
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
    const mock = dailyNotesInterface.getDailyNote as jest.MockedFunction<typeof dailyNotesInterface.getDailyNote>;
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
    expect(sut.getNextDate()).toEqual(moment().startOf('day').add(1, 'day'));
  });

  it('gets immediately previous note', () => {
    const mock = dailyNotesInterface.getDailyNote as jest.MockedFunction<typeof dailyNotesInterface.getDailyNote>;
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
    const mock = dailyNotesInterface.getDailyNote as jest.MockedFunction<typeof dailyNotesInterface.getDailyNote>;
    mock.mockReturnValue(undefined as unknown as TFile);

    const result = sut.getPrevious();

    expect(result).toBe(undefined);
  });

  it('returns if present', () => {
    const mock = dailyNotesInterface.getDailyNote as jest.MockedFunction<typeof dailyNotesInterface.getDailyNote>;
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
    const mock = dailyNotesInterface.getDailyNote as jest.MockedFunction<typeof dailyNotesInterface.getDailyNote>;
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
    const mock = dailyNotesInterface.getDailyNote as jest.MockedFunction<typeof dailyNotesInterface.getDailyNote>;
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
    const mock = dailyNotesInterface.getDailyNote as jest.MockedFunction<typeof dailyNotesInterface.getDailyNote>;
    mock.mockReturnValue(undefined as unknown as TFile);

    const input = new TFile();
    input.name = 'file1.md';

    expect(sut.isValid(input)).toEqual(false);
  })

  it('returns valid', () => {
    const mock = dailyNotesInterface.getDailyNote as jest.MockedFunction<typeof dailyNotesInterface.getDailyNote>;
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
