import { ReactNode } from "react";
import card from "./card.module.scss";

interface Props {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children }: Props) => {
  return <div className={card.container}>{children}</div>;
};

export const Image = ({ children }: Props) => {
  return <div className={card.imgContainer}>{children}</div>;
};

export const Content = ({ children, className }: Props) => {
  return <div className={`${card.content} ${className}`}>{children}</div>;
};
