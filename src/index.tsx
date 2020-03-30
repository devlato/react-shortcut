import 'mousetrap';
import * as React from 'react';
import { normalizeShortcuts, Shortcuts } from './utils';

export type ReactHotKeyProps = {
  keys: string | string[];
  onKeysPressed: () => void;
};

type ReactHotKeyState = {
  keys: Shortcuts;
};

export default class ReactHotKey extends React.Component<ReactHotKeyProps, ReactHotKeyState> {
  /**
   * Syncs state with props
   * @param props
   */
  static getDerivedStateFromProps(props: ReactHotKeyProps) {
    return {
      keys: normalizeShortcuts(props.keys),
    };
  }

  constructor(props: ReactHotKeyProps) {
    super(props);

    this.onKeysPressed = this.onKeysPressed.bind(this);

    this.state = {
      keys: normalizeShortcuts(props.keys),
    };
  }

  /**
   * Registers mousetrap bindings
   */
  componentDidMount() {
    Mousetrap.bind(this.state.keys, this.onKeysPressed);
  }

  /**
   * De-registers mousetrap bindings
   */
  componentWillUnmount() {
    Mousetrap.unbind(this.state.keys);
  }

  /**
   * We don't render anything visible
   */
  render() {
    // We don't need to render anything, really
    return null;
  }

  /**
   * We don't want to re-register a callback every time so we register
   * a class method that calls the callback instead
   */
  private onKeysPressed() {
    this.props.onKeysPressed();
  }
}
