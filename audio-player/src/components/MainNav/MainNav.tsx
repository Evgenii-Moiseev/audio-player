import { NavLink } from 'react-router-dom'
import NotesIcon from '../../assets/svg/notes-icon.svg?react'
import PlayIcon from '../../assets/svg/menu-play-icon.svg?react'

export const MainNav = () => {
  return (
    <div className="container">
      <nav className="main-nav">
        <NavLink className="main-nav__link" to={'/favorites'}>
          <NotesIcon
            className="main-nav__icon main-nav__icon--desctop"
            width={32}
            height={32}
          />
          <PlayIcon
            className="main-nav__icon main-nav__icon--mobile"
            width={24}
            height={24}
          />
          <span className="main-nav__text">Избранное</span>
        </NavLink>
        <NavLink className="main-nav__link" to={'/'}>
          <NotesIcon
            className="main-nav__icon main-nav__icon--desctop"
            width={32}
            height={32}
          />
          <PlayIcon
            className="main-nav__icon main-nav__icon--mobile"
            width={24}
            height={24}
          />
          <span className="main-nav__text">Аудиокомпозиции</span>
        </NavLink>
      </nav>
    </div>
  )
}
