import { FC, useContext } from 'react'
import Link from 'next/link'
import { AppBar, Toolbar, Typography, Button, Stack } from '@mui/material'
import { AuthContext } from '../context/AuthContext'

const Navbar: FC = () => {
  const auth = useContext(AuthContext)!

  return (
    <AppBar
      position="sticky"
      elevation={4}
      square
      sx={{
        bgcolor: '#7c3aed',
        color: '#fff',
        borderRadius: 0,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Typography renders as Link, no inner <a> */}
        <Typography
          component={Link}
          href="/"
          variant="h6"
          sx={{
            textDecoration: 'none',
            color: 'inherit',
            '&:hover': { opacity: 0.8 },
          }}
        >
          🚆 TrainSchedule
        </Typography>

        <Stack direction="row" spacing={2}>
          {auth.token ? (
            <Button sx={{ color: '#fff' }} onClick={auth.signOut}>
              Logout
            </Button>
          ) : (
            <>
              {/* Buttons render as Link, no passHref or inner <a> */}
              <Button component={Link} href="/login" sx={{ color: '#fff' }}>
                Login
              </Button>
              <Button
                component={Link}
                href="/login?mode=signup"
                variant="contained"
                sx={{
                  bgcolor: '#e91e63',
                  color: '#fff',
                  '&:hover': { bgcolor: '#d81b60' },
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
