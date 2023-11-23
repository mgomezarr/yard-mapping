import React from "react";
import { Rect, Group } from "react-konva";

export const Grid = ({
  x,
  y,
  width,
  height,
  numCols,
  numRows,
  spaceWidth,
  spaceHeight,
  onDragOver,
  onDragLeave,
  onDrop,
}) => {
  const generateSpaces = () => {
    const spaces = [];
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        const spaceX = x + col * (spaceWidth + 10);
        const spaceY = y + row * (spaceHeight + 10);
        spaces.push({
          id: `${row}-${col}`,
          x: spaceX,
          y: spaceY,
          width: spaceWidth,
          height: spaceHeight,
        });
      }
    }
    return spaces;
  };

  const spaces = generateSpaces();

  return (
    <Group>
      {spaces.map((space) => (
        <Rect
          key={space.id}
          x={space.x}
          y={space.y}
          width={space.width}
          height={space.height}
          fill="#ccc"
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={(e) => onDrop(e, space)}
        />
      ))}
    </Group>
  );
};
