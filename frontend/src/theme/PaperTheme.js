import { DefaultTheme } from 'react-native-paper';

const PaperTheme = {
  ...DefaultTheme,
  roundness: 8,
  colors: {
    ...DefaultTheme.colors,
    primary: '#A57F6D',
    accent: '#A57F6D',
    background: '#F9F4F0',
    surface: '#FFFFFF',
    text: '#000000',
    disabled: '#BDBDBD',
    placeholder: '#7F7F7F',
    backdrop: 'rgba(0,0,0,0.5)',
  },
};

export default PaperTheme;
