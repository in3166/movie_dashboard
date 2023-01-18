import { MouseEventHandler, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.scss';

interface IBackDropProps {
  onCancel?: MouseEventHandler<HTMLButtonElement>;
}

interface IModalProps {
  onCancel?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}

interface IModalOverlayProps {
  children: ReactNode;
}

const BackDrop = ({ onCancel }: IBackDropProps) => {
  return (
    <button
      type='button'
      aria-label='click backdrop to close modal'
      onClick={onCancel}
      className={styles.backDropButton}
    >
      <div className={styles.backDrop} />
    </button>
  );
};

const ModalOverlay = ({ children }: IModalOverlayProps) => {
  return <div className={styles.modal}>{children}</div>;
};

const Modal = ({ onCancel, children }: IModalProps) => {
  const backDropElement = document?.getElementById('backdropRoot');
  const modalElement = document?.getElementById('modalOverlay');

  return (
    <>
      {backDropElement && ReactDOM.createPortal(<BackDrop onCancel={onCancel} />, backDropElement)}
      {modalElement && ReactDOM.createPortal(<ModalOverlay>{children}</ModalOverlay>, modalElement)}
    </>
  );
};

export default Modal;
