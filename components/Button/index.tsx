import { ReactNode } from "react";
import styles from "./styles.module.scss";

interface Props {
  children: ReactNode;
  disabled?: boolean | undefined;
  onClick: () => void;
}
const Button = ({ children, ...rest }: Props) => {
  return (
    <button {...rest} className={styles.btn}>
      {children}
    </button>
  );
};

export default Button;
