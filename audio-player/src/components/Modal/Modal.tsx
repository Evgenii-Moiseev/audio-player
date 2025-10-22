import type { FC } from 'react'
import CloseIcon from '../../assets/svg/close-icon.svg?react'
import { Button } from '../../ui/Button/Button'

export interface IModalProps {
  onClose: () => void
  children: React.ReactNode
}

export const Modal: FC<IModalProps> = ({ onClose, children }) => {
  return (
    <div className="modal">
      <div className="modal__content">
        <Button
          className="modal__close-btn btn btn--icon"
          type="button"
          onClick={onClose}
        >
          <CloseIcon width={32} height={32} />
        </Button>
        {children}
      </div>
    </div>
  )
}
