import { Box, Container, Typography } from '@mui/material';

import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';

function ArticlePage() {
  const [article, setArticle] = useState({})
  const { id } = useParams()
  const [contentHtml, setContentHtml] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`/article/${id}`)
      .then((res) => {
        setArticle(res.data)
        console.log(JSON.parse(res.data.content))
        const contentDelta = JSON.parse(res.data.content);
        const converter = new QuillDeltaToHtmlConverter(contentDelta.ops);
        setContentHtml(converter.convert());
        setLoading(false)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <>
      {!loading ?
        <Container sx={{ display: "flex", flexDirection: "column", marginBottom: "30px" }}>
          <Box sx={{ marginTop: "40px" }}>
            <Typography variant='h2' color="primary" sx={{ fontWeight: "800" }}>{article.title}</Typography>
          </Box>
          <Box sx={{
            marginTop: "20px", textAlign: "left", overflowWrap: "break-word",
          }} >
            <Box sx={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
              <Typography color='primary' sx={{ fontWeight: "600" }}>{article?.createdBy?.firstName + " " + article?.createdBy?.lastName}</Typography>
              <Typography color='primary'>{" ● "}</Typography>
              <Typography color='primary' sx={{ fontWeight: "600" }}>{new Date(article.createdAt).toLocaleDateString('en-GB')}</Typography>
            </Box>
            <Box dangerouslySetInnerHTML={{ __html: contentHtml }}>

            </Box>
          </Box>

        </Container>
        : <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "50px" }}>
          <Typography variant='h4' color="secondary">LOADING</Typography>
        </Box>
      }
    </>
  )
}

export default ArticlePage