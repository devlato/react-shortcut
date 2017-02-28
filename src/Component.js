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

  getInitialState: function() {
    return {
      timer: null
    };
  },

  render: function() {
    var props = this.props || {};
    var state = this.state || {};

    var children = props.children || null;
    var timer = state.timer || null;

    if (timer) {
      return children;
    }

    return React.createElement(ExtendedComponent, {
      keys: props.keys,
      simultaneous: props.simultaneous,
      onKeysCoincide: this._onKeysCoincide
    }, children);
  },

  _onKeysCoincide: function() {
    var props = this.props || {};

    var timeout = props.timeout || null;

    console.log('setting timer: ', timeout);

    if (timeout) {
      this.setState({
        timer: setTimeout((function() {
          var state = this.state || {};

          clearTimeout(state.timer);

          console.log('clearing timer: ', state.timer);

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

  getDefaultProps: function() {
    return {
      keys: [],
      simultaneous: false,
      timeout: null
    };
  }
});
