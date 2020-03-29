import * as mousetrap from 'mousetrap';
import * as React from 'react';
import { render, mount } from 'enzyme';
import ReactHotKey from '../index';

describe('<ReactHotKey />', function () {
  let onKeysPressed: () => void;
  let contaner: HTMLElement;

  beforeEach(() => {
    window.document.body.innerHTML = '<div></div>';
    contaner = window.document.body.childNodes[0] as HTMLElement;
    onKeysPressed = jest.fn();
  });

  it('renders', function () {
    expect(render(<ReactHotKey keys="shift+command" onKeysPressed={onKeysPressed} />)).toMatchSnapshot();
  });

  it('reacts on a key combination', function () {
    expect.assertions(2);

    expect(onKeysPressed).not.toHaveBeenCalled();
    mount(<ReactHotKey keys="shift+command+s" onKeysPressed={onKeysPressed} />, { attachTo: contaner });

    mousetrap.trigger('shift+command+s');
    expect(onKeysPressed).toHaveBeenCalledTimes(1);
  });

  it('reacts on a key sequence', function () {
    expect.assertions(2);

    expect(onKeysPressed).not.toHaveBeenCalled();
    mount(<ReactHotKey keys="a b c" onKeysPressed={onKeysPressed} />, { attachTo: contaner });

    mousetrap.trigger('a b c');
    expect(onKeysPressed).toHaveBeenCalledTimes(1);
  });

  it('reacts on a key combination or a key sequence', function () {
    expect.assertions(3);

    expect(onKeysPressed).not.toHaveBeenCalled();
    mount(<ReactHotKey keys="shift+command+s,a b c" onKeysPressed={onKeysPressed} />, { attachTo: contaner });

    mousetrap.trigger('shift+command+s');
    expect(onKeysPressed).toHaveBeenCalledTimes(1);

    mousetrap.trigger('a b c');
    expect(onKeysPressed).toHaveBeenCalledTimes(2);
  });

  it('reacts on a key combination or a key sequence, specified as an array', function () {
    expect.assertions(3);

    expect(onKeysPressed).not.toHaveBeenCalled();
    mount(<ReactHotKey keys={['shift+command+s', 'a b c']} onKeysPressed={onKeysPressed} />, { attachTo: contaner });

    mousetrap.trigger('shift+command+s');
    expect(onKeysPressed).toHaveBeenCalledTimes(1);

    mousetrap.trigger('a b c');
    expect(onKeysPressed).toHaveBeenCalledTimes(2);
  });

  it('unmounts', function () {
    expect.assertions(5);

    expect(onKeysPressed).not.toHaveBeenCalled();
    const component = mount(<ReactHotKey keys={['shift+command+s', 'a b c']} onKeysPressed={onKeysPressed} />, {
      attachTo: contaner,
    });

    mousetrap.trigger('shift+command+s');
    expect(onKeysPressed).toHaveBeenCalledTimes(1);

    mousetrap.trigger('a b c');
    expect(onKeysPressed).toHaveBeenCalledTimes(2);

    component.unmount();

    mousetrap.trigger('shift+command+s');
    expect(onKeysPressed).toHaveBeenCalledTimes(2);

    mousetrap.trigger('a b c');
    expect(onKeysPressed).toHaveBeenCalledTimes(2);
  });
});
