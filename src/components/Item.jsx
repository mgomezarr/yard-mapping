import React from "react";
import { Rect } from "react-konva";

export const Item = ({
  x,
  y,
  width,
  height,
  color,
  draggable,
  onDragStart,
  onDragEnd,
  onDragMove,
}) => {
  const stageWidth = 1500;
  const stageHeight = 800;

  const HandleDragMove = (e) => {
    const newX = Math.max(0, Math.min(e.target.x(), stageWidth - width));
    const newY = Math.max(0, Math.min(e.target.y(), stageHeight - height));
    e.target.position({ x: newX, y: newY });
    onDragMove && onDragMove(e);
  };

  return (
    <Rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={color}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragMove={HandleDragMove}
    />
  );
};
