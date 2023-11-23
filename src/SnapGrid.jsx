import React, { useEffect, useRef } from "react";
import Konva from "konva";
import { Stage, Layer, Rect, Line } from "react-konva";

const BlockSnapSize = 30;

const ShadowRectangle = ({ shadowRectangleRef }) => {
  useEffect(() => {
    shadowRectangleRef.current.to({
      opacity: 0.0, // Inicialmente oculto
    });
  }, [shadowRectangleRef]);

  return (
    <Rect
      x={0}
      y={0}
      width={BlockSnapSize * 6}
      height={BlockSnapSize * 3}
      fill="#FF7B17"
      opacity={0.0}
      stroke="#CF6412"
      strokeWidth={3}
      dash={[20, 2]}
      ref={shadowRectangleRef}
    />
  );
}; // DONE in New Component

const newRectangle = (x, y, layer, stage, shadowRectangleRef) => {
  const rectangle = new Konva.Rect({
    x,
    y,
    width: BlockSnapSize * 6,
    height: BlockSnapSize * 3,
    fill: "#fff",
    stroke: "#ddd",
    strokeWidth: 1,
    shadowColor: "black",
    shadowBlur: 2,
    shadowOffset: { x: 1, y: 1 },
    shadowOpacity: 0.4,
    draggable: true,
  });

  rectangle.on("dragstart", () => {
    shadowRectangleRef.current.to({
      opacity: 0.6,
      duration: 0.2,
    });
    shadowRectangleRef.current.moveToTop();
    rectangle.moveToTop();
  });

  rectangle.on("dragend", () => {
    rectangle.position({
      x: Math.round(rectangle.x() / BlockSnapSize) * BlockSnapSize,
      y: Math.round(rectangle.y() / BlockSnapSize) * BlockSnapSize,
    });
    stage.batchDraw();
    shadowRectangleRef.current.to({
      opacity: 0.0,
      duration: 0.2,
    });
  });

  rectangle.on("dragmove", () => {
    shadowRectangleRef.current.position({
      x: Math.round(rectangle.x() / BlockSnapSize) * BlockSnapSize,
      y: Math.round(rectangle.y() / BlockSnapSize) * BlockSnapSize,
    });
    stage.batchDraw();
  });

  layer.add(rectangle);
}; // Must be in ItemsContainer

const GridLines = ({ width, height, padding }) => {
  const lines = [];

  for (let i = 0; i < width / padding; i++) {
    lines.push(
      <Line
        key={`vertical-${i}`}
        points={[
          Math.round(i * padding) + 0.5,
          0,
          Math.round(i * padding) + 0.5,
          height,
        ]}
        stroke="#ddd"
        strokeWidth={1}
      />
    );
  }

  for (let j = 0; j < height / padding; j++) {
    lines.push(
      <Line
        key={`horizontal-${j}`}
        points={[0, Math.round(j * padding), width, Math.round(j * padding)]}
        stroke="#ddd"
        strokeWidth={0.5}
      />
    );
  }

  return lines;
}; // Useless

const App = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const blockSnapSize = 30;

  const stageRef = useRef();
  const layerRef = useRef();
  const shadowRectangleRef = useRef();

  useEffect(() => {
    const stage = stageRef.current;
    const layer = layerRef.current;

    newRectangle(
      blockSnapSize * 3,
      blockSnapSize * 3,
      layer,
      stage,
      shadowRectangleRef
    );
    newRectangle(
      blockSnapSize * 10,
      blockSnapSize * 3,
      layer,
      stage,
      shadowRectangleRef
    );

    stage.add(layer);
  }, []);

  return (
    <div>
      <h1>Mi Aplicación React con Konva.js</h1>
      <Stage width={width} height={height} ref={stageRef}>
        <Layer>
          <GridLines width={width} height={height} padding={blockSnapSize} />
        </Layer>
        <Layer ref={layerRef}>
          <ShadowRectangle shadowRectangleRef={shadowRectangleRef} />
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
