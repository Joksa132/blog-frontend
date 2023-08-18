import { Typography, Box, Button } from "@mui/material"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

import { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../../Context/UserContext"

function Article({ article, handleDelete }) {
  const { user } = useContext(UserContext)

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "7px" }}>
      <Link to={"/article/" + article._id} style={{ textDecoration: "none" }}>
        <Typography
          variant="h2"
          sx={{ fontSize: "28px", fontWeight: "900" }}
          color='primary'
        >
          {article.title}
        </Typography>
      </Link>
      <Box sx={{ display: "flex", gap: "20px", alignItems: "center", }}>
        <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Typography
            color="secondary"
            sx={{ fontSize: "14px", fontFamily: "Merriweather, sans-serif" }}
          >
            {article.createdBy.firstName + " " + article.createdBy.lastName}
          </Typography>
          <Typography
            color="secondary"
            fontSize="small"
          >
            ●
          </Typography>
          <Typography
            color="secondary"
            sx={{ fontSize: "14px", fontFamily: "Merriweather, sans-serif" }}
          >
            {formatDate(article.createdAt)}
          </Typography>
        </Box>

        {user?.userId === article.createdBy._id &&
          <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <Button
              color="secondary"
              size="small"
              sx={{ padding: 0, fontFamily: "Merriweather, sans-serif", textTransform: "none", fontSize: "13px" }}
              startIcon={<DeleteForeverIcon />}
              onClick={handleDelete}
            >
              Delete
            </Button>
            <Link to={"/edit/" + article._id} style={{ textDecoration: "none" }}>
              <Button
                color="secondary"
                size="small"
                sx={{ padding: 0, fontFamily: "Merriweather, sans-serif", textTransform: "none", fontSize: "13px" }}
                startIcon={<EditIcon />}
              >
                Edit
              </Button>
            </Link>
          </Box>
        }
      </Box>
    </Box >
  )
}

export default Article