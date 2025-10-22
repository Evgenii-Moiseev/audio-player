import type { Track } from '../../api/types'

export interface ITracksProps {
  tracks: Track[]
  favorites: Track[] | []
  handleSelectTrack: (track: Track) => void
  handleFavoritesClick: (trackId: number, isFav: boolean) => Promise<void>
}
