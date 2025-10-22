export type AuthFormData = {
  username: string
  password: string
}

export interface IAuthFormProps {
  setUser: React.Dispatch<React.SetStateAction<string | null>>
  setToken: React.Dispatch<React.SetStateAction<string | null>>
  onModalClose: () => void
}
