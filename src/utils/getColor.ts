export const getColor = (color: string): string => {
  return window.getComputedStyle(document.documentElement).getPropertyValue(color);
};
