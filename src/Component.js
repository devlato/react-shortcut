var React = require('react');

var isEmpty = require('lodash/isEmpty');
var difference = require('lodash/difference');
var isEqual = require('lodash/isEqual');
var isFunction = require('lodash/isFunction');

module.exports = React.createClass({
  propTypes: {
    keys: React.PropTypes.array,
    simultaneous: React.PropTypes.bool,
    onKeysCoincide: React.PropTypes.func
  },

  getInitialState: function initialState() {
    var props = this.props || {};

    return {
      buffer: [],
      eventsBuffer: [],
      maxLength: (props.keys && props.keys.length) || 0
    };
  },

  componentDidMount: function didMount() {
    document.addEventListener('keydown', this.onKeyPress);
    document.addEventListener('keyup', this.onKeyRelease);
  },

  componentWillUnmount: function willUnmount() {
    document.removeEventListener('keydown', this.onKeyPress);
    document.removeEventListener('keyup', this.onKeyRelease);
  },

  onKeyRelease: function keyRelease(e) {
    var state = this.state || {};
    var buffer = state.buffer || [];
    var eventsBuffer = state.eventsBuffer || [];

    var keyUp = (e && e.key && e.key.toLowerCase()) || null;

    if (keyUp) {
      buffer = buffer.filter(function (key) { var notEqual = (key !== keyUp); return notEqual; });
      eventsBuffer = eventsBuffer.filter(function (event) { var notEqual = (event.key !== keyUp); return notEqual; });

      this.setState({
        buffer: buffer,
        eventsBuffer: eventsBuffer
      });
    }
  },

  onKeyPress: function keyPress(e) {
    var props = this.props || {};
    var state = this.state || {};

    var keys = props.keys;
    var onKeysCoincide = props.onKeysCoincide;
    var simultaneous = props.simultaneous;

    var buffer = state.buffer || [];
    var eventsBuffer = state.eventsBuffer || [];

    var maxLength = state.maxLength || 0;

    var key = (e && e.key && e.key.toLowerCase()) || null;

    var newBuffer = [];
    var newEventsBuffer = [];

    var isKeySetEmpty;
    var areKeysPressedTogether;
    var areKeysPressedSequently;

    if (key) {
      if (buffer.length >= maxLength) {
        newBuffer = buffer.slice(1).concat(key);
        newEventsBuffer = eventsBuffer.slice(1).concat(e);
      } else {
        newBuffer = buffer.concat(key);
        newEventsBuffer = eventsBuffer.concat(e);
      }
    }

    isKeySetEmpty = !maxLength || (maxLength === 0);
    areKeysPressedTogether = simultaneous && isEmpty(difference(keys, newBuffer));
    areKeysPressedSequently = !simultaneous && isEqual(keys, newBuffer);

    if (!isKeySetEmpty) {
      if ((areKeysPressedTogether || areKeysPressedSequently)
          && isFunction(onKeysCoincide)) {
        onKeysCoincide(newBuffer, newEventsBuffer);
        this.setState({
          buffer: [],
          eventsBuffer: []
        });
      } else {
        this.setState({
          buffer: newBuffer,
          eventsBuffer: newEventsBuffer
        });
      }
    }
  },

  render: function renderComponent() {
    return null;
  },

  getDefaultProps: function defaultProps() {
    return {
      keys: [],
      simultaneous: false
    };
  }
});
