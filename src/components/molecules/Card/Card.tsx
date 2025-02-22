import React, { ReactNode } from "react";
import Space from "../../atom/Space";

type CardProps = {
  children: ReactNode;
  style?: string;
  shadow?: boolean; // Optional prop for enabling shadow
  rounded?: boolean; // Optional prop for rounded corners
};
export default function Card({ children, style = "", shadow = true, rounded = true }: CardProps) {
  const baseStyle = `bg-white ${shadow ? "shadow-lg" : ""} ${rounded ? "rounded-xl" : ""} ${style}`;

  return <Space style={baseStyle}>{children}</Space>;
}
