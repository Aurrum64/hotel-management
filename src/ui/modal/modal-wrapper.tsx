import { PropsWithChildren, ReactElement, cloneElement, useState } from "react";
import { Modal } from "./modal";

type ModalWrapperProps = PropsWithChildren & {
  visibilityButton: ReactElement;
};

const ModalWrapper = ({ visibilityButton, children }: ModalWrapperProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      {cloneElement(visibilityButton, { onClick: () => setIsVisible(true) })}
      {isVisible ? (
        <Modal onClose={() => setIsVisible(false)}>
          {cloneElement(children as ReactElement, {
            onClose: () => setIsVisible(false),
          })}
        </Modal>
      ) : null}
    </>
  );
};

export default ModalWrapper;
