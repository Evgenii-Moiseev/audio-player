import type { FC } from 'react'
import type { IButtonProps } from './types'

export const Button: FC<IButtonProps> = ({
  isLoading,
  isDisabled = isLoading,
  children,
  className,
  type,
  ...props
}) => {
  return (
    <button disabled={isDisabled} type={type} className={className} {...props}>
      {children}
    </button>
  )
}
