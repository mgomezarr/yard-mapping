import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(<App />);

// import { Rect, Stage, Layer, Star, Text, Line } from "react-konva";

// const App = () => {
//   const width = window.innerWidth;
//   const height = window.innerHeight;
//   const shadowOffset = 20;
//   const tween = null;
//   const blockSnapSize = 30;

//   return (
//     <Stage container="container" width={width} height={height}>
//       <Rect
//         x={0}
//         y={0}
//         width={blockSnapSize * 6}
//         height={blockSnapSize * 3}
//         fill="#FF7B17"
//         opacity={0.6}
//         stroke="#CF6412"
//         strokeWidth={3}
//         dash={[20, 2]}
//       ></Rect>
//     </Stage>
//   );
//   //   const [stars, setStars] = React.useState(INITIAL_STATE);
//   //   const handleDragStart = (e) => {
//   //     const id = e.target.id();
//   //     setStars(
//   //       stars.map((star) => {
//   //         return {
//   //           ...star,
//   //           isDragging: star.id === id,
//   //         };
//   //       })
//   //     );
//   //   };
//   //   const handleDragEnd = (e) => {
//   //     setStars(
//   //       stars.map((star) => {
//   //         return {
//   //           ...star,
//   //           isDragging: false,
//   //         };
//   //       })
//   //     );
//   //   };
//   //   return (
//   //     <Stage width={window.innerWidth} height={window.innerHeight}>
//   //       <Layer>
//   //         <Text text="Try to drag a star" />
//   //         {stars.map((star) => (
//   //           <Star
//   //             key={star.id}
//   //             id={star.id}
//   //             x={star.x}
//   //             y={star.y}
//   //             numPoints={5}
//   //             innerRadius={20}
//   //             outerRadius={40}
//   //             fill="#89b717"
//   //             opacity={0.8}
//   //             draggable
//   //             rotation={star.rotation}
//   //             shadowColor="black"
//   //             shadowBlur={10}
//   //             shadowOpacity={0.6}
//   //             shadowOffsetX={star.isDragging ? 10 : 5}
//   //             shadowOffsetY={star.isDragging ? 10 : 5}
//   //             scaleX={star.isDragging ? 1.2 : 1}
//   //             scaleY={star.isDragging ? 1.2 : 1}
//   //             onDragStart={handleDragStart}
//   //             onDragEnd={handleDragEnd}
//   //           />
//   //         ))}
//   //       </Layer>
//   //     </Stage>
//   //   );
// };

// const container = document.getElementById("root");
// const root = createRoot(container);
// root.render(<App />);
