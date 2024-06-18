import { forwardRef, ReactNode } from "react";

export type ModalProps = {
  children?: ReactNode;
  onBackdropClick?: () => void;
  modalBoxClassName?: string;
  // more classNames can be added as per customisation needs
};

export const Modal = forwardRef<HTMLDialogElement, ModalProps>(
  ({ children, modalBoxClassName, onBackdropClick }, ref) => {
    return (
      <div className="">
        
          <dialog ref={ref} className="modal  mx-auto">
            <div
              className={`modal-box modal-box-update ${modalBoxClassName ?? ""}`}
            >
              {children}
            </div>
            <form method="dialog" className="modal-backdrop">
              <button
                type="button"
                onClick={() => {
                  onBackdropClick && onBackdropClick();
                }}
              >
                close
              </button>
            </form>
          </dialog>
       
      </div>
    );
  }
);
