import React from "react";

type Coordinates = {
  x: number;
  y: number;
};

type PositionedTextProps = {
  text: string;
  coordinates: Coordinates;
  maxWidth?: string; // Optional: allows customizing max width
  style?: React.CSSProperties; // Optional: additional inline styles
};

const PositionedText: React.FC<PositionedTextProps> = ({ text, coordinates, maxWidth = "190px", style = {} }) => {
  return (
    <p
      style={{
        position: "absolute",
        top: `${coordinates.y}px`,
        left: `${coordinates.x}px`,
        maxWidth,
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        ...style, // Allows overriding or extending default styles
      }}
    >
      {text}
    </p>
  );
};

export default PositionedText;
