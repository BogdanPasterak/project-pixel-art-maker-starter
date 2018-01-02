// Global variable
//let selectColor;
//let widthGrid = 0, heightGrid = 0;
//let p = new Point();
let l = new Line();
let mode = 'draw';
let myColors = [0, 0, 0, 0, 0, 0, 0, 0];
const isTouch = ('ontouchstart' in window);

// TODO: run once until DOM is ready
$( function () {
  // inicialization variable
  //selectColor = $('#colorPicker').val();

/* no more form and submit button
  // TODO: bind submit event to form and cancel submit action
  $('#sizePicker').submit( function (event) {
    makeGrid();
    event.preventDefault();
  });
*/

  // TODO: adding event delegation to table on all cell
  $('#pixel_canvas').on('click mouseenter mouseleave mousedown mouseup', 'td', function (event) {
    event.preventDefault(); // protection against draggable
    drawPixels(this, event);
  });

  // no more this variable
  // TODO: event for change color
  $('#colorPicker').change( function () {
    //selectColor = $(this).val();
    let index = 0;
    let min = myColors[index];
    myColors.forEach(function(e, i) {
      if (e < min){
        min = e;
        index = i;
      }
    });
    // console.log(index);
    $('#' + index).css('background-color', $('#colorPicker').val());
    myColors[index]++;
  });

  $('#colors td').click(function() {
    $('#colorPicker').val(rgbToHex($(this).css('background-color')));
    if ($(this).parent().is($('#arrayColors'))) {
      myColors[$(this).attr('id')]++;
    }
  });

  // TODO: validation size of Grid
  $('input[type="number"]').change( function () {
    validateSize(this);
  });

  // TODO:
  $('#input_hold').change( function () {
    if ( $(this).is(':checked') ) {
      $('#input_size').attr('readonly', true);
      $('#input_size').css('background-color', 'lightgray');
    } else {
      $('#input_size').attr('readonly', false);
      $('#input_size').removeAttr('style');
    }
  });

  // TODO:
  $("input[type='radio'][name='mode']").change( function () {
    mode = $(this).val();
  });

  //TODO: after resize
  $(window).resize(function() {
    //console.log($(window).width());
    validateSize('RESIZE');
    startPage();
  });

  // TODO: Demo start
  //startPage();

  setColors();

  // initial drawing grid
  validateSize('RESIZE');

})

// TODO: When size is submitted by the user, call makeGrid()
// The grid is not built from scratch
// replenishes missing pieces or removes unnecessary
// existing drawing will not be erased !
const makeGrid = () => {
  // local variable length i width chosen by user and 3 ancillary
  let height = $('#input_height').val();
  let width = $('#input_width').val();
  // idRow 'r003' and idCell 'r002c005'
  let row = 0, idRow = 'r000', nodeRow = $('#r000');
  let col, idCell, nodeCell;
  // local constans
  const target = $('#pixel_canvas');
  const size = $('#input_size').val();

  // loop for rows
  do {
    // delete the over numbers row
    if ( row >= height ) {
      nodeRow.remove();
    // if it should be
    } else {
      // if the row not exists create and add new node
      if ( ! nodeRow.length ) {
        nodeRow = $('<tr id=\"' + idRow + '\" class=\"row_canvas\"></tr>');
        target.append(nodeRow);
      }
      // loop for cells
      col = 0;
      idCell = idRow + 'c000';
      nodeCell = $('#' + idCell);
      do {
        // delete the over numbers collumn
        if ( col >= width ) {
          nodeCell.remove();
        // if the cell not exists create and add new node
        } else if ( ! nodeCell.length ) {
          nodeCell = $('<td id=\"' + idCell + '\" class=\"cell_canvas\"></td>');
          nodeRow.append(nodeCell);
        }
        // sets for next cell
        col += 1;
        idCell = idRow + 'c' + add0(col);
        nodeCell = $('#' + idCell);
      } while ( col < width || nodeCell.length );
    }
    //sets for next row
    row += 1;
    idRow = 'r' + add0(row);
    nodeRow = $('#' + idRow);
  } while ( row < height || nodeRow.length );
  // resize all cell
  $('.row_canvas').css('height', parseInt(size) + 1);
  $('.cell_canvas').css('width', size);
};

