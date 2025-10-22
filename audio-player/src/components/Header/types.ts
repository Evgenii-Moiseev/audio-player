export interface IHeaderProps {
  user: string | null
  token: string | null
  onLogout: () => void
  onModalOpen: () => void
  onSearch?: (query: string) => void
}
