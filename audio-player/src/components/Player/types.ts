import type { Track } from '../../api/types'

export interface IPlayerProps {
  track: Track | null
  isPlaying: boolean
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
  onNext: () => void
  onPrev: () => void
  toggleFavorite: (trackId: number, isFav: boolean) => void
  isFavorite: (trackId: number) => boolean
}
