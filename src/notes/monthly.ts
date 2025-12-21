import {
  createMonthlyNote,
  getAllMonthlyNotes,
  getMonthlyNote,
} from 'obsidian-daily-notes-interface';
import { PeriodicNote } from './periodic-note';

/**
 * Handles monthly periodic notes.
 * Searches up to 12 months back when looking for previous notes.
 */
export class MonthlyNote extends PeriodicNote {
  constructor() {
    super({
      unit: 'month',
      maxPrevious: 12,
      createNote: createMonthlyNote,
      getAllNotes: getAllMonthlyNotes,
      getNote: getMonthlyNote,
    });
  }
}
