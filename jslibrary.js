


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
  //console.log(cell + '  ' +  cell.id );
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


// TODO: point(x,y) or point(cell)
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

// TODO: two Points and array to remember colors before
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
  //console.log('przed mazaniem  ' + startCell + '  ' + stopCell);
  if (this.set) {
    this.eraseDraw();
  }
  this.set = false;
  //console.log('po mazaniu  ' + startCell + '  ' + stopCell);
  if (startCell != -1) {
    this.start.x = getW(startCell);
    this.start.y = getH(startCell);
  }
  //console.log('pomiedzy  ' + startCell + '  ' + stopCell);
  if (stopCell != -1) {
    this.stop.x = getW(stopCell);
    this.stop.y = getH(stopCell);
  }
  //console.log('przed rysowaniem  ' + startCell + '  ' + stopCell);
  this.eraseDraw();
  //console.log('po rusowaniu  ' + startCell + '  ' + stopCell);
  this.set = true;
};
// TODO: decoding next points and drawing or smearing
Line.prototype.eraseDraw = function() {
  //console.log( this.set );
  // only one point
  if (this.start.x == this.stop.x && this.start.y == this.stop.y ) {
    const color = (this.set) ? this.colors[0] : $('#colorPicker').val();
    this.colors[0] = this.start.getSetColor(color);
    //console.log('po jednym punkcie');
  } else {
  // two points or more
    //console.log('wiecej punktow');
    const dysX = (this.stop.x - this.start.x > 0) ? this.stop.x - this.start.x : this.start.x - this.stop.x;
    const dysY = (this.stop.y - this.start.y > 0) ? this.stop.y - this.start.y : this.start.y - this.stop.y;
    const moreX = dysX >= dysY;
    const startLess = (moreX) ? (this.start.x < this.stop.x) : (this.start.y < this.stop.y);
    const x1 = (startLess) ? this.start.x : this.stop.x;
    const x2 = (startLess) ? this.stop.x : this.start.x;
    const y1 = (startLess) ? this.start.y : this.stop.y;
    const y2 = (startLess) ? this.stop.y : this.start.y;
    const plus = (moreX) ? (y2 > y1) : (x2 > x1);
    //console.log(startLess + '   ' + plus);
    let color;
    //console.log(this.start.toString());
    if (dysX < 2 && dysY < 2){
    // only start and stop
      color = (this.set) ? this.colors[0] : $('#colorPicker').val();
      this.colors[0] = this.start.getSetColor(color);
      color = (this.set) ? this.colors[1] : $('#colorPicker').val();
      this.colors[1] = this.stop.getSetColor(color);
    } else {
    // line
      let point = new Point();
      let x, y;
      if (dysX == 0 || dysY == 0) {
      // vertical or horizontal
        const vert = (dysX == 0);
        for (let i = 0; i <= ((vert) ? dysY : dysX); i++) {
          x = x1 + ((vert) ? 0 : i);
          y = y1 + ((vert) ? i : 0);
          point.setXY(x, y);
          //console.log(point.toString() + '  ' + x + '  ' + y + '  ' + i);
          color = (this.set) ? this.colors[i] : $('#colorPicker').val();
          this.colors[i] = point.getSetColor(color);
        }
      } else if (dysX == dysY) {
      // aslant
        for ( let i = 0; i <= dysX; i++) {
          x = x1 + i;
          y = y1 + ((plus) ? i : -i);
          point.setXY(x, y);
          //console.log(x + '  ' + y + '  ' + i + '   gl=' + gl + '   dl=' + dl);
          color = (this.set) ? this.colors[i] : $('#colorPicker').val();
          this.colors[i] = point.getSetColor(color);
        }
      } else {
      // free lines
        //const flat = (dysY < dysX);
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
