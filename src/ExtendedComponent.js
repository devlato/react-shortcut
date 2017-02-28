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

  getInitialState: function() {
    var props = this.props || {};

    return {
      buffer: [],
      maxLength: props.keys && props.keys.length || 0
    };
  },

  componentDidMount: function() {
    document.addEventListener('keydown', this._onKeyPress);
  },

  componentWillUnmount: function() {
    document.removeEventListener('keydown', this._onKeyPress);
  },

  _onKeyPress: function(e) {
    var props = this.props || {};
    var state = this.state || {};

    var keys = props.keys;
    var onKeysCoincide = props.onKeysCoincide;
    var simultaneous = props.simultaneous;

    var buffer = state.buffer || [];
    var maxLength = state.maxLength || 0;

    var key = e && e.key && e.key.toLowerCase() || null;
    var newBuffer = key
        ? buffer.length >= maxLength
            ? buffer.slice(1).concat(key)
            : buffer.concat(key)
        : buffer;

    var isKeySetEmpty = !maxLength || (maxLength === 0);
    var areKeysPressedTogether = simultaneous && isEmpty(difference(keys, newBuffer));
    var areKeysPressedSequently = !simultaneous && isEqual(keys, newBuffer);

    if (!isKeySetEmpty) {
      if ((areKeysPressedTogether || areKeysPressedSequently)
          && isFunction(onKeysCoincide)) {
        onKeysCoincide(newBuffer);
        this.setState({
          buffer: []
        });
      } else {
        this.setState({
          buffer: newBuffer
        });
      }
    }
  },

  render: function() {
    return null;
  },

  getDefaultProps: function() {
    return {
      keys: [],
      simultaneous: false
    };
  }
});
