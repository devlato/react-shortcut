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

  componentDidMount() {
    Mousetrap.bind(this.state.keys, this.onKeysPressed);
  }

  componentWillUnmount() {
    Mousetrap.unbind(this.state.keys);
  }

  render() {
    // We don't need to render anything, really
    return null;
  }

  private onKeysPressed() {
    this.props.onKeysPressed();
  }
}
