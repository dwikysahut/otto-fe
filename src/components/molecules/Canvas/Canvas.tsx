import React, { useRef, useState, useLayoutEffect } from "react";
import html2canvas from "html2canvas";
import Space from "../../atom/Space";
import { Button } from "reactstrap";
import PositionedText from "../../atom/PositionedText";

type CardData = {
  image: string | undefined;
  to: { text: string; coordinates: { x: number; y: number } };
  from: { text: string; coordinates: { x: number; y: number } };
  message: { text: string; coordinates: { x: number; y: number } };
};

type CanvasProps = {
  cardData: CardData;
};

const Canvas: React.FC<CanvasProps> = ({ cardData }) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [isSizeCalculated, setIsSizeCalculated] = useState(false);

  useLayoutEffect(() => {
    const calculateSize = () => {
      if (canvasRef.current) {
        const { offsetWidth, offsetHeight } = canvasRef.current;
        console.log("offsetWidth:", offsetWidth, "offsetHeight:", offsetHeight);
        if (offsetWidth > 0 && offsetHeight > 0) {
          setContainerSize({ width: offsetWidth, height: offsetHeight });
          setIsSizeCalculated(true);
        } else {
          console.error("Container size is 0. Check parent dimensions or CSS.");
        }
      }
    };

    calculateSize();
    window.addEventListener("resize", calculateSize);
    return () => window.removeEventListener("resize", calculateSize);
  }, []);

  useLayoutEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!isSizeCalculated) {
        console.warn("Size calculation timed out. Using fallback dimensions.");
        setContainerSize({ width: 500, height: 500 });
        setIsSizeCalculated(true);
      }
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [isSizeCalculated]);

  const scaleX = (value: number) => (value / 1114) * containerSize.width;
  const scaleY = (value: number) => (value / 800) * containerSize.height;
  const dynamicFontSize = (baseSize: number) =>
    `clamp(${baseSize}px, 2vw, ${baseSize * Math.min(containerSize.width / 1114, containerSize.height / 800)}px)`;

  const downloadCard = async () => {
    if (!canvasRef.current) return;

    try {
      const canvas = await html2canvas(canvasRef.current);
      const link = document.createElement("a");
      link.download = "greeting-card.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Error generating canvas:", error);
    }
  };

  if (!isSizeCalculated) {
    return <div>Loading...</div>;
  }

  return (
    <Space style="">
      <div
        ref={canvasRef}
        className="card-preview"
        style={{
          position: "relative",
          width: "500px",
          height: "auto",
          overflow: "hidden",
        }}
      >
        <img src={cardData.image} alt="Background" style={{ width: "100%", height: "auto" }} />
        <PositionedText
          coordinates={{
            x: scaleX(cardData.to.coordinates.x),
            y: scaleY(cardData.to.coordinates.y),
          }}
          text={cardData.to.text}
          style={{
            position: "absolute",
            top: `${scaleY(cardData.to.coordinates.y)}px`,
            left: `${scaleX(cardData.to.coordinates.x)}px`,
            maxWidth: "190px",
            padding: "8px 4px",
            overflowX: "hidden",
            textWrap: "nowrap",
            textOverflow: "ellipsis",
            lineHeight: "1.5rem",
            fontSize: dynamicFontSize(20),
          }}
        />
        <PositionedText
          coordinates={{
            x: scaleX(cardData.message.coordinates.x),
            y: scaleY(cardData.message.coordinates.y),
          }}
          text={cardData.message.text}
          style={{
            position: "absolute",
            top: `${scaleY(cardData.message.coordinates.y)}px`,
            left: `${scaleX(cardData.message.coordinates.x)}px`,
            maxWidth: `${containerSize.width * 0.4}px`,
            textWrap: "wrap",
            lineHeight: "38px",
            fontSize: dynamicFontSize(20),
          }}
        />
        <PositionedText
          coordinates={{
            x: scaleX(cardData.from.coordinates.x),
            y: scaleY(cardData.from.coordinates.y),
          }}
          text={cardData.from.text}
          style={{
            position: "absolute",
            top: `${scaleY(cardData.from.coordinates.y)}px`,
            left: `${scaleX(cardData.from.coordinates.x)}px`,
            maxWidth: "190px",
            padding: "8px 4px",
            overflowX: "hidden",
            textWrap: "nowrap",
            textOverflow: "ellipsis",
            lineHeight: "1.5rem",
            fontSize: dynamicFontSize(20),
          }}
        />
      </div>
      <Button onClick={downloadCard} className="bg-green-600 text-center w-44 justify-center self-center">
        Download Card
      </Button>
    </Space>
  );
};

export default Canvas;
