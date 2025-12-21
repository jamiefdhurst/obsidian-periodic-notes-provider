import { createWeeklyNote, getAllWeeklyNotes, getWeeklyNote } from 'obsidian-daily-notes-interface';
import { PeriodicNote } from './periodic-note';

/**
 * Handles weekly periodic notes.
 * Searches up to 8 weeks back when looking for previous notes.
 */
export class WeeklyNote extends PeriodicNote {
  constructor() {
    super({
      unit: 'week',
      maxPrevious: 8,
      createNote: createWeeklyNote,
      getAllNotes: getAllWeeklyNotes,
      getNote: getWeeklyNote,
    });
  }
}
