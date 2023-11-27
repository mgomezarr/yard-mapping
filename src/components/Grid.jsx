import React, { useState, useEffect } from "react";
import { Rect, Group } from "react-konva";
import { getContainers } from "../www/container";

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
  const [array, setArray] = useState([]);

  useEffect(() => {
    setArray(getContainers());
  }, [setArray]);

  const generateSpaces = () => {
    const array = [
      [0, 1, 0, 0, 0, 1],
      [0, 0, 1, 0, 1, 1],
      [0, 0, 0, 0, 0, 0],
    ];
    const spaces = [];
    const separation = 0;

    for (let row = 0; row < array.length; row++) {
      for (let col = 0; col < array[0].length; col++) {
        const state = array[row][col];
        const spaceX = x + col * (spaceWidth + separation);
        const spaceY = y + row * (spaceHeight + separation);
        spaces.push({
          id: `${row}-${col}`,
          x: spaceX,
          y: spaceY,
          width: spaceWidth,
          height: spaceHeight,
          color: state === 1 ? "#000" : "#ccc",
          stroke: state === 1 ? "" : "#e9e9e9",
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
          fill={space.color}
          stroke={space.stroke}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={(e) => onDrop(e, space)}
        />
      ))}
    </Group>
  );
};
