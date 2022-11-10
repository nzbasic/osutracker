export function fmtInt(num: number) {
  return new Intl.NumberFormat("en").format(Math.floor(num));
}

export function fmtFloat(num: number, dp: number) {
  return num.toFixed(dp);
}

export function fmtDate(date: Date) {
  return date.toLocaleDateString();
}

export function fmtBeatmapTitle(title: string) {
  if (title.length > 50) {
    return title.substring(0, 47) + "...";
  }
  return title;
}
