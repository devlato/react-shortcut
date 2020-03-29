import { normalizeShortcuts } from '../utils';

describe('utils', function () {
  describe('normalizeShortcuts', () => {
    it('normalizes a combination', () => {
      expect(normalizeShortcuts('shift+command+s')).toEqual(['shift+command+s']);
    });

    it('normalizes an array of combinations', () => {
      expect(normalizeShortcuts(['shift+command+s', 'shift+command+m'])).toEqual([
        'shift+command+s',
        'shift+command+m',
      ]);
    });

    it('normalizes a string of combinations', () => {
      expect(normalizeShortcuts(['shift+command+s,shift+command+m'])).toEqual(['shift+command+s', 'shift+command+m']);
    });

    it('normalizes a sequence', () => {
      expect(normalizeShortcuts('up down left')).toEqual(['up down left']);
    });

    it('normalizes an array of sequences', () => {
      expect(normalizeShortcuts(['up down left', 'up down right'])).toEqual(['up down left', 'up down right']);
    });

    it('normalizes a string of sequences', () => {
      expect(normalizeShortcuts(['up down left,up down right'])).toEqual(['up down left', 'up down right']);
    });

    it('normalizes a mixed array', () => {
      expect(normalizeShortcuts(['shift+command+s', 'up down right'])).toEqual(['shift+command+s', 'up down right']);
    });

    it('normalizes a mixed string', () => {
      expect(normalizeShortcuts(['shift+command+s,up down right'])).toEqual(['shift+command+s', 'up down right']);
    });
  });
});
