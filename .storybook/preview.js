import { addDecorator, addParameters, configure } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

addDecorator(withKnobs);

const isProduction = process.env.NODE_ENV === 'production';

addParameters({
  options: {
    isFullscreen: isProduction,
    enableShortcuts: false,
    isToolshown: !isProduction,
    name: '<ReactHotKey />',
    theme: {
      brandName: '<ReactHotKey />',
    },
    panelPosition: 'right',
    hierarchyRootSeparator: null,
    hierarchySeparator: /\./,
    storySort: (a, b) => (a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true })),
  },
  knobs: {
    // We're disabling escaping HTML for all cases where we use ASCII characters (e.g. apostrophes)
    // on text values in stories.
    escapeHTML: false,
  },
});

// Automatically import all files ending in *.stories.tsx
const context = require.context('../src', true, /\.stories\.tsx?$/);
configure(context, module);
