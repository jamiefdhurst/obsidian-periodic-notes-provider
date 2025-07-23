import { Moment, unitOfTime } from 'moment';
import { moment, TAbstractFile, type TFile } from 'obsidian';
import { createYearlyNote, getAllYearlyNotes, getYearlyNote } from 'obsidian-daily-notes-interface';
import Note, { checkCreateTime } from './note';

const MAX_PREVIOUS = 5;
const UNIT: unitOfTime.DurationConstructor = 'year';

export class YearlyNote extends Note {

  private getDate(): Moment {
    return moment().startOf(UNIT);
  }

  async create(): Promise<TFile> {
    const start: Moment = this.getDate().clone().startOf(UNIT);
    return createYearlyNote(start);
  }

  getAllPaths(): string[] {
    const allNotes: Record<string, TFile> = getAllYearlyNotes();

    return Object.entries(allNotes).map(([_, file]) => file.path);
  }
  
  getCurrent(): TFile {
    return getYearlyNote(this.getDate(), getAllYearlyNotes());
  }

  getNextDate(): Moment {
    return this.getDate().clone().add(1, UNIT);
  }

  getPrevious(): TFile {
    let date: Moment = this.getDate().clone().subtract(1, UNIT);
    const limit = date.clone().subtract(MAX_PREVIOUS, UNIT);
    const allNotes: Record<string, TFile> = getAllYearlyNotes();
    let note: TFile;
    do {
      note = getYearlyNote(date, allNotes);
      date.subtract(1, UNIT);
    } while (!note && date.isAfter(limit));

    return note;
  }
  
  isPresent(): boolean {
    const start: Moment = this.getDate().clone().startOf(UNIT);
    const allNotes: Record<string, TFile> = getAllYearlyNotes();
    const note: TFile = getYearlyNote(start, allNotes);
    
    return !!note;
  }

  isValid(file: TAbstractFile): boolean {
    const note: TFile = getYearlyNote(this.getDate(), getAllYearlyNotes());

    if (!note) {
      return false;
    }

    return note.name === file.name && checkCreateTime(note);
  }
}
