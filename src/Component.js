var React = require('react');

var ExtendedComponent = require('./ExtendedComponent');


module.exports = React.createClass({
  propTypes: {
    keys: React.PropTypes.array,
    simultaneous: React.PropTypes.bool,
    timeout: React.PropTypes.number,
    children: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.element
    ])
  },

  getInitialState: function initialState() {
    return {
      timer: null
    };
  },

  componentDidMount: function didMount() {},

  render: function renderComponent() {
    var props = this.props || {};
    var state = this.state || {};

    var children = props.children || null;
    var timer = state.timer || null;

    if (timer !== null) {
      return children;
    }

    return React.createElement(ExtendedComponent, {
      keys: props.keys,
      simultaneous: props.simultaneous,
      onKeysCoincide: this.onKeysCoincide
    }, null);
  },

  onKeysCoincide: function keysCoincide() {
    var props = this.props || {};
    var timeout = props.timeout || null;

    if (timeout) {
      this.setState({
        timer: setTimeout((function resolveTimeout() {
          var state = this.state || {};

          clearTimeout(state.timer);

          this.setState({
            timer: null
          });
        }).bind(this), timeout)
      });
    } else {
      this.setState({
        timer: Number.POSITIVE_INFINITY
      });
    }
  },

  getDefaultProps: function defaultProps() {
    return {
      keys: [],
      simultaneous: false,
      timeout: null
    };
  }
});
