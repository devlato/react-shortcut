var React = require('react');
var enzyme = require('enzyme');
var chai = require('chai');
var sinon = require('sinon');
var Promise = require('bluebird');

var Component = require('../src/ExtendedComponent');


var mount = enzyme.mount;
var assert = chai.assert;


function Page(wrapper) {
  this.wrapper = function() {
    return wrapper;
  };
};


function createComponent(props, children) {
  var componentProps = props || {};
  var componentChildren = children || null;

  var wrapper = mount(
      React.createElement(Component, componentProps, componentChildren));
  var page = new Page(wrapper);

  return {
    page: page,
    wrapper: wrapper
  };
}


describe('<ExtendedComponent />', function() {
  beforeEach(function() {
    sinon.spy(Component.prototype, 'setState');
    sinon.spy(Component.prototype, 'componentDidMount');
    sinon.spy(Component.prototype, 'componentWillUnmount');
  });


  afterEach(function() {
    Component.prototype.setState.restore()
    Component.prototype.componentDidMount.restore();
    Component.prototype.componentWillUnmount.restore();
  });


  it('Calls componentDidMount', function() {
    createComponent();

    expect(Component.prototype.componentDidMount.calledOnce).toEqual(true);
  });


  it('Should handle keys sequently', function() {
    var onKeysCoincideMock = jest.fn();

    return new Promise(function(resolve) {
      var onKeysCoincide = function() {
        onKeysCoincideMock();
        resolve();
      };
      var created = createComponent({
        keys: ['m', 'o', 'c', 'k'],
        onKeysCoincide: onKeysCoincide
      });

      var wrapper = created.wrapper;
      var page = created.page;

      document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'm'}));
      document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'o'}));
      document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'c'}));
      document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'k'}));
    }).then(function() {
      expect(onKeysCoincideMock).toBeCalled();
    });
  });


  it('Should not react to events without keys', function() {
    var created = createComponent({
      keys: ['c', 'r', 'a', 'p']
    });

    var wrapper = created.wrapper;
    var page = created.page;

    document.dispatchEvent(new KeyboardEvent('keydown'), {});
    expect(Component.prototype.setState.calledWith({buffer: []})).toEqual(true);
  });


  it('Should not react if empty buffer passed', function() {
    var created = createComponent({
      keys: []
    });

    var wrapper = created.wrapper;
    var page = created.page;

    document.dispatchEvent(new KeyboardEvent('keydown'), {key: 'a'});
    expect(Component.prototype.setState.callCount).toEqual(0);
  });


  it('Should remove listener on unmount', function() {
    document.removeEventListener = jest.fn();

    var created = createComponent({
      keys: ['m', 'o', 'c', 'k']
    });

    var wrapper = created.wrapper;
    var page = created.page;

    wrapper.unmount();

    expect(Component.prototype.componentWillUnmount.calledOnce).toEqual(true);
    expect(document.removeEventListener).toBeCalled();
  });
});
