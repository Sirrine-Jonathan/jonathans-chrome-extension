import { getStyleString } from '../../helpers/common'

const baseStylesObj = {
  background: '#1a1c17',
  color: '#9cbe2f',
  padding: '0 24.27051px',
  'font-family': 'ui-sans, "Helvetica Neue", Arial, sans-serif',
  'font-size': '1.5rem',
  'font-weight': 'bold',
  'line-height': '1.5',
  'text-align': 'left',
};
console.log(
  "%cJonathan's Chrome Extension Loaded%c\nView docs",
  getStyleString(baseStylesObj),
  getStyleString(baseStylesObj, { 'font-size': '1rem' })
);
