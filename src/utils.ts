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
