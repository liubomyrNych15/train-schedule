import { LoginResponse } from 'types';
import api from './api'

export async function signup(username: string, password: string) {
  await api.post('/auth/signup', { username, password })
}

export async function login(username: string, password: string): Promise<string> {
  const res = await api.post<LoginResponse>('/auth/login', { username, password });
  return res.data.data.accessToken;
}

export async function refreshToken() {
  const { data } = await api.post('/auth/refresh')
  return data.data.accessToken as string
}

export async function logout() {
  await api.post('/auth/logout')
}