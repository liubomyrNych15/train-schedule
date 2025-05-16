import type { AppProps } from 'next/app'
import { CssBaseline, GlobalStyles } from '@mui/material'
import { AuthProvider } from '../src/context/AuthContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <CssBaseline />  

      <GlobalStyles
        styles={{
          html: { margin: 0, padding: 0, width: '100%' },
          body: { margin: 0, padding: 0, width: '100%' },
        }}
      />
        <Component {...pageProps} />
    </AuthProvider>
  )
}
