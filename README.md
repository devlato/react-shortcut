# react-shortcut

Easily add global hotkeys/shortcuts to your React app


[![Build Status](https://travis-ci.org/devlato/react-hotkeys.svg?branch=master)](https://travis-ci.org/devlato/react-hotkeys)
[![Coverage Status](https://coveralls.io/repos/github/devlato/react-hotkeys/badge.svg?branch=master)](https://coveralls.io/github/devlato/react-hotkeys?branch=master)
[![Code Climate](https://codeclimate.com/github/devlato/react-hotkeys/badges/gpa.svg)](https://codeclimate.com/github/devlato/react-hotkeys)
[![Issue Count](https://codeclimate.com/github/devlato/react-hotkeys/badges/issue_count.svg)](https://codeclimate.com/github/devlato/react-hotkeys)
[![npm version](https://badge.fury.io/js/react-shortcut.svg)](https://badge.fury.io/js/react-shortcut)


## Installation

With npm:

```sh
$ npm install --save react-shortcut
```

Or with Yarn:

```sh
$ yarn add react-shortcut
```


## Usage

The usage is very simple, there is just a couple of props to pass.

```jsx
const HotKey = require('react-shortcut');

// ...

render() {
  return (
    <HotKey
        keys={/* Array of hotkeys */}
        simultaneous={/* Add this prop if keys should be pressed all together */}
        onKeysCoincide={/* Callback when keys are pressed */}
    />
  );
}
```

For example:

```jsx
const HotKey = require('react-shortcut');

const React = require('react');
const Menu = require('menu/Menu');          // Just an example
const MenuItem = require('menu/MenuItem');  // Just an example


export default class AnyYourComponent extends React.Component {
  static propTypes = {
    showOpenFileDialog: React.PropTypes.fn.isRequired
  };


  render() {
    const openFileKeys = ['ctrl', 'o'];

    return (
      <Menu>
        <MenuItem
            label="Open File"
            onClick={this.onFileOpen}
        />
      </Menu>
      <HotKey
          keys={openFileKeys}
          simultaneous
          onKeysCoincide={this.onFileOpen}
      />
    );
  }


  onFileOpen() {
    const {showOpenFileDialog} = this.props;

    showOpenFileDialog();
  }
}
```


## Props

* `keys` – Just array of string representing each button to be pressed;
* `simultaneous` – Set this prop if user should press buttons all together;
* `onKeysCoincide` – Callback function to be called when user pressed the target buttons.


## Supported keys

All alphabetic letters and numbers could be passed as is, i.e. letter "a" is just "a".

If you use `simultaneous` mode and you have the `Shift` button in your hotkey combination,
please set the unmodified buttons.

For example, to have a `Shift+!` hotkey, you should pass `keys={["shift", "1"]}`,
because "Shift" and "1" pressed together produce "!".


## Test coverage

Library has ~100% test coverage:

```sh
$ npm run test:coverage

> react-shortcut@1.0.0 test:coverage ~/projects/react-shortcut
> NODE_ENV=test jest --coverage --no-cache --config .jestrc

 PASS  test/Component.js
  <HotKey />
    ✓ Calls componentDidMount (19ms)
    ✓ Should handle keys sequently (11ms)
    ✓ Should not react to events without keys (3ms)
    ✓ Should not react if empty keys passed (515ms)
    ✓ Should remove listener on unmount (4ms)

--------------|----------|----------|----------|----------|----------------|
File          |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
--------------|----------|----------|----------|----------|----------------|
All files     |      100 |    85.29 |      100 |      100 |                |
 Component.js |      100 |    85.29 |      100 |      100 |                |
--------------|----------|----------|----------|----------|----------------|
Test Suites: 1 passed, 1 total
Tests:       5 passed, 5 total
Snapshots:   0 total
Time:        2.032s
Ran all test suites.

```


## Code style

Library is 100% compatible with [airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base) for ES5.


## Available commands

Library has the following commands available:

* Run the tests:

  ```
  $ npm test
  ```

* Run the tests and display test coverage:

  ```
  $ npm run test:coverage
  ```

* Run the linter:

  ```
  $ npm run lint
  ```

## Build

No building required, library is implemented with ES5 React syntax for better compatibility and shipped as is.


## License

Library is shipped "as is" under MIT License.


## Contributing

Feel free to contribute but don't forget to test everything properly.


[![NPM](https://nodei.co/npm/react-shortcut.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/react-shortcut/)
