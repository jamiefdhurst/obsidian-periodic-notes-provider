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
 * Checks if a file was created within the acceptable time gap (15 seconds).
 * Used to validate that a periodic note file was recently created.
 *
 * @param file - The TFile to check
 * @returns True if the file was created within the last 15 seconds, false otherwise
 */
export function checkCreateTime(file: TFile): boolean {
  return file.stat.ctime > new Date().getTime() - CREATE_TIME_GAP_MS;
}

/**
 * Abstract base class for periodic notes (daily, weekly, monthly, quarterly, yearly).
 * Provides a unified interface for interacting with different periodicities of notes
 * through the obsidian-daily-notes-interface package.
 *
 * @example
 * ```typescript
 * const daily = new DailyNote();
 * const current = daily.getCurrent();
 * const nextDate = daily.getNextDate();
 * ```
 */
export abstract class PeriodicNote {
  constructor(private config: PeriodicNoteConfig) {}

  private getDate(): Moment {
    return moment().startOf(this.config.unit);
  }

  /**
   * Creates a new periodic note for the current time period.
   *
   * @returns A promise that resolves to the created TFile
   * @example
   * ```typescript
   * const daily = new DailyNote();
   * const file = await daily.create();
   * ```
   */
  async create(): Promise<TFile> {
    const start: Moment = this.getDate().clone().startOf(this.config.unit);
    return this.config.createNote(start);
  }

  /**
   * Gets the file paths of all existing periodic notes of this type.
   *
   * @returns An array of file paths for all periodic notes
   * @example
   * ```typescript
   * const weekly = new WeeklyNote();
   * const paths = weekly.getAllPaths();
   * // Returns: ['journal/2024-W01.md', 'journal/2024-W02.md', ...]
   * ```
   */
  getAllPaths(): string[] {
    const allNotes: Record<string, TFile> = this.config.getAllNotes();

    return Object.entries(allNotes).map(([_, file]) => file.path);
  }

  /**
   * Gets the periodic note for the current time period.
   *
   * @returns The TFile for the current period, or undefined if it doesn't exist
   * @example
   * ```typescript
   * const monthly = new MonthlyNote();
   * const currentMonth = monthly.getCurrent();
   * ```
   */
  getCurrent(): TFile {
    return this.config.getNote(this.getDate(), this.config.getAllNotes());
  }

  /**
   * Calculates the start date of the next time period.
   *
   * @returns A Moment object representing the start of the next period
   * @example
   * ```typescript
   * const yearly = new YearlyNote();
   * const nextYear = yearly.getNextDate();
   * // If today is 2024-12-21, returns 2025-01-01
   * ```
   */
  getNextDate(): Moment {
    return this.getDate().clone().add(1, this.config.unit);
  }

  /**
   * Gets the most recent previous periodic note, searching backwards up to a limit.
   * The search limit varies by periodicity (e.g., 30 days for daily, 8 weeks for weekly).
   *
   * @returns The TFile for the most recent previous note, or undefined if none found within limit
   * @example
   * ```typescript
   * const daily = new DailyNote();
   * const yesterday = daily.getPrevious();
   * // Returns most recent daily note within the last 30 days
   * ```
   */
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

  /**
   * Checks if a periodic note exists for the current time period.
   *
   * @returns True if a note exists for the current period, false otherwise
   * @example
   * ```typescript
   * const quarterly = new QuarterlyNote();
   * if (!quarterly.isPresent()) {
   *   await quarterly.create();
   * }
   * ```
   */
  isPresent(): boolean {
    const start: Moment = this.getDate().clone().startOf(this.config.unit);
    const allNotes: Record<string, TFile> = this.config.getAllNotes();
    const note: TFile = this.config.getNote(start, allNotes);

    return !!note;
  }

  /**
   * Validates that a file is the current periodic note and was recently created.
   * Checks both the file name match and creation timestamp.
   *
   * @param file - The TAbstractFile to validate
   * @returns True if the file matches the current note and was created within 15 seconds
   * @example
   * ```typescript
   * const daily = new DailyNote();
   * const file = await daily.create();
   * const valid = daily.isValid(file); // Returns true if just created
   * ```
   */
  isValid(file: TAbstractFile): boolean {
    const note: TFile = this.config.getNote(this.getDate(), this.config.getAllNotes());

    if (!note) {
      return false;
    }

    return note.name === file.name && checkCreateTime(note);
  }
}
