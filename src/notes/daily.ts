import { createDailyNote, getAllDailyNotes, getDailyNote } from 'obsidian-daily-notes-interface';
import { PeriodicNote } from './periodic-note';

export class DailyNote extends PeriodicNote {
  constructor() {
    super({
      unit: 'day',
      maxPrevious: 30,
      createNote: createDailyNote,
      getAllNotes: getAllDailyNotes,
      getNote: getDailyNote,
    });
  }
}
