# react-easter

Easilly add Easter eggs to your React app


[![Build Status](https://travis-ci.org/devlato/react-easter.svg?branch=master)](https://travis-ci.org/devlato/react-easter)
[![Coverage Status](https://coveralls.io/repos/github/devlato/react-easter/badge.svg?branch=master)](https://coveralls.io/github/devlato/react-easter?branch=master)
[![Code Climate](https://codeclimate.com/github/devlato/react-easter/badges/gpa.svg)](https://codeclimate.com/github/devlato/react-easter)
[![Issue Count](https://codeclimate.com/github/devlato/react-easter/badges/issue_count.svg)](https://codeclimate.com/github/devlato/react-easter)
[![npm version](https://badge.fury.io/js/react-easter.svg)](https://badge.fury.io/js/react-easter)


## Installation

```sh
$ npm install react-easter
```


## Usage

The usage is very simple, there is just a couple of props to pass.

```jsx
const EasterEgg = require('react-easter');

// ...

render() {
  return (
    <EasterEgg keys={/* Array of keys to type to trigger the easter egg */}
               simultaneous={/* Add this prop if keys should be pressed all together */}
               timeout={/* Duration to show your easter egg, is not passed the easter egg is displayed forever */}>
      {/* Your easter egg JSX goes here */}
    </EasterEgg>
  );
}
```

For example:

```jsx
const EasterEgg = require('react-easter');


export default class YourComponent extends React.Component {
  render() {
    const konamiCode = [
      'arrowup',
      'arrowup',
      'arrowdown',
      'arrowdown',
      'arrowleft',
      'arrowright',
      'arrowleft',
      'arrowright',
      'b',
      'a',
      'enter'
    ];

    return (
      <EasterEgg keys={konamiCode}
                 timeout={5000}>
        <div class="overlay">
          <iframe class="sexy-nude-geek-girls-playing-mario"
                  src="https://www.youtube.com/embed/DLzxrzFCyOs"
                  frameborder="0"
                  allowfullscreen />
        </div>
      </EasterEgg>
    );
  }
}
```


## Test coverage

Library has 100% test coverage:

```sh
Hey
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


[![NPM](https://nodei.co/npm/react-easter.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/react-easter/)
