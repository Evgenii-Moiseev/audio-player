import { Link, useNavigate } from "react-router-dom";
import LogoIcon from "../../assets/svg/logo-icon.svg?react";
import SearchIcon from "../../assets/svg/search-icon.svg?react";
import MenuIcon from "../../assets/svg/menu-icon.svg?react";
import { useEffect, useRef, useState, type FC } from "react";
import { Button } from "../../ui/Button/Button";
import type { IHeaderProps } from "./types";

export const Header: FC<IHeaderProps> = ({
  user,
  token,
  onLogout,
  onModalOpen,
  onSearch,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  };
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header__inner">
            <div className="header__logo-wrap">
              <Link to={"/"}>
                <LogoIcon className="header__logo" width={184} height={30} />
              </Link>
            </div>
            <div className="header__wrap">
              <div className="search-field">
                <input
                  className="search-field__input"
                  type="search"
                  placeholder="Что будем искать?"
                  id="search"
                  value={searchQuery}
                  onChange={handleInputChange}
                />
                <SearchIcon
                  className="search-field__icon"
                  width={24}
                  height={24}
                />
              </div>
              <div className="header__user">
                {user && token ? (
                  <Button
                    className="header__btn"
                    type="button"
                    onClick={toggleMenu}
                  >
                    <img
                      className="header__user-icon"
                      src="/profile-icon.jpg"
                      alt="Аватар"
                      width={42}
                      height={42}
                    />
                    {user}

                    <MenuIcon
                      className={`header__btn-icon ${
                        isMenuOpen ? "header__btn-icon--open" : ""
                      }`}
                      width={16}
                      height={16}
                    />
                  </Button>
                ) : (
                  <Button className="header__btn" onClick={onModalOpen}>
                    <img
                      className="header__user-icon"
                      src="/profile-icon.jpg"
                      alt="Аватар"
                      width={42}
                      height={42}
                    />
                    Войти
                    <MenuIcon
                      className={`header__btn-icon ${
                        isMenuOpen ? "header__btn-icon--open" : ""
                      }`}
                      width={16}
                      height={16}
                    />
                  </Button>
                )}
                {isMenuOpen && (
                  <div className="header__menu" ref={menuRef}>
                    <Link
                      to={"/profile"}
                      className="btn"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Профиль
                    </Link>
                    <Button
                      className="btn"
                      onClick={() => {
                        onLogout();
                        setIsMenuOpen(false);
                        navigate("/");
                      }}
                    >
                      Выйти
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
