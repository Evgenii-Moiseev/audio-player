import type { Track } from '../../api/types'

export interface IFavoritesPageProps {
  favorites: Track[] | []
  onSelectTrack: (track: Track) => void
  onFavoritesClick: (trackId: number, isFav: boolean) => Promise<void>
}
