import React, { useState, useEffect, useRef } from "react";
import { Stage, Layer } from "react-konva";
import { Grid } from "./components/Grid";
import { createNewItem } from "./components/SnapItem";
import { ShadowRectangle } from "./components/ShadowItem";

const App = () => {
  const stageRef = useRef();
  const layerRef = useRef();
  const shadowRectangleRef = useRef();

  const [rectangles, setRectangles] = useState([]);
  const [spaces, setSpaces] = useState([]);
  const spaceWidth = 50;
  const spaceHeight = 50;
  const numCols = 15;
  const numRows = 10;

  useEffect(() => {
    // Snap logic
    const stage = stageRef.current;
    const layer = layerRef.current;

    createNewItem(300, 550, layer, stage, shadowRectangleRef); // Posición inicial del item a arrastrar. TODO: sujetos a un backend.
    createNewItem(400, 550, layer, stage, shadowRectangleRef); // Posición inicial del segundo item a arrastrar.
    createNewItem(500, 550, layer, stage, shadowRectangleRef); // ...
    createNewItem(600, 550, layer, stage, shadowRectangleRef); // ...
    stage.add(layer);

    // Generar rectángulos con colores aleatorios
    const colors = ["#FF5733", "#33FF57", "#5733FF", "#33FFFF", "#FF33A1"];
    const generatedRectangles = colors.map((color, index) => ({
      id: index,
      color: color,
      width: 60,
      height: 40,
      draggable: true,
    }));
    setRectangles(generatedRectangles);

    // Generar espacios
    const generatedSpaces = Array.from(
      { length: numCols * numRows },
      (_, index) => ({
        id: index,
        x: 0,
        y: 0,
        width: spaceWidth,
        height: spaceHeight,
      })
    );
    setSpaces(generatedSpaces);
  }, []);

  const handleDragStart = (id) => {
    const updatedRectangles = rectangles.map((rect) => {
      return rect.id === id ? { ...rect, zIndex: 1 } : rect;
    });
    setRectangles(updatedRectangles);
  };

  const handleDragEnd = (id, e) => {
    const rect = rectangles.find((r) => r.id === id);
    const rectX = e.target.x();
    const rectY = e.target.y();

    const isInsideAnySpace = spaces.some(
      (space) =>
        rectX >= space.x &&
        rectX <= space.x + space.width - rect.width &&
        rectY >= space.y &&
        rectY <= space.y + space.height - rect.height
    );

    if (isInsideAnySpace) {
      const space = spaces.find(
        (space) =>
          rectX >= space.x &&
          rectX <= space.x + space.width - rect.width &&
          rectY >= space.y &&
          rectY <= space.y + space.height - rect.height
      );

      const updatedRectangles = rectangles.map((r) => {
        return r.id === id ? { ...r, x: space.x, y: space.y, zIndex: 0 } : r;
      });
      setRectangles(updatedRectangles);
    } else {
      const updatedRectangles = rectangles.map((r) => {
        return r.id === id
          ? { ...r, x: rect.initialX, y: rect.initialY, zIndex: 0 }
          : r;
      });
      setRectangles(updatedRectangles);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, space) => {
    e.preventDefault();

    const id = e.dataTransfer.getData("id");
    const rect = rectangles.find((r) => r.id === parseInt(id));

    const rectX = e.target.x();
    const rectY = e.target.y();

    const isInsideSpace =
      rectX >= space.x &&
      rectX <= space.x + space.width - rect.width &&
      rectY >= space.y &&
      rectY <= space.y + space.height - rect.height;

    if (isInsideSpace) {
      const updatedRectangles = rectangles.map((r) => {
        return r.id === rect.id
          ? { ...r, x: space.x, y: space.y, zIndex: 0 }
          : r;
      });
      setRectangles(updatedRectangles);
    }
  };

  return (
    <div
      style={{
        alignContent: "center",
      }}
    >
      <h1
        style={{
          textAlign: "center",
        }}
      >
        YMS - Yard Mapping
      </h1>
      <Stage width={1500} height={800} ref={stageRef}>
        <Layer>
          <Grid
            x={50}
            y={50}
            width={300}
            height={200}
            numCols={numCols}
            numRows={numRows}
            spaceWidth={spaceWidth}
            spaceHeight={spaceHeight}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          />
        </Layer>
        <Layer ref={layerRef}>
          <ShadowRectangle shadowRectangleRef={shadowRectangleRef} />
        </Layer>
      </Stage>
    </div>
  );
};

export default App;
