import React, { useEffect } from "react";
import { Rect } from "react-konva";

export const ShadowRectangle = ({ shadowRectangleRef }) => {
  useEffect(() => {
    shadowRectangleRef.current.to({
      opacity: 0.0,
    });
  }, [shadowRectangleRef]);
  return (
    <Rect
      x={0}
      y={0}
      width={50}
      height={50}
      fill="#144d6e"
      opacity={0.0}
      stroke="#0a2f45"
      strokeWidth={3}
      ref={shadowRectangleRef}
    />
  );
};
