import {
  createQuarterlyNote,
  getAllQuarterlyNotes,
  getQuarterlyNote,
} from 'obsidian-daily-notes-interface';
import { PeriodicNote } from './periodic-note';

/**
 * Handles quarterly periodic notes.
 * Searches up to 4 quarters back when looking for previous notes.
 */
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
