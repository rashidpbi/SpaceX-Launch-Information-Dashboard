import { ReactNode, useRef } from 'react'
import { ModalProps,Modal} from '../components/Modal'

export type UseModalResp = {
  modal: ReactNode
  closeModal: () => void
  openModal: () => void
  modalBoxClassName?: string
}

export type UseModalProps =  {
    
  shouldAllowBackdropClick?: boolean //if it is true then modal can be closed
  onModalOpen?: () => void //this function will be called on calling of openModal
  onModalClose?: () => void //this function will be called on calling of closeModal
}& Omit<ModalProps, 'onBackdropClick'> 

export const useModal = ({
  children,
  modalBoxClassName,
  shouldAllowBackdropClick = true,
  onModalClose,
  onModalOpen
}: UseModalProps): UseModalResp => {
  const ref = useRef<HTMLDialogElement | null>(null)

const closeModal = () => {
    onModalClose && onModalClose()
    ref.current?.close()
  }

const openModal = () => {
    onModalOpen && onModalOpen()
    ref.current?.showModal()
  }

const modal: ReactNode = (
    <Modal
      onBackdropClick={() => {
        if (shouldAllowBackdropClick) {
          closeModal()
        }
      }}
      ref={ref}
      modalBoxClassName={modalBoxClassName}
    >
      {children}
    </Modal>
  )

return {
    closeModal,
    openModal,
    modal
  }
}