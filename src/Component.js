const React = require('react');
const PropTypes = require('prop-types');

const isEmpty = require('lodash/isEmpty');
const difference = require('lodash/difference');
const isEqual = require('lodash/isEqual');
const isFunction = require('lodash/isFunction');

class HotKey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buffer: [],
      eventsBuffer: [],
      maxLength: (props.keys && props.keys.length) || 0,
    };

    this.onKeyPress = this.onKeyPress.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyPress);
  }

  onKeyPress(e) {
    const props = this.props;
    const state = this.state;

    const keys = props.keys;
    const onKeysCoincide = props.onKeysCoincide;
    const simultaneous = props.simultaneous;

    const buffer = state.buffer || [];
    const eventsBuffer = state.eventsBuffer || [];

    const maxLength = state.maxLength || 0;

    const key = (e && e.key && e.key.toLowerCase()) || null;

    let newBuffer = [];
    let newEventsBuffer = [];

    const isKeySetEmpty = !maxLength || (maxLength === 0);

    if (key) {
      if (buffer.length >= maxLength) {
        newBuffer = buffer.slice(1).concat(key);
        newEventsBuffer = eventsBuffer.slice(1).concat(e);
      } else {
        newBuffer = buffer.concat(key);
        newEventsBuffer = eventsBuffer.concat(e);
      }
    }

    const areKeysPressedTogether = simultaneous && isEmpty(difference(keys, newBuffer));
    const areKeysPressedSequently = !simultaneous && isEqual(keys, newBuffer);

    if (!isKeySetEmpty) {
      if ((areKeysPressedTogether || areKeysPressedSequently) && isFunction(onKeysCoincide)) {
        onKeysCoincide(newBuffer, newEventsBuffer);
        this.setState({
          buffer: [],
          eventsBuffer: [],
        });
      } else {
        this.setState({
          buffer: newBuffer,
          eventsBuffer: newEventsBuffer,
        });
      }
    }
  }

  render() {
    return null;
  }
}

HotKey.propTypes = {
  keys: PropTypes.arrayOf(PropTypes.string),
  simultaneous: PropTypes.bool,
  onKeysCoincide: PropTypes.func,
};

HotKey.defaultProps = {
  keys: [],
  simultaneous: false,
  onKeysCoincide: () => {},
};

module.exports = HotKey;
