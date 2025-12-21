import { Moment, unitOfTime } from 'moment';
import { moment, TAbstractFile, type TFile } from 'obsidian';

const CREATE_TIME_GAP_MS = 15000;

/**
 * Configuration for a periodic note type
 */
interface PeriodicNoteConfig {
  unit: unitOfTime.DurationConstructor;
  maxPrevious: number;
  createNote: (date: Moment) => Promise<TFile>;
  getAllNotes: () => Record<string, TFile>;
  getNote: (date: Moment, allNotes: Record<string, TFile>) => TFile;
}

/**
 * Checks if a file was created within the acceptable time gap
 */
export function checkCreateTime(file: TFile): boolean {
  return file.stat.ctime > new Date().getTime() - CREATE_TIME_GAP_MS;
}

/**
 * Generic periodic note implementation that handles all note periodicities
 */
export abstract class PeriodicNote {
  constructor(private config: PeriodicNoteConfig) {}

  private getDate(): Moment {
    return moment().startOf(this.config.unit);
  }

  async create(): Promise<TFile> {
    const start: Moment = this.getDate().clone().startOf(this.config.unit);
    return this.config.createNote(start);
  }

  getAllPaths(): string[] {
    const allNotes: Record<string, TFile> = this.config.getAllNotes();

    return Object.entries(allNotes).map(([_, file]) => file.path);
  }

  getCurrent(): TFile {
    return this.config.getNote(this.getDate(), this.config.getAllNotes());
  }

  getNextDate(): Moment {
    return this.getDate().clone().add(1, this.config.unit);
  }

  getPrevious(): TFile {
    let date: Moment = this.getDate().clone().subtract(1, this.config.unit);
    const limit = date.clone().subtract(this.config.maxPrevious, this.config.unit);
    const allNotes: Record<string, TFile> = this.config.getAllNotes();
    let note: TFile;
    do {
      note = this.config.getNote(date, allNotes);
      date.subtract(1, this.config.unit);
    } while (!note && date.isAfter(limit));

    return note;
  }

  isPresent(): boolean {
    const start: Moment = this.getDate().clone().startOf(this.config.unit);
    const allNotes: Record<string, TFile> = this.config.getAllNotes();
    const note: TFile = this.config.getNote(start, allNotes);

    return !!note;
  }

  isValid(file: TAbstractFile): boolean {
    const note: TFile = this.config.getNote(this.getDate(), this.config.getAllNotes());

    if (!note) {
      return false;
    }

    return note.name === file.name && checkCreateTime(note);
  }
}
