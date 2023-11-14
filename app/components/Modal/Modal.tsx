import React, {
  Dispatch,
  ReactChild,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./Modal.module.css";

export const Modal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<string | false>>;
  children: ReactChild;
}) => {
  const [isModalOpen, setModalOpen] = useState(isOpen);
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const handleCloseModal = () => {
    if (onClose) onClose(false);
    setModalOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "Escape") handleCloseModal();
  };

  const handleOverlayClick = (event: MouseEvent) => {
    if (modalRef.current && event.target === modalRef.current)
      handleCloseModal();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOverlayClick);

    return () => {
      document.removeEventListener("mousedown", handleOverlayClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setModalOpen(!!isOpen);
  }, [isOpen]);

  useEffect(() => {
    const modalElement = modalRef.current;

    if (modalElement) {
      isModalOpen ? modalElement.showModal() : modalElement.close();
    }
  }, [isModalOpen]);

  return (
    <dialog ref={modalRef} onKeyDown={handleKeyDown} className={styles.modal}>
      <button onClick={handleCloseModal}>
        <img src="/close.png" alt="Close modal" />
      </button>
      {children}
    </dialog>
  );
};
