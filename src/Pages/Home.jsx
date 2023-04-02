import { Box, Button, Container, CssBaseline, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import '@fontsource/roboto/500.css';

import { useState } from 'react';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const theme = isDarkMode ? darkTheme : lightTheme

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="md">
          <Box sx={{ display: "flex", justifyContent: "space-around", alignItems: "center", marginTop: "50px" }}>
            <Typography
              variant='h5'
              sx={{
                letterSpacing: 4,
              }}
              fontWeight="bold"
              color='secondary'
            >
              BLOG
            </Typography>
            <Box>
              <Button size='large' color='secondary'>LOGIN</Button>
              <Button size='large' color='secondary'>REGISTER</Button>
            </Box>
            <Button
              onClick={() => setIsDarkMode(!isDarkMode)}
              startIcon={isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
              color='secondary'
              size='large'
            >
              {isDarkMode ? "Dark" : "Light"}
            </Button>
          </Box>
        </Container>
      </ThemeProvider>
    </>

  )
}

export default Home