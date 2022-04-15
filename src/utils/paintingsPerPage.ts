const paintingsPerPage = (): number => {
  const screenWidth = window.screen.width;

  return screenWidth > 767 ? 9 : 8;
};

export default paintingsPerPage;
