const bodyLock = (value: boolean) => {
  if (value) {
    document.body.classList.add("lock");
  } else {
    document.body.classList.remove("lock");
  }
};

export default bodyLock;
