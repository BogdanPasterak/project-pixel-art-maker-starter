// TODO: supporting function for makeGrid
// adding leading zeros to number to build id rows and cells
const add0 = (number) => {
  return ((number < 10 )?'00':(number < 100)?'0' : '') + number.toString();
};

// TODO: Several auxiliary functions for handling canvas cells
// get index horizontal of cell from itself id
const getW = (cell) => {
  return parseInt( $(cell)[0].id.substr(5, 3) );
};

//  get index vertical of cell from itself id
const getH = (cell) => {
  return parseInt( $(cell)[0].id.substr(1, 3) );
};

// get color
const getColorPixel = (cell) => {
  return $(cell).css('background-color');
};

// set color
const setColorPixel = (cell) => {
  $(cell).css('background-color', $('#colorPicker').val());
};

// get and set color
const getSetColorPixel = (cell) => {
  let colorP = getColorPixel(cell);
  setColorPixel(cell);
  return colorP;
}


// TODO: A point object and a chain of function prototypes for it
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
Point.prototype.setY = function(y) {
  this.y = y;
};
Point.prototype.setXY = function(x, y) {
  this.x = x;
  this.y = y;
};
Point.prototype.set = function(cell) {
  this.x = getW(cell);
  this.y = getH(cell);
};
Point.prototype.get = function() {
  return $('#r' + add0(this.y) + 'c' + add0(this.x));
};
Point.prototype.getSetColor = function(color) {
  let cell = this.get();
  let back = $(cell).css('background-color');
  $(cell).css('background-color', color);
  return back;
};
Point.prototype.toString = function() {
  return 'Point={ cell.id="' + $(this.get())[0].id + '"  x=' + this.x + '  y=' + this.y + '} ';
};
Point.prototype.equals = function(p2) {
  return (p2 instanceof Point && this.x === p2.x && this.y === p2.y);
};
Point.prototype.copy = function(p2) {
  this.x = p2.getX();
  this.y = p2.getY();
};


// TODO: An object for drawing figures based on two points
// two Points and array to remember colors before
// set - boolean - drawn and remembered colors before
const Line = function () {
  this.start = new Point();
  this.stop = new Point();
  this.colors = [];
  this.set = false;
};

Line.prototype.toString = function() {
  return 'Line={\n\t' + this.start.toString() + '\n\t' + this.stop.toString() + '\n\tBoolean set=' +
          this.set + '  Array colors length=' + this.colors.length + '\n}';
};

// TODO: draws lines in two stages, erase if she was already
// and paints until the new end
Line.prototype.drawLine = function(startCell, stopCell) {
  // if the object was drawn, it is the first to swab it
  if (this.set) {
    this.eraseDraw();
  }
  this.set = false;
  // set new points
  if (startCell != -1) {
    this.start.x = getW(startCell);
    this.start.y = getH(startCell);
  }
  if (stopCell != -1) {
    this.stop.x = getW(stopCell);
    this.stop.y = getH(stopCell);
  }
  // and draw
  this.eraseDraw();
  this.set = true;
};

