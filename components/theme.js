import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,    // Extra small devices
      sm: 800,  // Small devices (set to 800px)
      md: 1200, // Medium devices
      lg: 1536, // Large devices
      xl: 1920, // Extra large devices
    },
  },
});

export default theme;
