const parseDomain = (data = []) => {
  try {
    return data[1];
  } catch (e) {
    return null;
  }
};

module.exports = {
  parseDomain,
};
