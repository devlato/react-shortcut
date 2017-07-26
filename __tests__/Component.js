const React = require('react');
const enzyme = require('enzyme');

const Component = require('../src/Component');


const mount = enzyme.mount;


function createComponent(props, children) {
  const componentProps = props || {};
  const componentChildren = children || null;

  const component = React.createElement(Component, componentProps, componentChildren);

  return mount(component);
}


describe('<HotKey />', () => {
  beforeEach(() => {
    jest.spyOn(Component.prototype, 'setState');
    jest.spyOn(Component.prototype, 'componentDidMount');
    jest.spyOn(Component.prototype, 'componentWillUnmount');
  });


  afterEach(() => {
    Component.prototype.setState.mockReset();
    Component.prototype.setState.mockRestore();

    Component.prototype.componentDidMount.mockReset();
    Component.prototype.componentDidMount.mockRestore();

    Component.prototype.componentWillUnmount.mockReset();
    Component.prototype.componentWillUnmount.mockRestore();
  });


  it('Calls componentDidMount', () => {
    createComponent();

    expect(Component.prototype.componentDidMount).toHaveBeenCalledTimes(1);
  });


  it('Should handle keys sequently', () => {
    const onKeysCoincideMock = jest.fn();
    const checkKeys = ['m', 'o', 'c', 'k'];
    const checkEvents = checkKeys.map(key => new KeyboardEvent('keydown', { key }));

    return new Promise(((resolve) => {
      const onKeysCoincide = () => {
        onKeysCoincideMock();
        resolve();
      };

      createComponent({
        keys: checkKeys,
        onKeysCoincide,
      });

      checkEvents.forEach(event => document.dispatchEvent(event));
    })).then(() => {
      expect(onKeysCoincideMock).toHaveBeenCalled();
    });
  });


  it('Should not react to events without keys', () => {
    createComponent({
      keys: ['c', 'r', 'a', 'p'],
    });

    document.dispatchEvent(new KeyboardEvent('keydown'), {});
    expect(Component.prototype.setState).toHaveBeenCalledWith({
      buffer: [],
      eventsBuffer: [],
    });
  });


  it('Should not react if empty keys passed', () => new Promise(((resolve) => {
    createComponent({
      keys: [],
    });

    document.dispatchEvent(new KeyboardEvent('keydown'), { key: 'a' });
    setTimeout(() => {
      resolve();
    }, 500);
  })).then(() => {
    expect(Component.prototype.setState).toHaveBeenCalled();
  }));

  it('Should pass keys and events buffers', () => {
    const checkKeys = ['m', 'o', 'c', 'k'];
    const checkEvents = checkKeys.map(key => new KeyboardEvent('keydown', { key }));

    return new Promise(((resolve) => {
      const onKeysCoincide = (keys, events) => {
        resolve({
          keys,
          events,
        });
      };

      createComponent({
        keys: checkKeys,
        onKeysCoincide,
      });

      checkEvents.forEach(document.dispatchEvent.bind(document));
    })).then((data) => {
      expect(data.keys).toEqual(checkKeys);
      expect(data.events).toEqual(checkEvents);
    });
  });


  it('Should remove listener on unmount', () => {
    document.removeEventListener = jest.fn();

    const wrapper = createComponent({
      keys: ['m', 'o', 'c', 'k'],
    });

    wrapper.unmount();

    expect(Component.prototype.componentWillUnmount).toHaveBeenCalledTimes(1);
    expect(document.removeEventListener).toHaveBeenCalled();
  });
});
