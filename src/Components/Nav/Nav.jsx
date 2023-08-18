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
    <Container maxWidth="md" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "40px", flexDirection: { sm: "row", xs: "column" }, }}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Typography
          variant='h4'
          sx={{ fontWeight: "800" }}
          color={isDarkMode ? '#FFFFFF' : '#222222'}
        >
          BLOG
        </Typography>
      </Link>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: { sm: "20px", xs: "5px", }, flexDirection: { sm: "row", xs: "column" }, }}>
        {user ?
          <>
            <Typography sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px", fontWeight: "700", }}>
              Welcome,
              <span style={{ color: isDarkMode ? '#FFA7C4' : '#D23669', fontWeight: "800", }}>{user.username}</span>
            </Typography>
            <Typography>
              <Link to="/new" style={{ textDecoration: "none", color: isDarkMode ? "#FFFFFF" : "#222222", fontWeight: "700", }}>New Article</Link>
            </Typography>
            <Typography sx={{ cursor: "pointer", fontWeight: "700", }} onClick={logoutUser}>Logout</Typography>
          </>
          :
          <>
            <Typography onClick={handleLoginClick} sx={{ cursor: "pointer", fontWeight: "700", }}>Login</Typography>
            <Typography onClick={handleRegisterClick} sx={{ cursor: "pointer", fontWeight: "700", }}>Register</Typography>
          </>
        }

      </Box>
      <Button
        onClick={() => setIsDarkMode(!isDarkMode)}
        startIcon={isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
        style={{ color: isDarkMode ? "#FFFFFF" : "#222222", fontWeight: "700", }}
        size='large'
      >
        {isDarkMode ? "Dark" : "Light"}
      </Button>
    </Container >
  )
}

export default Nav