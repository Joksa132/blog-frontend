import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, Button, Container, CssBaseline, TextField, Typography } from '@mui/material';

import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../Context/UserContext"
import Nav from "../../Components/Nav/Nav"
import { useParams } from 'react-router-dom';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import Login from '../../Components/Login/Login';
import Register from '../../Components/Register/Register';

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

function ArticlePage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const theme = isDarkMode ? darkTheme : lightTheme
  const [article, setArticle] = useState({})
  const { id } = useParams()
  const [contentHtml, setContentHtml] = useState('')
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BackendURL}/article/${id}`)
      .then((res) => {
        setArticle(res.data)
        console.log(JSON.parse(res.data.content))
        const contentDelta = JSON.parse(res.data.content);
        const converter = new QuillDeltaToHtmlConverter(contentDelta.ops);
        setContentHtml(converter.convert());
      })
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
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "30px" }}>
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
            <Typography variant='h2' color="secondary">{article.title}</Typography>
          </Box>
          <Box sx={{
            marginTop: "20px", border: "2px solid #ce93d8", padding: "30px", textAlign: "left", overflowWrap: "break-word",
          }} >
            <Box sx={{ display: "flex", gap: "5px", marginBottom: "10px" }}>
              <Typography color={"#CE93D8"}>{article?.createdBy?.firstName + " " + article?.createdBy?.lastName}</Typography>
              <Typography color="#CE93D8">{" ● "}</Typography>
              <Typography color={"#CE93D8"}>{new Date(article.createdAt).toLocaleDateString('en-GB')}</Typography>
            </Box>
            <Box dangerouslySetInnerHTML={{ __html: contentHtml }}>

            </Box>
          </Box>
        </Container>
      </ThemeProvider >
    </>
  )
}

export default ArticlePage