// TODO: decoding next points and drawing or smearing
Line.prototype.eraseDraw = function() {
  // only one point all mode
  if (this.start.equals(this.stop)) {
    let color = (this.set) ? this.colors[0] : $('#colorPicker').val();
    this.colors[0] = this.start.getSetColor(color);
  } else {
  // two points or more
    let point = new Point();
    const dysX = (this.stop.x - this.start.x > 0) ? this.stop.x - this.start.x : this.start.x - this.stop.x;
    const dysY = (this.stop.y - this.start.y > 0) ? this.stop.y - this.start.y : this.start.y - this.stop.y;
    let color;
    if (dysX < 2 && dysY < 2){
    // only start and stop , all mode, two neighboring points
      color = (this.set) ? this.colors[0] : $('#colorPicker').val();
      this.colors[0] = this.start.getSetColor(color);
      color = (this.set) ? this.colors[1] : $('#colorPicker').val();
      this.colors[1] = this.stop.getSetColor(color);
      if ((mode === 'rect' || mode ==='circle') && dysX === dysY ) {  //dysX == dysY == 1
      // if rect or circle and cross -> two more points
        point.setXY(this.start.x, this.stop.y);
        color = (this.set) ? this.colors[2] : $('#colorPicker').val();
        this.colors[2] = point.getSetColor(color);
        point.setXY(this.stop.x, this.start.y);
        color = (this.set) ? this.colors[3] : $('#colorPicker').val();
        this.colors[3] = point.getSetColor(color);
      }
    } else {
    // if the distance is greater
      // several auxiliary fixed and variable
      const moreX = dysX >= dysY;
      const startLess = (moreX) ? (this.start.x < this.stop.x) : (this.start.y < this.stop.y);
      const x1 = (startLess) ? this.start.x : this.stop.x;
      const x2 = (startLess) ? this.stop.x : this.start.x;
      const y1 = (startLess) ? this.start.y : this.stop.y;
      const y2 = (startLess) ? this.stop.y : this.start.y;
      const plus = (moreX) ? (y2 > y1) : (x2 > x1);
      let x, y;
      //  Circle drawing procedure
      // calculation for 1/8 and copying with the change of sign and position 8 times
      if (mode === 'circle') {
        const r2 = dysX * dysX + dysY * dysY;
        //console.log(r2);
        let j = 0;
        x = Math.round(Math.sqrt(r2));
        point.setXY(this.start.x + x, this.start.y);
        color = (this.set) ? this.colors[j] : $('#colorPicker').val();
        this.colors[j] = point.getSetColor(color);
        j++;
        point.setXY(this.start.x - x, this.start.y);
        color = (this.set) ? this.colors[j] : $('#colorPicker').val();
        this.colors[j] = point.getSetColor(color);
        j++;
        point.setXY(this.start.x, this.start.y + x);
        color = (this.set) ? this.colors[j] : $('#colorPicker').val();
        this.colors[j] = point.getSetColor(color);
        j++;
        point.setXY(this.start.x, this.start.y - x);
        color = (this.set) ? this.colors[j] : $('#colorPicker').val();
        this.colors[j] = point.getSetColor(color);
        j++;
        x = 1;
        do {
          y = Math.round(Math.sqrt(r2 - x * x));

          point.setXY(this.start.x + x, this.start.y + y);
          color = (this.set) ? this.colors[j] : $('#colorPicker').val();
          this.colors[j] = point.getSetColor(color);
          j++;
          if (x !== y) {
            point.setXY(this.start.x + y, this.start.y + x);
            color = (this.set) ? this.colors[j] : $('#colorPicker').val();
            this.colors[j] = point.getSetColor(color);
            j++;
          }
          point.setXY(this.start.x - x, this.start.y - y);
          color = (this.set) ? this.colors[j] : $('#colorPicker').val();
          this.colors[j] = point.getSetColor(color);
          j++;
          if (x !== y && x > 0) {
            point.setXY(this.start.x - y, this.start.y - x);
            color = (this.set) ? this.colors[j] : $('#colorPicker').val();
            this.colors[j] = point.getSetColor(color);
            j++;
          }
          point.setXY(this.start.x - x, this.start.y + y);
          color = (this.set) ? this.colors[j] : $('#colorPicker').val();
          this.colors[j] = point.getSetColor(color);
          j++;
          if (x !== y) {
            point.setXY(this.start.x - y, this.start.y + x);
            color = (this.set) ? this.colors[j] : $('#colorPicker').val();
            this.colors[j] = point.getSetColor(color);
            j++;
          }
          point.setXY(this.start.x + x, this.start.y - y);
          color = (this.set) ? this.colors[j] : $('#colorPicker').val();
          this.colors[j] = point.getSetColor(color);
          j++;
          if (x !== y && x > 0) {
            point.setXY(this.start.x + y, this.start.y - x);
            color = (this.set) ? this.colors[j] : $('#colorPicker').val();
            this.colors[j] = point.getSetColor(color);
            j++;
          }
          x++;
        } while (x < y);

      // if not, check whether it is a horizontal or vertical line
      } else if (dysX == 0 || dysY == 0) {
        const vert = (dysX == 0);
        for (let i = 0; i <= ((vert) ? dysY : dysX); i++) {
          x = x1 + ((vert) ? 0 : i);
          y = y1 + ((vert) ? i : 0);
          point.setXY(x, y);
          color = (this.set) ? this.colors[i] : $('#colorPicker').val();
          this.colors[i] = point.getSetColor(color);
        }
      // if rectangle 4 straight lines
      } else if (mode === 'rect') {
        //console.log('rect');
        const xl = (this.start.x < this.stop.x) ? this.start.x: this.stop.x;
        const xm = (this.start.x < this.stop.x) ? this.stop.x: this.start.x;
        const yl = (this.start.y < this.stop.y) ? this.start.y: this.stop.y;
        const ym = (this.start.y < this.stop.y) ? this.stop.y: this.start.y;
        let j = 0;
        for (let i = 0; i <= dysX; i++) {
          point.setXY(xl + i, yl);
          //console.log(point.toString() + '  i=' + i);
          color = (this.set) ? this.colors[j] : $('#colorPicker').val();
          this.colors[j] = point.getSetColor(color);
          j++;
          point.setY(ym);
          color = (this.set) ? this.colors[j] : $('#colorPicker').val();
          this.colors[j] = point.getSetColor(color);
          j++;
        }
        for (let i = 1; i < dysY; i++) {
          point.setXY(xl, yl + i);
          color = (this.set) ? this.colors[j] : $('#colorPicker').val();
          this.colors[j] = point.getSetColor(color);
          j++;
          point.setX(xm);
          color = (this.set) ? this.colors[j] : $('#colorPicker').val();
          this.colors[j] = point.getSetColor(color);
          j++;
        }

      } else if (dysX == dysY) {
      // 45 degrees line
        for ( let i = 0; i <= dysX; i++) {
          x = x1 + i;
          y = y1 + ((plus) ? i : -i);
          point.setXY(x, y);
          //console.log(x + '  ' + y + '  ' + i + '   gl=' + gl + '   dl=' + dl);
          color = (this.set) ? this.colors[i] : $('#colorPicker').val();
          this.colors[i] = point.getSetColor(color);
        }
      } else {
      // diagonal lines
      // along the longer coordinate, calculate the second coordinate
      // only for half line, second half drawn mirror
        let g = (moreX) ? dysY + 1: dysX + 1;
        let d = (moreX) ? dysX : dysY;
        let gl = 0;
        let dl = 0;
        let j = 0;
        const max = ((moreX) ? dysX : dysY) >> 1; // division by 2 without rest
        const middle = (max << 1 == ((moreX) ? dysX : dysY));
        //console.log('start loop' + ' g=' + g + ' d=' + d);
        for (let i = 0; i <= max; i++) {
          //j = i << 1;
          if (gl >= d) {
            gl -= d;
            dl++;
          }
          gl += g;
          x = x1 + ((moreX) ? i : ((plus) ? dl: -dl));
          y = y1 + ((moreX) ? ((plus) ? dl: -dl) : i);
          point.setXY(x, y);
          //console.log(x + '  ' + y + '  ' + i + '   gl=' + gl + '   dl=' + dl);
          color = (this.set) ? this.colors[j] : $('#colorPicker').val();
          this.colors[j] = point.getSetColor(color);
          // symmetrical half
          j++;
          if (i != max || ! middle) {
            x = x2 - ((moreX) ? i : ((plus) ? dl: -dl));
            y = y2 - ((moreX) ? ((plus) ? dl: -dl) : i);
            point.setXY(x, y);
            //console.log(x + '  ' + y + '  ' + i + '   gl=' + gl + '   dl=' + dl);
            color = (this.set) ? this.colors[j] : $('#colorPicker').val();
            this.colors[j] = point.getSetColor(color);
          }
          j++;
        }
      }
    }
  }
};

// TODO: filling the area with a uniform color
// recursive procedure, checks whether this point should be painted over,
// she paints and calls herself to 4 neighboring points
const fillArea = (point, colorBase) => {
  if (colorBase != getColorPixel(point.get())) {
    return;
  }
  let x = point.getX();
  let y = point.getY();
  if (x < 0 || y < 0 || x >= $('#input_width').val() || y >= $('#input_height').val()) {
    return;
  }
  setColorPixel(point.get());
  point.setY(y - 1);
  fillArea(point, colorBase);
  point.setY(y + 1);
  fillArea(point, colorBase);
  point.setY(y);
  point.setX(x - 1);
  fillArea(point, colorBase);
  point.setX(x + 1);
  fillArea(point, colorBase);

  point.setY(y);
  point.setX(x);
};

// TODO: paints a 5x5 square white
const clearRect = (point) => {
  let x = point.getX();
  let y = point.getY();
  for (let col = x - 2; col <= x + 2; col++) {
    point.setX(col);
    for (let row = y - 2; row <= y +2; row++) {
      point.setY(row);
      $(point.get()).css('background-color', 'white');
    }
  }

  point.setY(y);
  point.setX(x);
};
