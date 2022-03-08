import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import styles from "./styles.module.scss";

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  children: ReactNode;
};

const Button = ({ children, className, ...props }: Props) => {
  return (
    <button {...props} className={`${styles.btn} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
