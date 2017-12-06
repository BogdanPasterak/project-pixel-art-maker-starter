




// TODO: get index horizontal of cell from itself id
const getW = (cell) => {
  return parseInt( $(cell)[0].id.substr(5, 3) );
};

// TODO: get index vertical of cell from itself id
const getH = (cell) => {
  return parseInt( $(cell)[0].id.substr(1, 3) );
};


// TODO:
const getColorPixel = (cell) => {
  return $(cell).css('background-color');
};

// TODO:
const setColorPixel = (cell) => {
  $(cell).css('background-color', $('#colorPicker').val());
};

// TODO:
const getSetColorPixel = (cell) => {
  let colorP = getColorPixel(cell);
  setColorPixel(cell);
  return colorP;
}
