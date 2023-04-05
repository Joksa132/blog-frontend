import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import CloseIcon from '@mui/icons-material/Close';

import { useContext, useRef, useState } from "react"
import { UserContext } from "../../Context/UserContext"
import ReactQuill, { Quill } from 'react-quill';
import '../../Styles/App.css'
import '../../Styles/ArticleForm.css'
import axios from "axios";

function ArticleForm() {
  const { user } = useContext(UserContext)
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('')
  const editorRef = useRef()
  const [successMessage, setSuccessMessage] = useState(null)

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

    axios.post(`/article/new`, newArticle, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
      .then((res) => {
        setValue('')
        setTitle('')
        setSuccessMessage("Successfully posted this article!")
      })
      .catch((err) => console.log(err))
  }

  const handleClose = () => {
    setSuccessMessage(null)
  }

  return (
    <>
      <Box sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
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
            sx={{ width: { md: "400px", sm: "300px" } }}
            value={title}
            fullWidth
            color="secondary"
          />
          <ReactQuill theme="snow" value={value} onChange={setValue} style={{ width: "100%" }} ref={editorRef} />
          {user ?
            <Button
              type='submit'
              startIcon={<PostAddIcon />}
              variant='contained'
              size="large"
              sx={{ marginTop: "60px" }}
              color="secondary"
            >
              Submit article
            </Button>
            :
            <Button
              type='submit'
              startIcon={<PostAddIcon />}
              variant='contained'
              size="large"
              sx={{ marginTop: "60px" }}
              color="secondary"
              disabled
            >
              Submit article
            </Button>
          }
          {successMessage &&
            <Box sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 2,
              width: 300,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "5px",
              borderRadius: "15px",
              marginTop: "20px",
              flexDirection: "column"
            }}>
              <IconButton color="secondary" onClick={handleClose}>
                <CloseIcon />
              </IconButton>
              <Typography color="secondary" >{successMessage}</Typography>
            </Box>
          }
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

    </>
  )
}

export default ArticleForm