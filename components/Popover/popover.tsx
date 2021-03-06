import { ReactNode } from "react";
import pop from "./popover.module.scss";

interface Props {
  children: ReactNode;
}

export const Pophover = ({ children }: Props) => {
  return <div className={pop.hover}>{children}</div>;
};

export const Popicon = ({ children }: Props) => {
  return <div className={pop.icon}>{children}</div>;
};

export const Popover = ({ children }: Props) => {
  return (
    <div className={pop.overContainer}>
      <div className={pop.over}>{children}</div>
    </div>
  );
};
