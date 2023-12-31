import Konva from "konva";
import { calculateCoords } from "../utils/position";

export const createNewItem = (x, y, layer, stage, shadowsnapItemRef) => {
  let currentPosition = [];
  const snapSize = 50;
  const snapItem = new Konva.Rect({
    x,
    y,
    width: 50,
    height: 50,
    fill: "red",
    stroke: "#ddd",
    strokeWidth: 1,
    shadowColor: "black",
    shadowBlur: 2,
    shadowOffset: { x: 1, y: 1 },
    shadowOpacity: 0.4,
    draggable: true,
  });

  snapItem.on("dragstart", () => {
    currentPosition = calculateCoords(snapItem.x(), snapItem.y(), snapSize);
    shadowsnapItemRef.current.to({
      opacity: 0.6,
      duration: 0.2,
    });
    shadowsnapItemRef.current.moveToTop();
    snapItem.moveToTop();
  });

  snapItem.on("dragend", () => {
    const snapSize = 50; // Tamaño del snap
    const snappedX = Math.round(snapItem.x() / snapSize) * snapSize;
    const snappedY = Math.round(snapItem.y() / snapSize) * snapSize;

    // Limitar las posiciones x e y dentro de los límites del Stage
    const minX = 0;
    const maxX = stage.width() - snapItem.width();
    const minY = 0;
    const maxY = stage.height() - snapItem.height();

    // Coordenadas
    const x = Math.max(minX, Math.min(maxX, snappedX));
    const y = Math.max(minY, Math.min(maxY, snappedY));

    snapItem.position({ x, y });

    // Aplicar la misma lógica al shadowsnapItemRef
    shadowsnapItemRef.current.position({ x, y });

    stage.batchDraw();
    shadowsnapItemRef.current.to({
      opacity: 0.0,
      duration: 0.2,
    });
    console.log("current:", currentPosition);
    console.log("new:", calculateCoords(x, y, snapSize));
  });

  snapItem.on("dragmove", () => {
    const snappedX = Math.round(snapItem.x() / snapSize) * snapSize;
    const snappedY = Math.round(snapItem.y() / snapSize) * snapSize;

    // Limitar las posiciones x e y dentro de los límites del Stage
    const minX = 0;
    const maxX = stage.width() - snapItem.width();
    const minY = 0;
    const maxY = stage.height() - snapItem.height();

    // snapItem.position({
    //   x: Math.max(minX, Math.min(maxX, snappedX)),
    //   y: Math.max(minY, Math.min(maxY, snappedY)),
    // });

    // Aplicar la misma lógica al shadowsnapItemRef
    shadowsnapItemRef.current.position({
      x: Math.max(minX, Math.min(maxX, snappedX)),
      y: Math.max(minY, Math.min(maxY, snappedY)),
    });

    stage.batchDraw();
  });

  layer.add(snapItem);
};
