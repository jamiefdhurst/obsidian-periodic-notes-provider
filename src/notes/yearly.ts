import { createYearlyNote, getAllYearlyNotes, getYearlyNote } from 'obsidian-daily-notes-interface';
import { PeriodicNote } from './periodic-note';

/**
 * Handles yearly periodic notes.
 * Searches up to 5 years back when looking for previous notes.
 */
export class YearlyNote extends PeriodicNote {
  constructor() {
    super({
      unit: 'year',
      maxPrevious: 5,
      createNote: createYearlyNote,
      getAllNotes: getAllYearlyNotes,
      getNote: getYearlyNote,
    });
  }
}
