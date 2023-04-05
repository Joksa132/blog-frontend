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
        : <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "50px" }}>
          <Typography variant='h4' color="secondary">LOADING</Typography>
        </Box>
      }
    </>
  )
}

export default ArticlePage