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
      fill="#FF7B17"
      opacity={0.0}
      stroke="#CF6412"
      strokeWidth={3}
      dash={[20, 2]}
      ref={shadowRectangleRef}
    />
  );
};
