import { TFile } from 'obsidian';
import { checkCreateTime } from '../../notes';

describe('Note', () => {
  it('checkCreateTime returns false usually', () => {
    const file = new TFile();
    file.name = 'file1.md';
    file.stat = {
      ctime: 1000000,
      mtime: 0,
      size: 2,
    };

    expect(checkCreateTime(file)).toEqual(false);
  });

  it('checkCreateTime returns true when the file was just created', () => {
    const file = new TFile();
    file.name = 'file2.md';
    file.stat = {
      ctime: new Date().getTime(),
      mtime: 0,
      size: 26,
    };

    expect(checkCreateTime(file)).toEqual(true);
  });
});