// TODO: validation of table dimensions
const validateSize = (sender) => {
  // constans variable for calculation
  let size = parseInt($('#input_size').val());
  let width = parseInt($('#input_width').val());
  let height = parseInt($('#input_height').val());
  const divW = parseInt($('#div_canvas').css('width'));
  const divH = parseInt($('#div_canvas').css('height'));

  //console.log(sender)

  // start , restart validacion
  if ( sender === 'RESIZE' ) {

    if ( (size + 1) * width + 1 > divW ) {
      // try reduce size cells if not hold
      if (! $('#input_hold').is(':checked')){
        size = (((divW - 1) / width) | 0) - 1;
        if ( size < 3 ) {
          size = 3;
          width = ((divW - 1) / (size  + 1)) | 0;
          $('#input_width').val(width);
        }
        $('#input_size').val(size);
        //alert for size
      } else {
        width = ((divW - 1) / (size  + 1)) | 0;
        $('#input_width').val(width);
        //console.log("s="+size+"  w="+width+"  sum="+((size+1)*width+1));
      }
      // alert for width
    }
    if ( (size + 1) * height + 1 > divH ) {
      // try reduce size cells if not hold
      if (! $('#input_hold').is(':checked')){
        size = (((divH - 1) / height) | 0) - 1;
        if ( size < 3 ) {
          size = 3;
          height = ((divH - 1) / (size  + 1)) | 0;
          $('#input_heiiht').val(height);
        }
        $('#input_size').val(size);
        //alert for size
      } else {
        height = ((divH - 1) / (size  + 1)) | 0;
        $('#input_heiiht').val(height);
      }
      // alert for height
    }




  // if imput size event
  } else if ( $(sender).attr('id') == 'input_size' ) {
    // wrong values
    if ( size < 3 || size > 99 || isNaN(size) ) {
      if ( size < 3 ) { size = 3; }
      else if ( size > 99 ) { size = 99; }
      else { size = parseInt($('#r000c000').css('width')); } // previous value
      $(sender).val(size);
      // alert in size
    }
    // too big
    if ( (size + 1) * width + 1 > divW ) {
      size = (((divW - 1) / width) | 0) - 1; // Math.floor() but faster
      $(sender).val(size);
      // alert in width
    }
    if ( (size + 1) * height + 1 > divH ) {
      size = (((divH - 1) / height) | 0) - 1;
      $(sender).val(size);
      // alert in height
    }

  // if imput width event
  } else if ( $(sender).attr('id') == 'input_width' ) {
    if ( width < 1 || width > 999 || isNaN(width) ) {
      if ( width < 1 ) { width = 1; }
      else if ( width > 999 ) { width = 999; }
      else { width = getW($('td:last')) + 1; } // previous value
      $(sender).val(width);
      // alert in width
    }
    if ( (size + 1) * width + 1 > divW ) {
      // try reduce size cells if not hold
      if (! $('#input_hold').is(':checked')){
        size = (((divW - 1) / width) | 0) - 1;
        if ( size < 3 ) {
          size = 3;
          width = ((divW - 1) / (size  + 1)) | 0;
          $(sender).val(width);
        }
        $('#input_size').val(size);
        //alert for size
      } else {
        width = ((divW - 1) / (size  + 1)) | 0;
        $(sender).val(width);
        //console.log("s="+size+"  w="+width+"  sum="+((size+1)*width+1));
      }
      // alert for width
    }

  // if imput height event
  } else if ( $(sender).attr('id') == 'input_height' ) {
    if ( height < 1 || height > 999 || isNaN(height) ) {
      if ( height < 1 ) { height = 1; }
      else if ( height > 999 ) { height = 999; }
      else { height = getH($('td:last')) + 1; } // previous value
      $(sender).val(height);
      // alert in height
    }
    if ( (size + 1) * height + 1 > divH ) {
      // try reduce size cells if not hold
      if (! $('#input_hold').is(':checked')){
        size = (((divH - 1) / height) | 0) - 1;
        if ( size < 3 ) {
          size = 3;
          height = ((divH - 1) / (size  + 1)) | 0;
          $(sender).val(height);
        }
        $('#input_size').val(size);
        //alert for size
      } else {
        height = ((divH - 1) / (size  + 1)) | 0;
        $(sender).val(height);
      }
      // alert for height
    }
  }
  // console.log(divW + '  ' + divH + '  ' + size);
  makeGrid();
};

// TODO: main draw function
const drawPixels = (cell, e) => {
  const type = e.type;
  const btn = e.which;
  //console.log(getColorPixel(cell));
  // if (type == 'mousedown' || type == 'mouseup' ) {
  //   console.log(type + '  button=' + e.which );
  // }
  if (type == 'mousedown' && btn == 1) {
    // if (mode === 'draw' || mode === 'line' || mode === 'rect') {
      if (l.set) {
        l.drawLine(-1, cell);
      } else {
        l.drawLine(cell, cell);
      }
    // }
  }
  if (type == 'mouseenter' && btn == 1) {
    if (mode === 'draw') {
      l.drawLine(-1, cell);
      l.set = false;
      l.drawLine(cell, cell);
    } else {
      l.drawLine(-1, cell);
    }
  }
  if (type == 'mouseup' && btn == 1) {
    //console.log(l.start.x + "   " + l.stop.x );
    // if (mode === 'draw' || mode === 'line' || mode === 'rect') {
      l.set = false;
    // }
  }
  if ((type == 'mousedown' || type == 'mouseenter') && btn == 1) {
    //setColorPixel(cell);
    //console.log( $(cell).attr('id') );
    //console.log( p.getX() + '  ' + p.getY() );
  }
  // if (type == 'mouseenter') {
  //   console.log(type + '  button=' + e.which );
  // }
}
