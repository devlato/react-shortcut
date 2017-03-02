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
      maxLength: (props.keys && props.keys.length) || 0
    };
  },

  componentDidMount: function didMount() {
    document.addEventListener('keydown', this.onKeyPress);
  },

  componentWillUnmount: function willUnmount() {
    document.removeEventListener('keydown', this.onKeyPress);
  },

  onKeyPress: function keyPress(e) {
    var props = this.props || {};
    var state = this.state || {};

    var keys = props.keys;
    var onKeysCoincide = props.onKeysCoincide;
    var simultaneous = props.simultaneous;

    var buffer = state.buffer || [];
    var maxLength = state.maxLength || 0;

    var key = (e && e.key && e.key.toLowerCase()) || null;
    var newBuffer = buffer;

    var isKeySetEmpty;
    var areKeysPressedTogether;
    var areKeysPressedSequently;

    if (key) {
      if (buffer.length >= maxLength) {
        newBuffer = buffer.slice(1).concat(key);
      } else {
        newBuffer = buffer.concat(key);
      }
    }

    isKeySetEmpty = !maxLength || (maxLength === 0);
    areKeysPressedTogether = simultaneous && isEmpty(difference(keys, newBuffer));
    areKeysPressedSequently = !simultaneous && isEqual(keys, newBuffer);

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
