import { Box, Button, Container, Typography } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import '@fontsource/roboto/500.css';

import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext';

function Nav({ handleLoginClick, handleRegisterClick, isDarkMode, setIsDarkMode }) {
  const { user, setUser } = useContext(UserContext)

  const logoutUser = () => {
    localStorage.removeItem("token");
    setUser(undefined);
  }

  return (
    <Container sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", justifyContent: "space-around", alignItems: "center", marginTop: "50px", flexDirection: { xs: "column", md: "row" }, }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Typography
            variant='h5'
            sx={{
              letterSpacing: 4,
            }}
            fontWeight="bold"
            color='#CE93D8'
          >
            BLOG
          </Typography>
        </Link>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" }}>
          {user ?
            <>
              <Typography fontSize="large" color='#CE93D8'>
                Welcome, <span style={{ color: "#b90ac2" }}>{user.username}</span>
              </Typography>
              <Link to="/new" style={{ textDecoration: "none" }}>
                <Button size='large' style={{ color: "#CE93D8" }}>New article</Button>
              </Link>
              <Button size='large' style={{ color: "#CE93D8" }} onClick={logoutUser}>Logout</Button>
            </>
            :
            <>
              < Button size='large' style={{ color: "#CE93D8" }} onClick={handleLoginClick}>LOGIN</Button>
              <Button size='large' style={{ color: "#CE93D8" }} onClick={handleRegisterClick}>REGISTER</Button>
            </>
          }

        </Box>
        <Button
          onClick={() => setIsDarkMode(!isDarkMode)}
          startIcon={isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
          style={{ color: "#CE93D8" }}
          size='large'
        >
          {isDarkMode ? "Dark" : "Light"}
        </Button>
      </Box>
    </Container>

  )
}

export default Nav