import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, Button, CssBaseline, TextField, Typography } from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';

import { useContext, useRef, useState } from "react"
import { UserContext } from "../../Context/UserContext"
import Nav from "../Nav/Nav"
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../Styles/App.css'
import axios from "axios";

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

function ArticleForm() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const theme = isDarkMode ? darkTheme : lightTheme
  const { user } = useContext(UserContext)
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('')
  const editorRef = useRef()

  const onChangeTitle = (e) => {
    setTitle(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const content = editorRef.current.getEditor().getContents();
    const contentJson = JSON.stringify(content);

    const newArticle = {
      title,
      content: contentJson
    }

    axios.post(`http://localhost:4000/article/new`, newArticle, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
      .then((res) => {
        setValue('')
        setTitle('')
      })
      .catch((err) => console.log(err))
  }

  return (
    <>
      <Nav theme={theme} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "30px",
          width: "100%",
          height: "100%",
          padding: "20px",
          gap: "20px"
        }}>
          <Box sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            alignItems: "center",
          }}
            component="form"
            onSubmit={onSubmit}
          >
            <TextField
              placeholder="Title of the article"
              required
              id="title"
              label="Title"
              name="title"
              autoFocus
              onChange={onChangeTitle}
              sx={{ width: "400px" }}
              value={title}
              fullWidth
              color="secondary"
            />
            <ReactQuill theme="snow" value={value} onChange={setValue} style={{ width: "100%" }} ref={editorRef} />
            <Button
              type='submit'
              startIcon={<PostAddIcon />}
              variant='contained'
              size="large"
              sx={{ marginTop: "60px" }}
            >
              Submit article
            </Button>
          </Box>
          <Box sx={{ width: "50%" }}>
            <Box display={"flex"} justifyContent={"center"} mb={3}>
              <Typography variant='h4' color="secondary">Preview</Typography>
            </Box>
            <Box sx={{
              border: "2px solid #ce93d8",
              paddingLeft: "30px",
              textAlign: "left",
              overflowWrap: "break-word",
              minHeight: "130px",
            }}
            >
              <Box sx={{ display: "flex", justifyContent: "center", }}>
                <Typography variant='h3'>{title}</Typography>
              </Box>
              <Box
                dangerouslySetInnerHTML={{ __html: value }}
              ></Box>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>

    </>
  )
}

export default ArticleForm