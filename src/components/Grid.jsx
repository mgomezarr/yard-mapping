import axios from "axios";
import React, { useState, useEffect } from "react";
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
  const [array, setArray] = useState([]);

  useEffect(() => {
    const getContainers = async () => {
      const { data } = await axios.get(
        "https://d6b8bdc5-aa40-4681-b8af-c005666d6734.mock.pstmn.io/architecture"
      );
      setArray(generateSpaces(data.dist));
    };
    getContainers();
  }, []);

  // 0: no use (bg-white).
  // 1: available (bg-gray).
  // 2: busy (bg-black);
  const backgroundColorSwitch = (state) => {
    switch (state) {
      case 0:
        return "#fff";
      case 1:
        return "#ccc";
      case 2:
        return "#000";
      default:
        return "#fff";
    }
  };

  // 0: no use (bg-white, border-white).
  // 1: available (bg-gray, border-gray?).
  // 2: busy (bg-black, border-black);
  const strokeColorSwitch = (state) => {
    switch (state) {
      case 0:
        return "";
      case 1:
        return "#a9a9a9";
      case 2:
        return "#a9a9a9";
      default:
        return "#fff";
    }
  };

  const generateSpaces = (array) => {
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
          color: backgroundColorSwitch(state),
          stroke: strokeColorSwitch(state),
        });
      }
    }
    return spaces;
  };

  return (
    <Group>
      {array.map((space) => (
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
