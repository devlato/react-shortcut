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

export const ReactHotKeyStory_withInputField: React.ComponentType = () => (
  <WrappedComponent keys="command+shift+s,k o n a m i">
    <input
      type="text"
      placeholder="Type something in"
      style={{
        marginTop: 'max(3vw, 3vh)',
        boxSizing: 'border-box',
        width: '100%',
        border: '1px solid #666',
        borderRadius: 'max(0.5vw, 0.5vh)',
        padding: 'max(1vw, 1vh)',
        fontSize: '1.8vw',
      }}
    />
  </WrappedComponent>
);
ReactHotKeyStory_withMixedShortcuts.displayName = 'ReactHotKeyStory_withMixedShortcuts';

const WrappedComponent: React.ComponentType<Omit<ReactHotKeyProps, 'onKeysPressed'>> = ({ children, keys }) => {
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
        fontSize: 'max(2vw, 2vh)',
        boxSizing: 'border-box',
        color: '#666',
        padding: 'max(4vw, 4vh)',
        margin: 0,
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          width: 'auto',
          height: 'auto',
          flexDirection: 'column',
          boxSizing: 'border-box',
          padding: 0,
          margin: 0,
        }}
      >
        <p style={{ userSelect: 'none', cursor: 'default', pointerEvents: 'none', padding: 0, margin: 0 }}>
          {Array.isArray(keys) ? (
            <>
              Type or press&nbsp;
              {keys.map((k, i) => (
                <React.Fragment key={k}>
                  <span
                    style={{
                      fontFamily: 'system, monospace',
                      fontWeight: 600,
                      color: '#222',
                      fontSize: 'max(1.8vw, 1.8vh)',
                    }}
                  >
                    {k.includes(' ') ? k.replace(/\s+?/gim, '') : k}
                  </span>
                  {i < keys.length - 1 ? ' or ' : null}
                </React.Fragment>
              ))}
              &nbsp;to trigger the callback
            </>
          ) : keys.includes(',') ? (
            <>
              Type or press&nbsp;
              {keys.split(',').map((k, i) => (
                <React.Fragment key={k}>
                  <span
                    style={{
                      fontFamily: 'system, monospace',
                      fontWeight: 600,
                      color: '#222',
                      fontSize: 'max(1.8vw, 1.8vh)',
                    }}
                  >
                    {k.includes(' ') ? k.replace(/\s+?/gim, '') : k}
                  </span>
                  {i < keys.split(',').length - 1 ? ' or ' : null}
                </React.Fragment>
              ))}
              &nbsp;to trigger the callback
            </>
          ) : keys.includes('+') ? (
            <>
              Press&nbsp;
              <span
                style={{
                  fontFamily: 'system, monospace',
                  fontWeight: 600,
                  color: '#222',
                  fontSize: 'max(1.8vw, 1.8vh)',
                }}
              >
                {keys.includes(' ') ? keys.replace(/\s+?/gim, '') : keys}
              </span>
              &nbsp;to trigger the callback
            </>
          ) : (
            <>
              Type&nbsp;
              <span
                style={{
                  fontFamily: 'system, monospace',
                  fontWeight: 600,
                  color: '#222',
                  fontSize: 'max(1.8vw, 1.8vh)',
                }}
              >
                {keys.includes(' ') ? keys.replace(/\s+?/gim, '') : keys}
              </span>
              &nbsp;to trigger the callback
            </>
          )}
        </p>
        {children}
      </div>
      <ReactHotKey keys={keysKnobs} onKeysPressed={onKeysPressed} />
    </div>
  );
};
