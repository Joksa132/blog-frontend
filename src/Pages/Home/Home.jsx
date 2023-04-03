import { Box, Button, Container, CssBaseline, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '@fontsource/roboto/500.css';

import { useState, useEffect } from 'react';
import Login from '../../Components/Login/Login';
import Register from '../../Components/Register/Register';
import Nav from '../../Components/Nav/Nav';
import axios from "axios"
import Article from '../../Components/Article/Article';

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
  const [articles, setArticles] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:4000/article/all`)
      .then((res) => setArticles(res.data))
      .catch((err) => console.log(err))
  }, [])

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

      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "100px" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "30px" }}>
          {articles.map((article) => {
            return (
              <Article key={article._id} article={article} />
            )
          })}
        </Box>

      </Box>

    </>

  )
}

export default Home