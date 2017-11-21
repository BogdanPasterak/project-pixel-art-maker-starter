// Global variable
let selectColor;
let widthGrid = 0, heightGrid = 0;

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

  // TODO: event
  $('#colorPicker').change( function () {
    selectColor = $(this).val();
  });

})

// TODO: When size is submitted by the user, call makeGrid()
// The grid is not built from scratch
// replenishes missing pieces or removes unnecessary
const makeGrid = () => {
  // local variable length i width chosen by user and 3 ancillary
  let height = $('#input_height').val();
  let width = $('#input_width').val();
  // idRow 'r003' and idCell 'r002c005'
  let idRow, nodeRow, idCell;
  // local constans
  const target = $('#pixel_canvas');
  const maxRow = (height > heightGrid) ? height : heightGrid;
  const maxCol = (width > widthGrid) ? width : widthGrid;

  // loop for rows
  for (let row = 0; row < maxRow; row += 1) {
    idRow = 'r' + ( ( row < 10 ) ? '00' : ( row < 100 ) ? '0' : '' )  + row;
    if ( $('#' + idRow).length ) {
      // if the row exists
      nodeRow = $('#' + idRow);
      if ( row < height ) {
        // if the row continues to exist check columns
        for (let col = 0; col < maxCol; col +=1) {
          // add td node to new row
          idCell = idRow + 'c' + ( ( col < 10 ) ? '00' : ( col < 100 ) ? '0' : '' )  + col;
          if ( $('#' + idCell).length ) {
            // if the cell exists
            if ( col >= width ) {
              // and shouldn't be
              $('#' + idCell).remove();
            }
          } else if ( col < width ) {
            // if the row not exists should be create and add new node
            nodeRow.append( $('<td id=\"' + idCell + '\"></td>') );
          }
        }
      } else {
        // delete the row
        nodeRow.remove();
        heightGrid -= 1;
      }
    } else {
      // if the row not exists create and add new node
      nodeRow = $('<tr id=\"' + idRow + '\"></tr>');
      for (let col = 0; col < width; col +=1) {
        // add cells node to new row
        idCell = idRow + 'c' + ( ( col < 10 ) ? '00' : ( col < 100 ) ? '0' : '' )  + col;
        nodeRow.append( $('<td id=\"' + idCell + '\"></td>') );
      }
      target.append(nodeRow);
      heightGrid += 1;
      //console.log('adding ' + nodeRow);
    }
  }

  widthGrid = width;
  //heightGrid = height;
  //console.log( heightGrid + '  ' + widthGrid );
};
