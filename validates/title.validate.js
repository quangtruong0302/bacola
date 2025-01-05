module.exports = (title) => {
  if (!title) {
    return false;
  }
  if (title.length < 5) {
    return false;
  }
  const regex = /^[\p{L}\p{M}\s]+$/u;
  if (!regex.test(title)) {
    return false;
  }
  return true;
};
