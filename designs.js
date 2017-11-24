// Global variable
let selectColor;
//let widthGrid = 0, heightGrid = 0;

// TODO: run once until DOM is ready
$( function () {
  // inicialization variable
  selectColor = $('#colorPicker').val();

  // TODO: bind submit event to form and cancel submit action
  $('#sizePicker').submit( function (event) {
    makeGrid();
    event.preventDefault();
  });

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
          nodeCell = $('<td id=\"' + idCell + '\"></td>');
          nodeRow.append(nodeCell);
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

const validateSize = (sender) => {
  console.log('zmiana ' + $(sender).attr('id'));
  //console.log( $('#div_canvas').position().top );
  //console.log( $( document ).height() );
  makeGrid();
};

// TODO: adding leading zeros
const add0 = (number) => {
  return ( ( number < 10 ) ? '00' : ( number < 100 ) ? '0' : '' ) + number.toString();
};
