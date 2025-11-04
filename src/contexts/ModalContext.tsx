import { createContext, useContext, useState, ReactNode } from "react";
import Modal, { ModalType } from "../components/Modal";

interface ModalOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

interface ModalContextType {
  showError: (options: ModalOptions) => Promise<void>;
  showConfirm: (options: ModalOptions) => Promise<boolean>;
  showInfo: (options: ModalOptions) => Promise<void>;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<ModalType>("info");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [confirmText, setConfirmText] = useState("확인");
  const [cancelText, setCancelText] = useState("취소");
  const [resolver, setResolver] = useState<((value: boolean) => void) | null>(
    null
  );

  const showModal = (
    modalType: ModalType,
    options: ModalOptions
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      setType(modalType);
      setTitle(options.title);
      setMessage(options.message);
      setConfirmText(options.confirmText || "확인");
      setCancelText(options.cancelText || "취소");
      setIsOpen(true);
      setResolver(() => resolve);
    });
  };

  const handleConfirm = () => {
    setIsOpen(false);
    if (resolver) {
      resolver(true);
      setResolver(null);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    if (resolver) {
      resolver(false);
      setResolver(null);
    }
  };

  const showError = async (options: ModalOptions): Promise<void> => {
    await showModal("error", options);
  };

  const showConfirm = async (options: ModalOptions): Promise<boolean> => {
    return await showModal("confirm", options);
  };

  const showInfo = async (options: ModalOptions): Promise<void> => {
    await showModal("info", options);
  };

  return (
    <ModalContext.Provider value={{ showError, showConfirm, showInfo }}>
      {children}
      <Modal
        isOpen={isOpen}
        type={type}
        title={title}
        message={message}
        confirmText={confirmText}
        cancelText={cancelText}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
