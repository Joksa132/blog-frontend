import { Box, Button, Container, CssBaseline, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import '@fontsource/roboto/500.css';

import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext';

function Nav({ handleLoginClick, handleRegisterClick, theme, isDarkMode, setIsDarkMode }) {
  const { user, setUser } = useContext(UserContext)

  const logoutUser = () => {
    localStorage.removeItem("token");
    setUser(undefined);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", justifyContent: "space-around", alignItems: "center", marginTop: "50px" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography
              variant='h5'
              sx={{
                letterSpacing: 4,
              }}
              fontWeight="bold"
              color='secondary'
            >
              BLOG
            </Typography>
          </Link>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" }}>
            {user ?
              <>
                <Typography fontSize="large" color='secondary'>
                  Welcome, <span style={{ color: "#b90ac2" }}>{user.username}</span>
                </Typography>
                <Button size='large' color='secondary' href='/new'>New article</Button>
                <Button size='large' color='secondary' onClick={logoutUser}>Logout</Button>
              </>
              :
              <>
                < Button size='large' color='secondary' onClick={handleLoginClick}>LOGIN</Button>
                <Button size='large' color='secondary' onClick={handleRegisterClick}>REGISTER</Button>
              </>
            }

          </Box>
          <Button
            onClick={() => setIsDarkMode(!isDarkMode)}
            startIcon={isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
            color='secondary'
            size='large'
          >
            {isDarkMode ? "Dark" : "Light"}
          </Button>
        </Box>
      </Container>
    </ThemeProvider >

  )
}

export default Nav