import React from 'react';

import { addDecorator } from '@storybook/react';
import { GlobalStyle } from '../src/themes/global.ts';
import { theme } from '../src/themes/themes.ts';
import { ThemeProvider } from 'styled-components';

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
