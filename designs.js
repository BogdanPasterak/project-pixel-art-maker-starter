// Select color input
var selectColor;
var widthGrid = 0, heightGrid = 0;
// Select size input
$( function () {
  selectColor = $('#colorPicker').val();
  $('#sizePicker').submit(function ( event ) {
    makeGrid();
    event.preventDefault();
  });

})

// When size is submitted by the user, call makeGrid()
const makeGrid = () => {
  let height = $('#input_height').val();
  let width = $('#input_width').val();
  const target = $('#pixel_canvas');
  let tr, td;
/*
  target.innerHTML = ('');
  for( let row = 0; row < height; row += 1){
    tr = document.createElement('tr');
    for( let col = 0; col < width; col += 1){
      td = document.createElement('td');
      tr.appendChild(td);
    }
    target.appendChild(tr);
  }
*/
  console.log( height + '  ' + width );
  //return false;
};
/*
$( function () {
  $('#sizePicker').attr('onsubmit','return makeGrid()');
})
*/
