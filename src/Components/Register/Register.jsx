import { Modal, Typography, Box, TextField, Button, IconButton, CssBaseline } from "@mui/material"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import { ThemeProvider } from '@mui/material/styles';

import { useState } from "react"
import axios from "axios";

function Register({ open, onClose, theme }) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const onFirstNameChange = (e) => {
    setFirstName(e.target.value)
  }

  const onLastNameChange = (e) => {
    setLastName(e.target.value)
  }

  const onUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const newUser = {
      firstName,
      lastName,
      username,
      password
    }
    axios.post(`http://localhost:4000/user/register`, newUser)
      .then((res) => { () => onClose() })
      .catch((err) => {
        console.log(err)
        setError(err.response.data.message)
      });

  }

  return (
    <ThemeProvider theme={theme}>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "5px"
          }}
        >
          <IconButton color="secondary" onClick={onClose}>
            <CloseIcon />
          </IconButton>

          <Typography color="secondary" variant="h4" fontWeight="bold">Register</Typography>
          <Box component="form" onSubmit={onSubmit}>
            <TextField
              required
              fullWidth
              label="First Name"
              name="firstName"
              id="firstName"
              margin="dense"
              onChange={onFirstNameChange}
            />
            <TextField
              required
              fullWidth
              label="Last Name"
              name="lastName"
              id="lastName"
              margin="dense"
              onChange={onLastNameChange}
            />
            <TextField
              required
              fullWidth
              label="Username"
              name="username"
              id="username"
              margin="dense"
              onChange={onUsernameChange}
            />
            {error && (
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            )}
            <TextField
              required
              fullWidth
              label="Password"
              name="password"
              id="password"
              type="password"
              margin="dense"
              onChange={onPasswordChange}
            />
            <Box display="flex" flexDirection="column" alignItems="center">
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                startIcon={<ArrowForwardIosIcon />}
                size="medium"
                sx={{ mt: 2 }}
              >
                Submit
              </Button>
            </Box>

          </Box>
        </Box>
      </Modal>
    </ThemeProvider>

  )
}

export default Register