import type { Track, User } from "./types"

const BASE_URL = 'http://localhost:8000/api'

export async function fetchWithAuth(
  url: string,
  options: RequestInit = {},
  onInvalidToken?: () => void
) {
  const token = localStorage.getItem('token')

  const headers = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }

  const response = await fetch(`${BASE_URL}${url}`, { ...options, headers })

  if (response.status === 400) {
    const data = await response.json()
    if (
      data.message &&
      data.message.toLowerCase().includes('токен некорректный')
    ) {
      if (onInvalidToken) onInvalidToken()
      throw new Error('Токен не корректный')
    }
  }

  if (!response.ok) {
    throw new Error('Ошибка при запросе к серверу')
  }

  return response.json()
}

export async function registerUser(user: User) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
  return response.json()
}

export async function login(user: User) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
  return response.json()
}

export async function getTracks(): Promise<Track[]> {
  const response = await fetch(`${BASE_URL}/tracks`)
  return response.json()
}

export async function getFavorites(onInvalidToken: () => void) {
  return await fetchWithAuth('/favorites', {}, onInvalidToken)
}

export async function addToFavorites(
  trackId: number,
  onInvalidToken: () => void
) {
  return await fetchWithAuth(
    '/favorites',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ trackId }),
    },
    onInvalidToken
  )
}

export async function removeFromFavorites(
  trackId: number,
  onInvalidToken: () => void
) {
  return await fetchWithAuth(
    '/favorites',
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ trackId }),
    },
    onInvalidToken
  )
}
