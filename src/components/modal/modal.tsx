import { createContext, useContext, useState } from "react";
import Button from "../Button";

type ModalContext = {
  isOpen: boolean;
  close: () => void;
  open: () => void;
  setContent: (content: React.ReactNode) => void;
};

const ModalContext = createContext({} as ModalContext);

const ModalContainer = ({ children }: { children: React.ReactNode }) => {
  const { close } = useModal();
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 flex-col ">
      <div className="bg-white px-2 py-3 min-w-96 rounded-md">
        <div className="flex justify-end">
          <Button
            className=""
            size="md"
            color="secondary"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
};

export function Modal({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<React.ReactNode>(null);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <ModalContext.Provider value={{ isOpen, open, close, setContent }}>
      {children}
      {isOpen && <ModalContainer>{content}</ModalContainer>}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}

export default Modal;
