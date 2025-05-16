import { FC, ReactNode } from 'react'
import { Container } from '@mui/material'
import Navbar from './Navbar'

const Layout: FC<{ children: ReactNode }> = ({ children }) => (
  <>
    <Navbar />
    <Container maxWidth="lg">
      {children}
    </Container>
  </>
)

export default Layout