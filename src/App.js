import React, { useState, useEffect, useRef } from "react";
import { Stage, Layer } from "react-konva";
import { Grid } from "./components/Grid";
import { ItemsContainer } from "./components/ItemsContainer";
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

    createNewItem(50, 50, layer, stage, shadowRectangleRef);
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

// ------------------------------------------------------------

// import React, { useEffect, useRef } from "react";
// import Konva from "konva";
// import { Stage, Layer, Rect, Line } from "react-konva";

// const BlockSnapSize = 30;

// const ShadowRectangle = ({ shadowRectangleRef }) => {
//   useEffect(() => {
//     shadowRectangleRef.current.to({
//       opacity: 0.0,
//     });
//   }, [shadowRectangleRef]);

//   return (
//     <Rect
//       x={0}
//       y={0}
//       width={BlockSnapSize * 2}
//       height={BlockSnapSize * 2}
//       fill="#FF7B17"
//       opacity={0.0}
//       stroke="#CF6412"
//       strokeWidth={3}
//       dash={[20, 2]}
//       ref={shadowRectangleRef}
//     />
//   );
// };

// const newRectangle = (x, y, layer, stage, shadowRectangleRef) => {
//   const rectangle = new Konva.Rect({
//     x,
//     y,
//     width: BlockSnapSize * 2,
//     height: BlockSnapSize * 2,
//     fill: "#fff",
//     stroke: "#ddd",
//     strokeWidth: 1,
//     shadowColor: "black",
//     shadowBlur: 2,
//     shadowOffset: { x: 1, y: 1 },
//     shadowOpacity: 0.4,
//     draggable: true,
//   });

//   rectangle.on("dragstart", () => {
//     shadowRectangleRef.current.to({
//       opacity: 0.6,
//       duration: 0.2,
//     });
//     shadowRectangleRef.current.moveToTop();
//     rectangle.moveToTop();
//   });

//   rectangle.on("dragend", () => {
//     rectangle.position({
//       x: Math.round(rectangle.x() / BlockSnapSize) * BlockSnapSize,
//       y: Math.round(rectangle.y() / BlockSnapSize) * BlockSnapSize,
//     });
//     stage.batchDraw();
//     shadowRectangleRef.current.to({
//       opacity: 0.0,
//       duration: 0.2,
//     });
//   });

//   rectangle.on("dragmove", () => {
//     shadowRectangleRef.current.position({
//       x: Math.round(rectangle.x() / BlockSnapSize) * BlockSnapSize,
//       y: Math.round(rectangle.y() / BlockSnapSize) * BlockSnapSize,
//     });
//     stage.batchDraw();
//   });

//   layer.add(rectangle);
// };

// const GridLines = ({ width, height, padding }) => {
//   const lines = [];

//   for (let i = 0; i < width / padding; i++) {
//     lines.push(
//       <Line
//         key={`vertical-${i}`}
//         points={[
//           Math.round(i * padding) + 0.5,
//           0,
//           Math.round(i * padding) + 0.5,
//           height,
//         ]}
//         stroke="#ddd"
//         strokeWidth={1}
//       />
//     );
//   }

//   for (let j = 0; j < height / padding; j++) {
//     lines.push(
//       <Line
//         key={`horizontal-${j}`}
//         points={[0, Math.round(j * padding), width, Math.round(j * padding)]}
//         stroke="#ddd"
//         strokeWidth={0.5}
//       />
//     );
//   }

//   return lines;
// };

// const Canvas = () => {
//   const width = window.innerWidth;
//   const height = window.innerHeight;
//   const blockSnapSize = 30;

//   const stageRef = useRef();
//   const layerRef = useRef();
//   const shadowRectangleRef = useRef();

//   useEffect(() => {
//     const stage = stageRef.current;
//     const layer = layerRef.current;

//     newRectangle(
//       blockSnapSize * 3,
//       blockSnapSize * 3,
//       layer,
//       stage,
//       shadowRectangleRef
//     );
//     newRectangle(
//       blockSnapSize * 10,
//       blockSnapSize * 3,
//       layer,
//       stage,
//       shadowRectangleRef
//     );

//     stage.add(layer);
//   }, []);

//   return (
//     <div>
//       <h1>YMS - Mapping</h1>
//       <Stage width={width} height={height} ref={stageRef}>
//         <Layer>
//           <GridLines width={width} height={height} padding={blockSnapSize} />
//         </Layer>
//         <Layer ref={layerRef}>
//           <ShadowRectangle shadowRectangleRef={shadowRectangleRef} />
//         </Layer>
//       </Stage>
//     </div>
//   );
// };

// export default Canvas;

// import { useState, useEffect } from "react";
// import "./App.css";
// import Axios from "axios";

// function App() {
//   const [array, setArray] = useState([]);
//   const statusArray = (array) => {
//     let chars = 0;
//     array.forEach((element) => {
//       element.forEach((i) => {
//         chars += i;
//       });
//     });
//     return <p>{chars}</p>;
//   };

//   useEffect(() => {
//     Axios({
//       url: "https://d6b8bdc5-aa40-4681-b8af-c005666d6734.mock.pstmn.io/architecture",
//     })
//       .then((response) => {
//         setArray(response.data.dist);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   }, [setArray]);

//   return <div>{statusArray(array)}</div>;
// }

// export default App;
