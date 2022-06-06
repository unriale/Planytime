const ColorIndex = (colorTypes) => {
  // transform array of colors into one object (to be used as an index for O(1) lookup)
  const colorIndex = {};
  const colorKeys = Object.keys(colorTypes[0]).filter((key) => key !== "id"); // ['color']
  for (const color of colorTypes) {
    const colorData = {};
    colorKeys.forEach((key) => {
      colorData[key] = color[key];
    });
    colorIndex[color.id] = colorData;
  }
  return colorIndex; // {1: {color: '#123123'}, 2:{...}}
};

export default ColorIndex;
