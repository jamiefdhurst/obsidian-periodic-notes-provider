import { Moment, unitOfTime } from 'moment';
import { moment, TAbstractFile, type TFile } from 'obsidian';
import { createQuarterlyNote, getAllQuarterlyNotes, getQuarterlyNote } from 'obsidian-daily-notes-interface';
import Note, { checkCreateTime } from './note';

const MAX_PREVIOUS = 4;
const UNIT: unitOfTime.DurationConstructor = 'quarter';

export class QuarterlyNote extends Note {

  private getDate(): Moment {
    return moment().startOf(UNIT);
  }

  async create(): Promise<TFile> {
    const start: Moment = this.getDate().clone().startOf(UNIT);
    return createQuarterlyNote(start);
  }

  getAllPaths(): string[] {
    const allNotes: Record<string, TFile> = getAllQuarterlyNotes();

    return Object.entries(allNotes).map(([_, file]) => file.path);
  }
  
  getCurrent(): TFile {
    return getQuarterlyNote(this.getDate(), getAllQuarterlyNotes());
  }

  getNextDate(): Moment {
    return this.getDate().clone().add(1, UNIT);
  }

  getPrevious(): TFile {
    let date: Moment = this.getDate().clone().subtract(1, UNIT);
    const limit = date.clone().subtract(MAX_PREVIOUS, UNIT);
    const allNotes: Record<string, TFile> = getAllQuarterlyNotes();
    let note: TFile;
    do {
      note = getQuarterlyNote(date, allNotes);
      date.subtract(1, UNIT);
    } while (!note && date.isAfter(limit));

    return note;
  }
  
  isPresent(): boolean {
    const start: Moment = this.getDate().clone().startOf(UNIT);
    const allNotes: Record<string, TFile> = getAllQuarterlyNotes();
    const note: TFile = getQuarterlyNote(start, allNotes);
    
    return !!note;
  }

  isValid(file: TAbstractFile): boolean {
    const note: TFile = getQuarterlyNote(this.getDate(), getAllQuarterlyNotes());

    if (!note) {
      return false;
    }

    return note.name === file.name && checkCreateTime(note);
  }
}
