import { Typography, Box } from "@mui/material"
import { Link } from "react-router-dom"

function Article({ article }) {

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Link to={"/article/" + article._id} style={{ textDecoration: "none" }}>
        <Typography variant="h3" color="secondary">{article.title}</Typography>
      </Link>
      <Box sx={{ display: "flex", gap: "5px" }}>
        <Typography variant="body1" color="#CE93D8">{article.createdBy.firstName + " " + article.createdBy.lastName}</Typography>
        <Typography variant="body1" color="#CE93D8">{new Date(article.createdAt).toLocaleDateString('en-GB')}</Typography>
      </Box>
    </Box >
  )
}

export default Article