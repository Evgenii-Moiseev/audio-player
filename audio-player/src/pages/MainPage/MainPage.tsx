import { useCallback, useEffect, useState, type FC } from 'react'
import { Tracks } from '../../components/Tracks/Tracks'
import { Button } from '../../ui/Button/Button'
import NextIcon from '../../assets/svg/next-page-icon.svg?react'
import PrevIcon from '../../assets/svg/prev-page-icon.svg?react'
import type { IMainPageProps } from './types'

const ITEMS_PER_PAGE = 5

export const MainPage: FC<IMainPageProps> = ({
  tracks,
  favorites,
  onSelectTrack,
  onFavoritesClick,
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(tracks.length / ITEMS_PER_PAGE)
  const [isMobile, setIsMobile] = useState(false)

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1)
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1)
  }

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleScroll = useCallback(() => {
    if (!isMobile) return
    if (
      window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100 &&
      currentPage < totalPages
    ) {
      setCurrentPage((prev) => prev + 1)
    }
  }, [isMobile, currentPage, totalPages])

  useEffect(() => {
    if (isMobile) {
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [isMobile, currentPage, totalPages, handleScroll])

  useEffect(() => {
    if (!isMobile) return
    const isScrollable =
      document.documentElement.scrollHeight > window.innerHeight

    if (!isScrollable && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1)
    }
  }, [currentPage, totalPages, isMobile])

  const paginatedTracks = !isMobile
    ? tracks.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
      )
    : tracks.slice(0, currentPage * ITEMS_PER_PAGE)

  return (
    <>
      <section className="audio-tracks">
        <div className="container">
          <div className="audio-tracks__inner">
            <h1 className="audio-tracks__title">Аудифайлы и треки</h1>
            <Tracks
              tracks={paginatedTracks}
              favorites={favorites}
              handleSelectTrack={onSelectTrack}
              handleFavoritesClick={onFavoritesClick}
            />
            {!isMobile && tracks.length > ITEMS_PER_PAGE && (
              <div className="pagination">
                <Button
                  className="btn btn--icon"
                  type="button"
                  onClick={handlePrevPage}
                  isDisabled={currentPage === 1}
                >
                  <PrevIcon width={36} height={36} />
                </Button>
                <Button
                  className="btn btn--icon"
                  type="button"
                  onClick={handleNextPage}
                  isDisabled={currentPage === totalPages}
                >
                  <NextIcon width={36} height={36} />
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
