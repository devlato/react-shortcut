# ReactShortcut

Convenient React component that detects if the given key combination is pressed, and triggers a callback

[![View on npm](https://badge.fury.io/js/react-shortcut.svg)](https://npmjs.org/package/react-shortcut)
[![Master Build Status](https://github.com/devlato/react-shortcut/workflows/CI/badge.svg)](https://github.com/devlato/react-shortcut/actions?query=workflow%3ARelease)
[![Release CI Status](https://github.com/devlato/react-shortcut/workflows/Publish/badge.svg)](https://github.com/devlato/react-shortcut/actions?query=workflow%3APublish)
[![Maintainability](https://api.codeclimate.com/v1/badges/f426b7cb20cd324588ad/maintainability)](https://codeclimate.com/github/devlato/react-shortcut/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/f426b7cb20cd324588ad/test_coverage)](https://codeclimate.com/github/devlato/react-shortcut/test_coverage)
[![Demo](https://img.shields.io/badge/Live%20Demo-Open-yellow)](https://devlato.github.io/react-shortcut/)
[![Bundle size](https://img.shields.io/bundlephobia/minzip/react-shortcut?label=gzip%20size)](https://npmjs.org/package/react-shortcut)
[![Downloads](https://img.shields.io/npm/dm/react-shortcut)](https://npmjs.org/package/react-shortcut)
[![MIT License](https://img.shields.io/npm/l/react-shortcut)](https://npmjs.org/package/react-shortcut)
[![Issues](https://img.shields.io/github/issues/devlato/react-shortcut)](https://github.com/devlato/react-shortcut/issues)

## Installation

With npm:

```sh
$ npm install --save react-shortcut
```

Or with Yarn:

```sh
$ yarn add react-shortcut
```

## Using the component

Is very simple and straightforward! There are just a couple of props to pass in.

### Code example

```typescript jsx
import ReactShortcut from 'react-shortcut';

// ...
// Somewhere in your component tree
<ReactShortcut
  keys={/* String or array of strings containing the keys to be pressed, in any supported format */}
  onKeysPressed={/* Callback when target key combination is pressed */}
/>;
```

### Props

All the props are required.

| Name            | Description                                                                                            | Type                            |
| --------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------- |
| `keys`          | A string containing comma-separated key combinations or/and key sequences, or an array of such strings | A string or an array of strings |
| `onKeysPressed` | A callback to be triggered when the user presses any of the specified key combinations                 | A function with no arguments    |

### Key combinations and Key sequences

The component supports both **key combinations** and **key sequences**.

#### Key combinations

A **key combination** is a string of key names separated by a plus sign, that describes what keys the user has to press at the same time, to execute the callback specified using `onKeysPressed` prop.

Examples: `Command+Shift+Left`, `Ctrl+P`.

To react on the keys combination(s) press, use the following format:

```typescript jsx
import ReactShortcut from 'react-shortcut';

// Pass in the shortcut keys
<ReactShortcut
    keys="command+k"
    onKeysPressed={doSomethingOnShortcutPress}
/>

// ... or an array of shortcuts
<ReactShortcut
    keys={['command+k', 'command+m']}
    onKeysPressed={doSomethingOnShortcutPress}
/>

// ... or a string of comma-separated shortcuts
<ReactShortcut
    keys="command+k,command+m"
    onKeysPressed={doSomethingOnShortcutPress}
/>
```

#### Key sequences

A **key sequence** is a string of key names separated by a space character, that lists out the keys the user has to press one by one, to trigger the callback specified using `onKeysPressed` prop.

Examples: `Up Up Down Down Left Right Left Right B A Enter`, `k o n a m i`.

To react on the keys sequence(s) press, use the following format:

```typescript jsx
import ReactShortcut from 'react-shortcut';

// Pass in the shortcut keys
<ReactShortcut
    keys="k o n a m i"
    onKeysPressed={doSomethingOnShortcutPress}
/>

// ... or an array of shortcuts
<ReactShortcut
    keys={['k o n a m i', 'm a r i o b r o s enter']}
    onKeysPressed={doSomethingOnShortcutPress}
/>

// ... or a string of comma-separated shortcuts
<ReactShortcut
    keys="k o n a m i,m a r i o b r o s enter"
    onKeysPressed={doSomethingOnShortcutPress}
/>
```

#### Mixed use

Mixing both modes is possible –just follow the same key combination/key sequence convention:

```typescript jsx
import ReactShortcut from 'react-shortcut';

// Array of shortcuts
<ReactShortcut
    keys={['k o n a m i', 'shift+command+m']}
    onKeysPressed={doSomethingOnShortcutPress}
/>

// ... or a string of comma-separated shortcuts
<ReactShortcut
    keys="k o n a m i,shift+command+m"
    onKeysPressed={doSomethingOnShortcutPress}
/>
```

## FAQ

### Does it support TypeScript?

It does. Moreover, it's implemented in TypeScript.

### Do I have to use <ReactShortcut /> component only in the root level component?

Nope. The component adds a global keyboard event listener and doesn't prevent events from bubbling or capturing.

### What if my app needs to support multiple shortcuts?

Just use the component as many times as you need, just make sure the shortcuts aren't repeated.

### Do I have to specify the shortcuts in lower case only?

No, the case doesn't matter.

### Any open-source examples of using this library?

There's an official™️ one called [react-easter](https://www.npmjs.com/package/react-easter), for adding easter eggs triggered by the keypress.

## License

The library is shipped "as is" under MIT License.

## Contributing [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/devlato/react-shortcut/issues)

Feel free to contribute, but don't forget to write tests, mate/matess.
