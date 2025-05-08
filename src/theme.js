// src/theme.ts
import { createTheme } from '@mui/material/styles';

export const LightBlueTheme = createTheme({
  palette: {
    primary: {
      main: '#1e88e5',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#90caf9',
    },
    background: {
      default: '#f8fbff',
      paper: '#ffffff',
    },
    text: {
      primary: '#2d3748',
      secondary: '#718096',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});
