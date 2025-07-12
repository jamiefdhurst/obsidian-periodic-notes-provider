/* eslint-disable @typescript-eslint/no-explicit-any */
import * as momentImpl from 'moment';

export class TAbstractFile {}
export class TFile extends TAbstractFile {
  public basename!: string;
}

export const moment = momentImpl;

