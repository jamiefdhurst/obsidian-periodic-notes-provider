import { createWeeklyNote, getAllWeeklyNotes, getWeeklyNote } from 'obsidian-daily-notes-interface';
import { PeriodicNote } from './periodic-note';

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
