import { useCallback, useEffect, useState } from 'react'
import './styles/style.scss'
import {
  addToFavorites,
  getFavorites,
  getTracks,
  removeFromFavorites,
} from './api/api'
import { Header } from './components/Header/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainPage } from './pages/MainPage/MainPage'
import { MainNav } from './components/MainNav/MainNav'
import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage'
import { ProfilePage } from './pages/ProfilePage/ProfilePage'
import { Modal } from './components/Modal/Modal'
import { AuthForm } from './components/AuthForm/AuthForm'
import { Player } from './components/Player/Player'
import type { Track } from './api/types'

function App() {
  const [tracks, setTracks] = useState<Track[]>([])
  const [favorites, setFavorites] = useState<Track[]>([])
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token')
  )
  const [user, setUser] = useState<string | null>(localStorage.getItem('user'))
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (query: string) => {
    setSearchTerm(query)
  }

  const handleModalOpen = () => setIsModalOpen(true)
  const handleModalClose = () => setIsModalOpen(false)

  const handleSelectTrack = (track: Track) => {
    if (currentTrack && currentTrack.id === track.id) {
      setIsPlaying((prev) => !prev)
    } else {
      setCurrentTrack(track)
      setIsPlaying(true)
    }
  }

  useEffect(() => {
    getTracks().then(setTracks)
  }, [])

  const handleInvalidToken = useCallback(() => {
    setToken(null)
    setUser(null)
    setFavorites([])
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }, [])

  const loadFavorites = useCallback(async () => {
    if (!token) return
    try {
      const favorites = await getFavorites(handleInvalidToken)
      setFavorites(favorites)
    } catch (e) {
      console.error(e)
    }
  }, [token, handleInvalidToken])

  useEffect(() => {
    loadFavorites()
  }, [loadFavorites, token])

  const toggleFavorite = async (trackId: number, isFav: boolean) => {
    if (!token) {
      alert('Войдите, чтобы управлять избранным')
      return
    }

    if (isFav) {
      await removeFromFavorites(trackId, handleInvalidToken)
    } else {
      await addToFavorites(trackId, handleInvalidToken)
    }
    const updatedFavorites = await getFavorites(handleInvalidToken)
    setFavorites(updatedFavorites)
  }

  const isFavorite = (trackId: number) =>
    favorites.some((t) => t.id === trackId)

  const handleNext = () => {
    if (!currentTrack) return
    const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id)
    const nextIndex = (currentIndex + 1) % tracks.length
    setCurrentTrack(tracks[nextIndex])
    setIsPlaying(true)
  }

  const handlePrev = () => {
    if (!currentTrack) return
    const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id)
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length
    setCurrentTrack(tracks[prevIndex])
    setIsPlaying(true)
  }

  return (
    <>
      <BrowserRouter>
        <Header
          user={user}
          token={token}
          onLogout={handleInvalidToken}
          onModalOpen={handleModalOpen}
          onSearch={handleSearch}
        />
        <MainNav />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <MainPage
                  tracks={
                    searchTerm.trim()
                      ? tracks.filter((track) =>
                          track.title
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                        )
                      : tracks
                  }
                  favorites={favorites}
                  onSelectTrack={handleSelectTrack}
                  onFavoritesClick={toggleFavorite}
                />
              }
            />
            <Route
              path="/favorites"
              element={
                <FavoritesPage
                  favorites={
                    searchTerm.trim()
                      ? favorites.filter((track) =>
                          track.title
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                        )
                      : favorites
                  }
                  onSelectTrack={handleSelectTrack}
                  onFavoritesClick={toggleFavorite}
                />
              }
            />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>

          {isModalOpen && (
            <Modal onClose={handleModalClose}>
              <AuthForm
                setUser={setUser}
                onModalClose={handleModalClose}
                setToken={setToken}
              />
            </Modal>
          )}
        </main>
      </BrowserRouter>

      {currentTrack && (
        <Player
          track={currentTrack}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          onNext={handleNext}
          onPrev={handlePrev}
          toggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
        />
      )}
    </>
  )
}

export default App
