import { Box, Button, TextField, Typography } from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';

import { useContext, useEffect, useRef, useState } from "react"
import { UserContext } from "../../Context/UserContext"
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../Styles/App.css'
import axios from "axios";
import { useParams } from 'react-router-dom';
import Delta from 'quill-delta'
import { useNavigate } from "react-router-dom";

function ArticleEditForm() {
  const { user } = useContext(UserContext)
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('')
  const editorRef = useRef()
  const navigate = useNavigate();
  const { id } = useParams()

  useEffect(() => {
    axios.get(`/article/${id}`)
      .then((res) => {
        setTitle(res.data.title)
        const delta = JSON.parse(res.data.content);
        const plainText = new Delta(delta).reduce((acc, op) => {
          if (op.insert) {
            return acc + op.insert;
          }
          return acc;
        }, '');

        setValue(plainText);
      })
      .catch((err) => console.log(err))
  }, [])

  const onChangeTitle = (e) => {
    setTitle(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const content = editorRef.current.getEditor().getContents();
    const contentJson = JSON.stringify(content);

    const editedArticle = {
      title,
      content: contentJson
    }

    axios.put(`/article/edit/${id}`, editedArticle, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
      .then((res) => {
        navigate("/")
      })
      .catch((err) => console.log(err))
  }

  return (
    <>
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
              Edit article
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

export default ArticleEditForm