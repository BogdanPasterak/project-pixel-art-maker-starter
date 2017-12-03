// Global variable
let selectColor;
//let widthGrid = 0, heightGrid = 0;

// TODO: run once until DOM is ready
$( function () {
  // inicialization variable
  selectColor = $('#colorPicker').val();

/* no more form and submit
  // TODO: bind submit event to form and cancel submit action
  $('#sizePicker').submit( function (event) {
    makeGrid();
    event.preventDefault();
  });
*/

  // TODO: adding event delegation to table on all cell
  $('#pixel_canvas').on('click', 'td', function () {
    //console.log( $(this).attr('id') );
    $(this).css('background-color', selectColor);
  });

  // TODO: event for change color
  $('#colorPicker').change( function () {
    selectColor = $(this).val();
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

  // initial drawing grid
  validateSize($('#input_size'));

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
        nodeRow = $('<tr id=\"' + idRow + '\"></tr>');
        nodeRow.css('height', parseInt(size) + 1);
        target.append(nodeRow);
      // } else if ( nodeRow.css('height') != parseInt(size) + 1) {
      //   // corect size if need
      //   nodeRow.css('height', parseInt(size) + 1);
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
          nodeCell = $('<td id=\"' + idCell + '\"></td>');
          nodeCell.css('width', size);
          nodeRow.append(nodeCell);
        // } else if ( nodeCell.css('width') != size ) {
        //   // corect size
        //   nodeCell.css('width', size);
        }
        col += 1;
        idCell = idRow + 'c' + add0(col);
        nodeCell = $('#' + idCell);
      } while ( col < width || nodeCell.length );
    }
    //console.log(idRow);
    row += 1;
    idRow = 'r' + add0(row);
    nodeRow = $('#' + idRow);
  } while ( row < height || nodeRow.length );
};

// TODO: supporting function for makeGrid
// adding leading zeros to number to build id rows and cells
const add0 = (number) => {
  return ((number < 10 )?'00':(number < 100)?'0' : '') + number.toString();
};

// TODO: validation of table dimensions
const validateSize = (sender) => {
  // constans variable for calculation
  let size = parseInt($('#input_size').val());
  let width = parseInt($('#input_width').val());
  let height = parseInt($('#input_height').val());
  const divW = parseInt($('#div_canvas').css('width'));
  const divH = parseInt($('#div_canvas').css('height'));

  // if imput size event
  if ( $(sender).attr('id') == 'input_size' ) {
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
    $('tr').css('height', size + 1); // one more for border
    $('td').css('width', size);

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
        $('tr').css('height', size + 1);
        $('td').css('width', size);
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
        $('tr').css('height', size + 1);
        $('td').css('width', size);
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

// TODO:
const getW = (cell) => {
  return parseInt( $(cell)[0].id.substr(5, 3) );
};

// TODO:
const getH = (cell) => {
  return parseInt( $(cell)[0].id.substr(1, 3) );
};
