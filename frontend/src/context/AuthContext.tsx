import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react'
import api from '../services/api'
import { login as apiLogin, signup as apiSignup, refreshToken as apiRefresh, logout as apiLogout } from '../services/auth'
import { AuthContextValue } from 'types'

export const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    apiRefresh()
      .then((newToken) => {
        if (newToken) {
          setToken(newToken)
          api.defaults.headers.common.Authorization = `Bearer ${newToken}`
        }
      })
      .catch(() => {
      })
  }, [])

  const signUp = useCallback(async (username: string, password: string) => {
    await apiSignup(username, password)
  }, [])

  const signIn = useCallback(async (u: string, p: string) => {
    const token = await apiLogin(u, p);     
    setToken(token);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }, []);

  const signOut = useCallback(async () => {
    await apiLogout()
    setToken(null)
    delete api.defaults.headers.common.Authorization
  }, [])

  return (
    <AuthContext.Provider value={{ token, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}