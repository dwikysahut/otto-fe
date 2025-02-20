import React from "react";

type DividerProps = {
  style?: string;
};

export default function Divider({ style }: DividerProps) {
  return <hr className={`${style} text-lg`} />;
}
