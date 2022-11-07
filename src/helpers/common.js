const getStyleString = (styleObj, alterations = {}) => {
  const obj = { ...styleObj, ...alterations };
  return Object.entries(obj)
    .map(([key, value]) => `${key}: ${value}`)
    .join(';');
};

module.exports = {
  getStyleString,
};
