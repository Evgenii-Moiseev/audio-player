import type { HTMLAttributes } from "react"

export interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  isDisabled?: boolean
  type?: 'submit' | 'button' | 'reset'
}