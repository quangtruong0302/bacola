module.exports = (title) => {
  if (!title) {
    return false;
  }
  if (title.length < 5) {
    return false;
  }
  return true;
};
