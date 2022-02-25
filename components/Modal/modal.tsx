import { ReactNode, useEffect, useRef } from "react";
import modal from "./modal.module.css";

interface Props {
  children: ReactNode | ReactNode[];
  toggle: () => void;
  isOpen: boolean;
}

const Modal = ({ children, toggle, isOpen }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  function clickOutside(e: any) {
    if (e.target === containerRef.current) toggle();
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      onClick={(e) => clickOutside(e)}
      className={modal.wrapper}
    >
      <div className={modal.container}>
        <header>
          <h4>Modal header</h4>
          <button onClick={toggle}>x</button>
        </header>
        <div className={modal.children}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
