import { useEffect, useRef, useState, type FC } from 'react'
import CalendarIcon from '../../assets/svg/calendar-icon.svg?react'
import ClockIcon from '../../assets/svg/clock-icon.svg?react'
import HeartIcon from '../../assets/svg/heart-icon.svg?react'
import InfoIcon from '../../assets/svg/info-icon.svg?react'
import InfoIconMobile from '../../assets/svg/info-icon-mobile.svg?react'
import { Button } from '../../ui/Button/Button'
import type { ITracksProps } from './types'

export const Tracks: FC<ITracksProps> = ({
  tracks,
  favorites,
  handleSelectTrack,
  handleFavoritesClick,
}) => {
  const [openTrackId, setOpenTrackId] = useState<number | null>(null)

const infoRef = useRef<HTMLDivElement | null>(null)

  const isFavorite = (trackId: number) =>
    favorites.some((t) => t.id === trackId)

   useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openTrackId !== null &&
        infoRef.current &&
        !infoRef.current.contains(event.target as Node)
      ) {
        setOpenTrackId(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [openTrackId])

  const handleToggleInfo = (trackId: number) => {
    setOpenTrackId((prevId) => (prevId === trackId ? null : trackId))
  }

  return (
    <div className="tracks">
      <div className="tracks__row tracks__row--headings">
        <div className="tracks__heading">№</div>
        <div className="tracks__heading">НАЗВАНИЕ</div>
        <div className="tracks__heading  tracks__heading--album">АЛЬБОМ</div>
        <div className="tracks__heading tracks__heading--added">
          <CalendarIcon width={16} height={16} />
        </div>
        <div className="tracks__heading"></div>
        <div className="tracks__heading">
          <ClockIcon width={16} height={16} />
        </div>
        <div className="tracks__heading"></div>
      </div>

      {tracks.map((track) => (
        <div className="tracks__row" key={track.id}>
          <div className="tracks__cell tracks__cell--index">
            <span className="tracks__index">{track.id}</span>
          </div>

          <div className="tracks__cell tracks__cell--title">
            <div
              className="tracks__title-wrap"
              onClick={() => handleSelectTrack(track)}
            >
              <img
                className="tracks__img"
                src="/track.jpg"
                width={60}
                height={60}
              />
              <p className="tracks__info">
                <span className="tracks__title">{track.title}</span>
                <span className="tracks__artist">{track.artist}</span>
              </p>
            </div>
          </div>

          <div className="tracks__cell tracks__cell--album">
            <span className="tracks__album">{track.artist}</span>
          </div>

          <div className="tracks__cell tracks__cell--added">
            <span className="tracks__added">-</span>
          </div>

          <div className="tracks__cell tracks__cell--favorites">
            <Button
              className="btn btn--icon"
              onClick={() =>
                handleFavoritesClick(track.id, isFavorite(track.id))
              }
            >
              <HeartIcon
                className={`btn__favorite ${
                  isFavorite(track.id) ? 'btn__favorite--active' : ''
                }`}
                width={24}
                height={24}
              />
            </Button>
          </div>

          <div className="tracks__cell tracks__cell--duration">
            <span className="tracks__duration">{track.duration}</span>
          </div>

          <div className="tracks__cell tracks__cell--info">
            <Button className="btn btn--icon btn--icon-narrow" type="button" onClick={()=>handleToggleInfo(track.id)}>
              <InfoIcon className='btn__icon-info-desctop' width={23} height={4} />
              <InfoIconMobile className='btn__icon-info-mobile' width={17} height={4} />
            </Button>

            {openTrackId === track.id && (
              <div className="tracks__track-card" ref={infoRef}>
                <span className="tracks__title">Трек: {track.title}</span>
                <span className="tracks__artist tracks__artist--basic">
                  Исполнитель: {track.artist}
                </span>
                <span className="tracks__duration tracks__duration--basic">
                  Длительность: {track.duration}
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

// const user = localStorage.getItem('user')

// <div className="tracks">
//   {/* Заголовки */}
//   <div className="tracks__header">
//     <div className="tracks__cell--index">№</div>
//     <div className="tracks__cell--title">НАЗВАНИЕ</div>
//     <div className="tracks__cell--album">АЛЬБОМ</div>
//     <div className="tracks__cell--added">
//       <CalendarIcon width={16} height={16} />
//     </div>
//     <div className="tracks__cell--favorites"></div>
//     <div className="tracks__cell--duration">
//       <ClockIcon width={16} height={16} />
//     </div>
//     <div className="tracks__cell--info"></div>
//   </div>

//   {/* Строки */}
//   {tracks.map((track, index) => (
//     <div className="tracks__row" key={track.id}>
//       <div className="tracks__cell--index">{index + 1}</div>

//       {/* Название + изображение */}
//       <div
//         className="tracks__cell--title"
//         onClick={() => handleSelectTrack(track)}
//       >
//         <img
//           className="tracks__cell--title__img"
//           src="/track.jpg"
//           width={60}
//           height={60}
//         />
//         <div className="tracks__cell--title__info">
//           <span className="tracks__title">{track.title}</span>
//           <span className="tracks__artist">{track.artist}</span>
//         </div>
//       </div>

//       {/* Альбом */}
//       <div className="tracks__cell--album">
//         <span className="tracks__title">{track.artist}</span>
//       </div>

//       {/* Добавлено */}
//       <div className="tracks__cell--added">
//         <span className="tracks__added">-</span>
//       </div>

//       {/* Фаворит */}
//       <div className="tracks__cell--favorites">
//         <Button
//           className="btn btn--icon"
//           onClick={() =>
//             handleFavoritesClick(track.id, isFavorite(track.id))
//           }
//         >
//           <HeartIcon
//             className={`btn__favorite ${
//               isFavorite(track.id) ? 'btn__favorite--active' : ''
//             }`}
//             width={24}
//             height={24}
//           />
//         </Button>
//       </div>

//       {/* Длительность */}
//       <div className="tracks__cell--duration">
//         <span className="tracks__duration">{track.duration}</span>
//       </div>

//       {/* Инфа */}
//       <div className="tracks__cell--info">
//         <Button className="btn btn--icon" type="button">
//           <InfoIcon width={23} height={4} />
//         </Button>
//       </div>
//     </div>
//   ))}
// </div>

// <div className="tracks-grid">
//   {/* Заголовки */}
//   <div className="grid-header">
//     <div className="grid-cell index">#</div>
//     <div className="grid-cell title">НАЗВАНИЕ</div>
//     <div className="grid-cell album">АЛЬБОМ</div>
//     <div className="grid-cell added">
//       <CalendarIcon width={16} height={16} />
//     </div>
//     <div className="grid-cell favorites"></div>
//     <div className="grid-cell duration">
//       <ClockIcon width={16} height={16} />
//     </div>
//     <div className="grid-cell info"></div>
//   </div>

//   {/* Строки */}
//   {tracks.map((track, index) => (
//     <div className="grid-row" key={track.id}>
//       <div className="grid-cell index">{index + 1}</div>

//       {/* Название и картинка */}
//       <div className="grid-cell title">
//         <div
//           className="tracks__title-wrap"
//           onClick={() => handleSelectTrack(track)}
//         >
//           <img
//             className="tracks__img"
//             src="/track.jpg"
//             width={60}
//             height={60}
//           />
//           <div className="tracks__info">
//             <span className="tracks__title">{track.title}</span>
//             <span className="tracks__artist">{track.artist}</span>
//           </div>
//         </div>
//       </div>

//       {/* Альбом */}
//       <div className="grid-cell album">
//         <span className="tracks__title">{track.artist}</span>
//       </div>

//       {/* Добавлено */}
//       <div className="grid-cell added">
//         <span className="tracks__added">-</span>
//       </div>

//       {/* Избранное */}
//       <div className="grid-cell favorites">
//         <Button
//           onClick={() =>
//             handleFavoritesClick(track.id, isFavorite(track.id))
//           }
//           className="btn btn--icon"
//         >
//           <HeartIcon
//             className={`btn__favorite ${
//               isFavorite(track.id) ? 'btn__favorite--active' : ''
//             }`}
//             width={24}
//             height={24}
//           />
//         </Button>
//       </div>

//       {/* Длительность */}
//       <div className="grid-cell duration">
//         <span className="tracks__duration">{track.duration}</span>
//       </div>

//       {/* Информация */}
//       <div className="grid-cell info">
//         <Button className="btn btn--icon" type="button">
//           <InfoIcon width={23} height={4} />
//         </Button>
//       </div>
//     </div>
//   ))}
// </div>

// <table className="tracks">
//   <thead className="tracks__thead">
//     <tr>
//       <th className="tracks__th tracks__th--index">№</th>
//       <th className="tracks__th  tracks__th--title">НАЗВАНИЕ</th>
//       <th className="tracks__th  tracks__th--album">АЛЬБОМ</th>
//       <th className="tracks__th  tracks__th--added">
//         <CalendarIcon width={16} height={16} />
//       </th>
//       <th className="tracks__th  tracks__th--favorites"></th>
//       <th className="tracks__th tracks__th--duration">
//         <ClockIcon width={16} height={16} />
//       </th>
//       <th className="tracks__th  tracks__th--info"></th>
//     </tr>
//   </thead>
//   <tbody className="tracks__tbody">
//     {tracks.map((track, index) => (
//       <tr key={track.id}>
//         <td className="tracks__td tracks__td--index">
//           <span className="tracks__index">{index + 1}</span>
//         </td>
//         <td className="tracks__td  tracks__td--title">
//           <div
//             className="tracks__title-wrap"
//             onClick={() => handleSelectTrack(track)}
//           >
//             <img
//               className="tracks__img"
//               src="/track.jpg"
//               width={60}
//               height={60}
//             />
//             <p className="tracks__info">
//               <span className="tracks__title">{track.title}</span>
//               <span className="tracks__artist">{track.artist}</span>
//             </p>
//           </div>
//         </td>
//         <td className="tracks__td  tracks__td--album">
//           <span className="tracks__title">{track.artist}</span>
//         </td>
//         <td className="tracks__td  tracks__td--added">
//           <span className="tracks__added">-</span>
//         </td>
//         <td className="tracks__td tracks__td--favorites">
//           <Button
//             className="btn btn--icon"
//             onClick={() =>
//               handleFavoritesClick(track.id, isFavorite(track.id))
//             }
//           >
//             <HeartIcon
//               className={`btn__favorite ${
//                 isFavorite(track.id) ? 'btn__favorite--active' : ''
//               }`}
//               width={24}
//               height={24}
//             />
//           </Button>
//         </td>
//         <td className="tracks__td tracks__td--duration">
//           <span className="tracks__duration">{track.duration}</span>
//         </td>
//         <td className="tracks__td tracks__td--info">
//           <Button className="btn btn--icon" type="button">
//             <InfoIcon width={23} height={4} />
//           </Button>
//         </td>
//       </tr>
//     ))}
//   </tbody>
// </table>
