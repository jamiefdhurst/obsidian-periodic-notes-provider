import { Moment, unitOfTime } from 'moment';
import { moment, TAbstractFile, type TFile } from 'obsidian';
import { createDailyNote, getAllDailyNotes, getDailyNote } from 'obsidian-daily-notes-interface';
import Note, { checkCreateTime } from './note';

const MAX_PREVIOUS = 30;
const UNIT: unitOfTime.DurationConstructor = 'day';

export class DailyNote extends Note {

  private date: Moment = moment();

  private getDate(): Moment {
    return moment().startOf(UNIT);
  }

  async create(): Promise<TFile> {
    const start: Moment = this.date.clone().startOf(UNIT);
    return createDailyNote(start);
  }

  getAllPaths(): string[] {
    const allNotes: Record<string, TFile> = getAllDailyNotes();

    return Object.entries(allNotes).map(([_, file]) => file.path);
  }
  
  getCurrent(): TFile {
    return getDailyNote(this.date, getAllDailyNotes());
  }

  getNextDate(): Moment {
    return this.getDate().clone().add(1, UNIT);
  }

  getPrevious(): TFile {
    let date: Moment = this.getDate().clone().subtract(1, UNIT);
    const limit = date.clone().subtract(MAX_PREVIOUS, UNIT);
    const allNotes: Record<string, TFile> = getAllDailyNotes();
    let note: TFile;
    do {
      note = getDailyNote(date, allNotes);
      date.subtract(1, UNIT);
    } while (!note && date.isAfter(limit));

    return note;
  }
  
  isPresent(): boolean {
    const start: Moment = this.date.clone().startOf(UNIT);
    const allNotes: Record<string, TFile> = getAllDailyNotes();
    const note: TFile = getDailyNote(start, allNotes);
    
    return !!note;
  }

  isValid(file: TAbstractFile): boolean {
    const note: TFile = getDailyNote(this.getDate(), getAllDailyNotes());

    if (!note) {
      return false;
    }

    return note.name === file.name && checkCreateTime(note);
  }
}
