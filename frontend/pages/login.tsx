import { FC, useState, FormEvent, useContext } from 'react'
import { useRouter } from 'next/router'
import { Box, TextField, Button, Typography, Paper, Stack } from '@mui/material'
import Link from 'next/link'
import { AuthContext } from '../src/context/AuthContext'

const LoginPage: FC = () => {
  const auth = useContext(AuthContext)!
  const router = useRouter()
  const isSignup = router.query.mode === 'signup'
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handle = async (e: FormEvent) => {
    e.preventDefault()
    if (isSignup) await auth.signUp(username, password)
    await auth.signIn(username, password)
    router.push('/')
  }

  return (
    <Paper
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 8,
        p: 4,
      }}
      elevation={3}
    >
      <Typography
        variant="h5"
        gutterBottom
        align="center"
        sx={{ color: '#7c3aed' }} 
      >
        {isSignup ? 'Create Account' : 'Welcome Back'}
      </Typography>
      <Box component="form" onSubmit={handle}>
        <Stack spacing={2}>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              bgcolor: '#7c3aed',
              color: '#ffffff',
              '&:hover': { bgcolor: '#6d28d9' },
            }}
          >
            {isSignup ? 'Sign Up' : 'Log In'}
          </Button>
          <Typography variant="body2" align="center">
            {isSignup ? 'Already have an account? ' : "Don't have an account? "}
            <Link href={isSignup ? '/login' : '/login?mode=signup'} passHref>
              <Button
                component="a"
                variant="text"
                sx={{ color: '#7c3aed' }}
              >
                {isSignup ? 'Log In' : 'Sign Up'}
              </Button>
            </Link>
          </Typography>
        </Stack>
      </Box>
    </Paper>
  )
}

export default LoginPage