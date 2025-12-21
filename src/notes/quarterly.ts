import { createQuarterlyNote, getAllQuarterlyNotes, getQuarterlyNote } from 'obsidian-daily-notes-interface';
import { PeriodicNote } from './periodic-note';

export class QuarterlyNote extends PeriodicNote {
  constructor() {
    super({
      unit: 'quarter',
      maxPrevious: 4,
      createNote: createQuarterlyNote,
      getAllNotes: getAllQuarterlyNotes,
      getNote: getQuarterlyNote,
    });
  }
}
