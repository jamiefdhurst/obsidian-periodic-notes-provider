import { Moment, unitOfTime } from 'moment';
import { moment, TAbstractFile, type TFile } from 'obsidian';
import { createMonthlyNote, getAllMonthlyNotes, getMonthlyNote } from 'obsidian-daily-notes-interface';
import Note, { checkCreateTime } from './note';

const MAX_PREVIOUS = 12;
const UNIT: unitOfTime.DurationConstructor = 'month';

export class MonthlyNote extends Note {

  private getDate(): Moment {
    return moment().startOf(UNIT);
  }

  async create(): Promise<TFile> {
    const start: Moment = this.getDate().clone().startOf(UNIT);
    return createMonthlyNote(start);
  }

  getAllPaths(): string[] {
    const allNotes: Record<string, TFile> = getAllMonthlyNotes();

    return Object.entries(allNotes).map(([_, file]) => file.path);
  }
  
  getCurrent(): TFile {
    return getMonthlyNote(this.getDate(), getAllMonthlyNotes());
  }

  getNextDate(): Moment {
    return this.getDate().clone().add(1, UNIT);
  }

  getPrevious(): TFile {
    let date: Moment = this.getDate().clone().subtract(1, UNIT);
    const limit = date.clone().subtract(MAX_PREVIOUS, UNIT);
    const allNotes: Record<string, TFile> = getAllMonthlyNotes();
    let note: TFile;
    do {
      note = getMonthlyNote(date, allNotes);
      date.subtract(1, UNIT);
    } while (!note && date.isAfter(limit));

    return note;
  }
  
  isPresent(): boolean {
    const start: Moment = this.getDate().clone().startOf(UNIT);
    const allNotes: Record<string, TFile> = getAllMonthlyNotes();
    const note: TFile = getMonthlyNote(start, allNotes);
    
    return !!note;
  }

  isValid(file: TAbstractFile): boolean {
    const note: TFile = getMonthlyNote(this.getDate(), getAllMonthlyNotes());

    if (!note) {
      return false;
    }

    return note.name === file.name && checkCreateTime(note);
  }
}
