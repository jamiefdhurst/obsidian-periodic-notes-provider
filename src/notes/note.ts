import { Moment } from 'moment';
import { TAbstractFile, TFile } from 'obsidian';

const CREATE_TIME_GAP_MS = 15000;

export default abstract class Note {
  abstract create(): Promise<TFile>;
  abstract getAllPaths(): string[];
  abstract getCurrent(): TFile;
  abstract getNextDate(): Moment;
  abstract getPrevious(): TFile;
  abstract isPresent(): boolean;
  abstract isValid(file: TAbstractFile): boolean;
}

export function checkCreateTime(file: TFile): boolean {
  return file.stat.ctime > new Date().getTime() - CREATE_TIME_GAP_MS;
}
