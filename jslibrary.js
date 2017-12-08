


// TODO: supporting function for makeGrid
// adding leading zeros to number to build id rows and cells
const add0 = (number) => {
  return ((number < 10 )?'00':(number < 100)?'0' : '') + number.toString();
};

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


// TODO: point(x,y)
const Point = function () {
  this.x = 0;
  this.y = 0;
};
Point.prototype.getX = function() {
  return this.x;
};
Point.prototype.getY = function() {
  return this.y;
};
Point.prototype.setX = function(x) {
  this.x = x;
};
Point.prototype.setY = function(x) {
  this.y = y;
};
Point.prototype.set = function(cell) {
  this.x = getW(cell);
  this.y = getH(cell);
};
Point.prototype.get = function() {
  console.log(add0(this.y));
  return $('#r' + add0(this.y) + 'c' + add0(this.x));
}
Point.prototype.getSetColor = function(color) {
  let cell = this.get();
  let back = $(cell).css('background-color');
  $(cell).css('background-color', color);
  return back;
}

// TODO: two Point and array colors before
const Line = function () {
  this.start = new Point();
  this.stop = new Point();
  this.colors = [];
  this.set = false;
};

// TODO:
Line.prototype.drawLine = function(startCell, stopCell) {
  if (this.set) {
    this.eraseDraw();
  }
  if (startCell != -1) {
    this.start.x = getW(startCell);
    this.start.y = getH(startCell);
  }
  if (stopCell != -1) {
    this.stop.x = getW(stopCell);
    this.stop.y = getH(startCell);
  }
  console.log('tutaj');
  this.eraseDraw();
  this.set = true;
};
// TODO:
Line.prototype.eraseDraw = function() {
  //console.log( this.set );


  if (this.set) {
    // mazanie

  } else {
    // rysowanie
  }
  if (this.start.x == this.stop.x && this.start.y == this.stop.y ) {
    let c = (this.set) ? this.color[0] : $('#colorPicker').val();
    this.colors[0] = this.start.getSetColor(c);
  }



};
