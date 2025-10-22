import { useState, type FC } from 'react'
import { Button } from '../../ui/Button/Button'
import UserIcon from '../../assets/svg/user-icon.svg?react'
import PasswordIcon from '../../assets/svg/password-icon.svg?react'
import { useForm } from 'react-hook-form'
import { login, registerUser } from '../../api/api'
import LogoIcon from '../../assets/svg/logo-icon.svg?react'
import type { AuthFormData, IAuthFormProps } from './types'

export const AuthForm: FC<IAuthFormProps> = ({
  setUser,
  onModalClose,
  setToken,
}) => {
  const [authType, setAuthType] = useState('login')

  const { register, handleSubmit } = useForm<AuthFormData>()

  const handleClick = () => {
    setAuthType((prevState) => (prevState === 'login' ? 'register' : 'login'))
  }

  const handleLogin = async ({ username, password }: AuthFormData) => {
    const data = await login({ username, password })
    if (data.token) {
      setToken(data.token)
      setUser(username)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', username)
      onModalClose()
    } else {
      alert(data.message)
    }
  }

  const handleRegister = async ({ username, password }: AuthFormData) => {
    const data = await registerUser({ username, password })
    if (!data.user) {
      alert(data.message)
    } else {
      setAuthType('login')
    }
  }

  return (
    <div className="auth-form">
      <LogoIcon className="header__logo" width={178} height={30} />
      <form
        className="auth-form__form"
        action="POST"
        onSubmit={
          authType === 'login'
            ? handleSubmit(({ username, password }) => {
                handleLogin({ username, password })
              })
            : handleSubmit(({ username, password }) => {
                handleRegister({ username, password })
              })
        }
      >
        <div className="auth-form__field">
          <input
            className="auth-form__input"
            type="text"
            placeholder="Имя пользователя"
            id="username"
            {...register('username')}
            required
          />
          <UserIcon className="auth-form__icon" width={24} height={24} />
        </div>
        <div className="auth-form__field">
          <input
            className="auth-form__input"
            type="password"
            placeholder="Пароль"
            id="password"
            {...register('password')}
            required
          />
          <PasswordIcon className="auth-form__icon" width={24} height={24} />
        </div>

        <Button className="user-form__btn btn btn--primary" type="submit">
          {authType === 'login' ? 'Войти' : 'Создать аккаунт'}
        </Button>
      </form>
      <Button
        className="btn btn--secondary"
        type="button"
        onClick={handleClick}
      >
        {authType === 'login' && 'Регистрация'}
        {authType === 'register' && 'У меня есть пароль'}
      </Button>
    </div>
  )
}
