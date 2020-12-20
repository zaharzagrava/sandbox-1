import { getStorybookUI, configure, addDecorator } from '@storybook/react-native';
import { withKnobs } from '@storybook/addon-knobs';

import { theme } from '../src/themes/themes.ts';
import { ThemeProvider } from 'styled-components';

import './rn-addons';

/* Enables knobs for all stories */
addDecorator(withKnobs);

/* Add styled-components global styles and themes */
const decorators = [
  Story => (
    <>
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    </>
  )
];

addDecorator(decorators[0]);

// import stories
configure(() => {
  require('../__stories__');
}, module);

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({
  asyncStorage: null
});

export default StorybookUIRoot;
