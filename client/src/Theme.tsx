import { createTheme, Theme } from "@mui/material";

export const theme: Theme = createTheme({
  palette: {
    primary: {
      main: '#19242e',
      light: '#848daf',
    },
    background: {
      default: '#161825',
      paper: '#2e3344'
    },
    text: {
      primary: '#fff',
      secondary: '#a1acc0',
    }
  },
  typography: {
    subtitle1: {
      wordWrap: "break-word",
      '@media(max-width: 810px)': {
        fontSize: '0.9rem'
      }
    },
    subtitle2: {
      '@media(max-width: 810px)': {
        fontSize: '0.80rem'
      }
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (themeParam) =>`
        body {
          background-color: ${themeParam.palette.background.default};
          box-sizing: border-box;
        }

        * {
          scrollbar-width: thin;
          scrollbar-color: ${themeParam.palette.background.paper} transparent;
        }
      `
    }
  },
});