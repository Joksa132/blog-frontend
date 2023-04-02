import { Modal, Typography, Box, TextField, Button, IconButton } from "@mui/material"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';

import { useState } from "react"

function Login({ open, onClose }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    // to do
    onClose();
  }

  return (
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

        <Typography color="secondary" variant="h4" fontWeight="bold">Login</Typography>
        <Box component="form" onSubmit={onSubmit}>
          <TextField
            required
            fullWidth
            label="Username"
            name="username"
            id="username"
            margin="dense"
            onChange={onUsernameChange}
          />
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
  )
}

export default Login