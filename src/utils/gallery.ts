export const paintingsPerPage = (): number => {
  const screenWidth = window.screen.width;

  return screenWidth > 768 ? 9 : 8;
};
