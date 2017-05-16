var React = require('react');
var enzyme = require('enzyme');
var chai = require('chai');
var Promise = require('bluebird');

var Component = require('../src/Component');


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

  var component = React.createElement(Component, componentProps, componentChildren);

  var wrapper = mount(component);
  var page = new Page(wrapper);

  return {
    page: page,
    wrapper: wrapper
  };
}


describe('<HotKey />', function() {
  beforeEach(function() {
    jest.spyOn(Component.prototype, 'setState');
    jest.spyOn(Component.prototype, 'componentDidMount');
    jest.spyOn(Component.prototype, 'componentWillUnmount');
  });


  afterEach(function() {
    Component.prototype.setState.mockReset();
    Component.prototype.setState.mockRestore();

    Component.prototype.componentDidMount.mockReset();
    Component.prototype.componentDidMount.mockRestore();

    Component.prototype.componentWillUnmount.mockReset();
    Component.prototype.componentWillUnmount.mockRestore();
  });


  it('Calls componentDidMount', function() {
    createComponent();

    expect(Component.prototype.componentDidMount).toHaveBeenCalledTimes(1);
  });


  it('Should handle keys sequently', function() {
    var onKeysCoincideMock = jest.fn();
    var checkKeys = ['m', 'o', 'c', 'k']
    var checkEvents = checkKeys.map(function (key) {
      return new KeyboardEvent('keydown', {'key': key});
    })

    return new Promise(function(resolve) {
      var onKeysCoincide = function() {
        onKeysCoincideMock();
        resolve();
      };
      var created = createComponent({
        keys: checkKeys,
        onKeysCoincide: onKeysCoincide
      });

      var wrapper = created.wrapper;
      var page = created.page;

      checkEvents.forEach(document.dispatchEvent.bind(document));
    }).then(function() {
      expect(onKeysCoincideMock).toHaveBeenCalled();
    });
  });


  it('Should not react to events without keys', function() {
    var created = createComponent({
      keys: ['c', 'r', 'a', 'p']
    });

    var wrapper = created.wrapper;
    var page = created.page;

    document.dispatchEvent(new KeyboardEvent('keydown'), {});
    expect(Component.prototype.setState).toHaveBeenCalledWith({
      buffer: [],
      eventsBuffer: []
    });
  });


  it('Should not react if empty keys passed', function() {
    return new Promise(function(resolve) {
      var created = createComponent({
        keys: []
      });

      var wrapper = created.wrapper;
      var page = created.page;

      document.dispatchEvent(new KeyboardEvent('keydown'), {key: 'a'});
      setTimeout(function() {
        resolve();
      }, 500);
    }).then(function() {
      expect(Component.prototype.setState).toHaveBeenCalled();
    });
  });

  it('Should pass keys and events buffers', function() {
    var onKeysCoincideMock = jest.fn();
    var checkKeys = ['m', 'o', 'c', 'k'];
    var checkEvents = checkKeys.map(function (key) {
      return new KeyboardEvent('keydown', {key: key});
    })

    return new Promise(function (resolve) {
      var onKeysCoincide = function(keys, events) {
        resolve({
          keys: keys,
          events: events
        });
      };

      var created = createComponent({
        keys: checkKeys,
        onKeysCoincide: onKeysCoincide
      });

      var wrapper = created.wrapper;
      var page = created.page;

      checkEvents.forEach(document.dispatchEvent.bind(document))

    }).then(function (data){
      expect(data.keys).toEqual(checkKeys);
      expect(data.events).toEqual(checkEvents);
    });
  });


  it('Should remove listener on unmount', function() {
    document.removeEventListener = jest.fn();

    var created = createComponent({
      keys: ['m', 'o', 'c', 'k']
    });

    var wrapper = created.wrapper;
    var page = created.page;

    wrapper.unmount();

    expect(Component.prototype.componentWillUnmount).toHaveBeenCalledTimes(1);
    expect(document.removeEventListener).toHaveBeenCalled();
  });
});
