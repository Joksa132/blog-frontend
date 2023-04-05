import { Typography, Box, Button } from "@mui/material"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

import { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../../Context/UserContext"

function Article({ article, handleDelete }) {
  const { user } = useContext(UserContext)

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Link to={"/article/" + article._id} style={{ textDecoration: "none" }}>
        <Typography variant="h3" color="#b90ac2">{article.title}</Typography>
      </Link>
      <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
        <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
          <Typography variant="body1" color="secondary">{article.createdBy.firstName + " " + article.createdBy.lastName}</Typography>
          <Typography color="secondary">●</Typography>
          <Typography variant="body1" color="secondary">{new Date(article.createdAt).toLocaleDateString('en-GB')}</Typography>
        </Box>

        {user?.userId === article.createdBy._id &&
          <>
            <Button variant="text" color="secondary" size="small" startIcon={<DeleteForeverIcon />} onClick={handleDelete}>Delete</Button>
            <Link to={"/edit/" + article._id} style={{ textDecoration: "none" }}>
              <Button variant="text" color="secondary" size="small" startIcon={<EditIcon />}>Edit</Button>
            </Link>
          </>
        }
      </Box>
    </Box >
  )
}

export default Article