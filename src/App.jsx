import './Styles/App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home/Home';
import ArticleForm from './Components/ArticleForm/ArticleForm';
import ArticlePage from './Pages/ArticlePage/ArticlePage'
import ArticleEditForm from './Components/ArticleEditForm/ArticleEditForm';
import Nav from './Components/Nav/Nav';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { useState } from 'react';

import Login from './Components/Login/Login';
import Register from './Components/Register/Register';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFA7C4',
    },
    secondary: {
      main: '#E5E5E6'
    },
    background: {
      default: '#282C35'
    }
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#D23669',
    },
    secondary: {
      main: '#222222',
    },
  },
});

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const theme = isDarkMode ? darkTheme : lightTheme
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)

  const handleLoginModalClose = () => {
    setShowLoginModal(false);
  };

  const handleRegisterModalClose = () => {
    setShowRegisterModal(false);
  };

  const handleRegisterClick = () => {
    setShowRegisterModal(true);
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  return (
    <>
      <BrowserRouter>
        <Nav isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} handleLoginClick={handleLoginClick} handleRegisterClick={handleRegisterClick} />
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <Login open={showLoginModal} onClose={handleLoginModalClose} />
          <Register open={showRegisterModal} onClose={handleRegisterModalClose} />

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/new' element={<ArticleForm />} />
            <Route path='/article/:id' element={<ArticlePage />} />
            <Route path='/edit/:id' element={<ArticleEditForm />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>

  )
}

export default App