export interface GraphData {
    x: number,
    y: number,
}
export const truncate = (graphPoint: number) => {
  let data = graphPoint
  const billion = 10e8;
  const million = 10e5;
  const thousand = 10e2;
  let divisor = 1;
  let extension = "";

  if (data / billion > 1) {
    divisor = billion;
    extension = "B";
  } else if (data / million > 1) {
    divisor = million;
    extension = "M";
  } else if (data / thousand > 1) {
    divisor = thousand;
    extension = "K";
  }

  if (divisor !== 1) {
    data = data / divisor;
  }

  if (!Number.isInteger(data)) {
    return data.toFixed(2) + extension
  }

  return data + extension;
};