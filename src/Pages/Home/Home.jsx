import { Box, Container } from '@mui/material';
import '@fontsource/roboto/500.css';

import { useState, useEffect } from 'react';
import axios from "axios"
import Article from '../../Components/Article/Article';

function Home() {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    axios.get(`/article/all`)
      .then((res) => setArticles(res.data))
      .catch((err) => console.log(err))
  }, [])

  const handleDelete = (id) => {
    const confirmation = window.confirm("Are you sure you want to delete this post?")
    confirmation &&
      axios.delete(`/article/delete/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
        .then((res) => {
          setArticles(articles.filter((article) => article._id !== res.data._id))
        })
        .catch((err) => console.log(err))
  }

  return (
    <>
      <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", marginTop: "50px", gap: "30px" }}>
        {articles.map((article) => {
          return (
            <Article key={article._id} article={article} handleDelete={() => handleDelete(article._id)} />
          )
        })}
      </Container>

    </>

  )
}

export default Home