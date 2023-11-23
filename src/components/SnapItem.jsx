import Konva from "konva";

export const createNewItem = (x, y, layer, stage, shadowsnapItemRef) => {
  const snapItem = new Konva.Rect({
    x,
    y,
    width: 50,
    height: 50,
    fill: "#fff",
    stroke: "#ddd",
    strokeWidth: 1,
    shadowColor: "black",
    shadowBlur: 2,
    shadowOffset: { x: 1, y: 1 },
    shadowOpacity: 0.4,
    draggable: true,
  });

  snapItem.on("dragstart", () => {
    shadowsnapItemRef.current.to({
      opacity: 0.6,
      duration: 0.2,
    });
    shadowsnapItemRef.current.moveToTop();
    snapItem.moveToTop();
  });

  snapItem.on("dragend", () => {
    snapItem.position({
      x: Math.round(snapItem.x() / 50) * 50,
      y: Math.round(snapItem.y() / 50) * 50,
    });
    stage.batchDraw();
    shadowsnapItemRef.current.to({
      opacity: 0.0,
      duration: 0.2,
    });
  });

  snapItem.on("dragmove", () => {
    shadowsnapItemRef.current.position({
      x: Math.round(snapItem.x() / 50) * 50,
      y: Math.round(snapItem.y() / 50) * 50,
    });
    stage.batchDraw();
  });

  layer.add(snapItem);
};
