import { createMonthlyNote, getAllMonthlyNotes, getMonthlyNote } from 'obsidian-daily-notes-interface';
import { PeriodicNote } from './periodic-note';

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
