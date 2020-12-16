export const px2vw = (px: number, viewport = 1920) =>
  `${(px / viewport * 100).toFixed(6)}vw`
