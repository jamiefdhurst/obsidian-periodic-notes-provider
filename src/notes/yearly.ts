import { createYearlyNote, getAllYearlyNotes, getYearlyNote } from 'obsidian-daily-notes-interface';
import { PeriodicNote } from './periodic-note';

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
