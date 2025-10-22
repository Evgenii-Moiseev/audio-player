export const ProfilePage = () => {
  const user = localStorage.getItem('user')

  return (
    <section className="profile">
      <div className="container">
        <div className="profile__inner">
          <h1 className="profile__title">Аккаунт</h1>
          {!user ? (
            <div className="profile__empty">
              Не удалось получить данные пользователя
            </div>
          ) : (
            <div className="profile__wrap">
              <img
                src="/profile.jpg"
                alt="Аватар"
                className="profile__img"
                width={240}
                height={240}
              />
              <div className="profile__user">
                <span className="profile__caption">Имя пользователя</span>
                <span className="profile__name">{user}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
