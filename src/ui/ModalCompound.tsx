import {
  ComponentPropsWithoutRef,
  PropsWithChildren,
  ReactElement,
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  LegacyRef,
  MouseEvent,
} from "react";
import { createPortal } from "react-dom";
import { HiOutlineXMark } from "react-icons/hi2";
import styled from "styled-components";

type ModalProps = ComponentPropsWithoutRef<"div"> & {
  onClose?: () => void;
};

type ModalContextProps = {
  isVisible: boolean;
  open: () => void;
  close: () => void;
};

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context)
    throw new Error("useModalContext must be used within ModalCompound");

  return context;
};

const ModalCompound = ({ children }: PropsWithChildren) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const open = () => setIsVisible(true);
  const close = () => setIsVisible(false);

  return (
    <ModalContext.Provider value={{ isVisible, open, close }}>
      {children}
    </ModalContext.Provider>
  );
};

const Open = ({ children }: { children: ReactElement }) => {
  const { open } = useModalContext();

  return cloneElement(children, { onClick: open });
};

const Window = ({ children, onClose }: ModalProps) => {
  const { isVisible, close } = useModalContext();
  const windowRef = useRef<LegacyRef<HTMLDivElement> | undefined>(undefined);

  useEffect(() => {
    const handleClick = ({ target }: MouseEvent) =>
      windowRef.current && !windowRef.current.contains(target) && close();

    document.addEventListener("click", handleClick, true);

    return () => document.removeEventListener("click", handleClick, true);
  }, [close]);

  if (!isVisible) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={windowRef}>
        <Button onClick={close}>
          <HiOutlineXMark />
        </Button>
        {children}
      </StyledModal>
    </Overlay>,
    document.body
  );
};

ModalCompound.Open = Open;
ModalCompound.Window = Window;

export default ModalCompound;

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;
