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
    <Container sx={{ display: "flex", alignItems: "center", justifyContent: "space-around", paddingTop: "40px" }}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Typography
          variant='h4'
          sx={{
            letterSpacing: 2,
          }}
          fontWeight="bold"
          color={isDarkMode ? '#FFFFFF' : '#222222'}
        >
          BLOG
        </Typography>
      </Link>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "30px" }}>
        {user ?
          <>
            <Typography fontSize="large" sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" }}>
              Welcome,
              <Typography fontSize="large" color={isDarkMode ? '#FFA7C4' : '#D23669'}>{user.username}</Typography>
            </Typography>
            <Typography fontSize='large'>
              <Link to="/new" style={{ textDecoration: "none", color: isDarkMode ? "#FFFFFF" : "#222222" }}>New Article</Link>
            </Typography>
            <Typography fontSize='large' sx={{ cursor: "pointer" }} onClick={logoutUser}>Logout</Typography>
          </>
          :
          <>
            <Typography fontSize='large' onClick={handleLoginClick} sx={{ cursor: "pointer" }}>Login</Typography>
            <Typography fontSize='large' onClick={handleRegisterClick} sx={{ cursor: "pointer" }}>Register</Typography>
          </>
        }

      </Box>
      <Button
        onClick={() => setIsDarkMode(!isDarkMode)}
        startIcon={isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
        style={{ color: isDarkMode ? "#FFFFFF" : "#222222" }}
        size='large'
      >
        {isDarkMode ? "Dark" : "Light"}
      </Button>
    </Container >
  )
}

export default Nav