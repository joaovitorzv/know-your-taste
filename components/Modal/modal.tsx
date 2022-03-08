import { ReactNode, useRef } from "react";
import modal from "./modal.module.scss";
import { IoMdClose as CloseIcon } from "react-icons/io";

interface Props {
  children: ReactNode | ReactNode[];
  toggle: () => void;
  isOpen: boolean;
  headerText: string;
  className?: string;
}

const Modal = ({
  children,
  toggle,
  isOpen,
  headerText = "Modal",
  className,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  function clickOutside(e: any) {
    if (e.target === containerRef.current) toggle();
  }

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      onClick={(e) => clickOutside(e)}
      className={`${modal.wrapper} ${className}`}
    >
      <div className={modal.container}>
        <header className={modal.header}>
          <h4>{headerText}</h4>
          <button onClick={toggle}>
            <CloseIcon />
          </button>
        </header>
        <div className={modal.children}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
