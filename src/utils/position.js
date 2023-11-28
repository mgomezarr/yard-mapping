export const calculateCoords = (x, y, itemSize) => {
  return [Math.round(x / itemSize), Math.round(y / itemSize)];
};
