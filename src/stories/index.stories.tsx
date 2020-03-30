/* eslint-disable @typescript-eslint/camelcase */
import { text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import * as React from 'react';
import ReactHotKey, { ReactHotKeyProps } from '../index';

export default {
  title: 'react-shortcut',
  component: ReactHotKey,
};

export const ReactHotKeyStory_withKeyCombination: React.ComponentType = () => (
  <WrappedComponent keys="command+shift+s" />
);
ReactHotKeyStory_withKeyCombination.displayName = 'ReactHotKeyStory_withKeyCombination';

export const ReactHotKeyStory_withKeySequence: React.ComponentType = () => <WrappedComponent keys="k o n a m i" />;
ReactHotKeyStory_withKeySequence.displayName = 'ReactHotKeyStory_withKeySequence';

export const ReactHotKeyStory_withMixedShortcuts: React.ComponentType = () => (
  <WrappedComponent keys="command+shift+s,k o n a m i" />
);
ReactHotKeyStory_withMixedShortcuts.displayName = 'ReactHotKeyStory_withMixedShortcuts';

const WrappedComponent: React.ComponentType<Omit<ReactHotKeyProps, 'onKeysPressed'>> = ({ keys }) => {
  const keysKnobs = text('keys', Array.isArray(keys) ? keys.join(',') : keys);
  const onKeysPressedAction = action('onKeysPressed');

  const onKeysPressed = React.useCallback(() => {
    alert('onKeysPressed');
    onKeysPressedAction();
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        fontFamily: 'sans-serif',
        fontSize: '2vw',
      }}
    >
      <p>
        Press&nbsp;<span style={{ fontFamily: 'system, monospace', fontWeight: 600 }}>{keys}</span>&nbsp;to trigger the
        callback
      </p>
      <ReactHotKey keys={keysKnobs} onKeysPressed={onKeysPressed} />
    </div>
  );
};
