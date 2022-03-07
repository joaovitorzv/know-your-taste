import { ReactNode } from "react";
import card from "./card.module.scss";

interface Props {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className }: Props) => {
  return <div className={`${card.container} ${className}`}>{children}</div>;
};

export const LeftHand = ({ children, className }: Props) => {
  return <div className={`${card.leftHand} ${className}`}>{children}</div>;
};

export const RightHand = ({ children, className }: Props) => {
  return <div className={`${card.rightHand} ${className}`}>{children}</div>;
};
