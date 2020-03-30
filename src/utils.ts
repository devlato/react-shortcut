/**
 * This function converts input keys into an array of strings, one string per key combination/key sequence
 *
 * @param keys String, comma-separated string, or an array of string specifying key combinations/sequences
 */
export const normalizeShortcuts = (keys: string | string[]): Shortcuts =>
  Array.isArray(keys)
    ? keys.map(normalizeShortcuts).reduce<Shortcut[]>((acc, v) => acc.concat(v), [])
    : keys
        .split(',')
        .map((str) => str.trim().toLowerCase() as Shortcut)
        .filter((str) => str !== '');

export type Shortcuts = Shortcut[];

type KeyCombination = string & { keyCombination: never };
type KeySequence = string & { keySequence: never };
type Shortcut = KeyCombination | KeySequence;
