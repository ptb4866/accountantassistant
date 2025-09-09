import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:4000'
export const api = axios.create({ baseURL, headers: { 'Content-Type': 'application/json' }})

export type AIResponse = { content: string }

export async function post<TReq>(path: string, body: TReq) {
  const { data } = await api.post<AIResponse>(path, body)
  return data
}