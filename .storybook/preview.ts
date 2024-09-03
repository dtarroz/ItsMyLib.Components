import type { Preview } from "@storybook/web-components";
import { withActions } from '@storybook/addon-actions/decorator';
import './preview.css';

const preview: Preview = { 
  tags: ['autodocs'],
  decorators: [withActions],  
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default:'dark',
      values: [
        { name: 'light', value: '#fff' },
        { name: 'dark', value: '#161616' },
      ]
    }
  },
};

export default preview;
