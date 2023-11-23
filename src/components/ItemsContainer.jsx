import React from "react";
import { Group } from "react-konva";
import { Item } from "./Item";

export const ItemsContainer = ({
  items,
  itemWidth,
  itemHeight,
  onItemDragStart,
  onItemDragEnd,
}) => {
  const stageWidth = 400;
  const stageHeight = 300;
  const itemsPerRow = Math.floor(stageWidth / itemWidth);
  const numRows = Math.ceil(items.length / itemsPerRow);

  return (
    <Group y={stageHeight} offsetY={stageHeight} scaleX={1} scaleY={-1}>
      {items.map((item, index) => {
        const row = Math.floor(index / itemsPerRow);
        const col = index % itemsPerRow;
        const x = col * itemWidth;
        const y = row * itemHeight;

        return (
          <Item
            key={`item-${index}`}
            x={x}
            y={y}
            width={itemWidth}
            height={itemHeight}
            color={item.color}
            draggable={true}
            onDragStart={() => onItemDragStart(index)}
            onDragEnd={(e) => onItemDragEnd(index, e)}
          />
        );
      })}
    </Group>
  );
};
