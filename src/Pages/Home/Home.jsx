import { Box, Button, Container, CssBaseline, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '@fontsource/roboto/500.css';

import { useState } from 'react';
import Login from '../../Components/Login/Login';
import Register from '../../Components/Register/Register';
import Nav from '../../Components/Nav/Nav';

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
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const theme = isDarkMode ? darkTheme : lightTheme

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleLoginModalClose = () => {
    setShowLoginModal(false);
  };

  const handleRegisterClick = () => {
    setShowRegisterModal(true);
  };

  const handleRegisterModalClose = () => {
    setShowRegisterModal(false);
  };

  return (
    <>
      <Nav handleLoginClick={handleLoginClick} handleRegisterClick={handleRegisterClick} theme={theme} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <Login open={showLoginModal} onClose={handleLoginModalClose} theme={theme} />
      <Register open={showRegisterModal} onClose={handleRegisterModalClose} theme={theme} />
    </>

  )
}

export default Home