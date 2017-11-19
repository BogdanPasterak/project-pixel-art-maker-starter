// Select color input
// Select size input

// When size is submitted by the user, call makeGrid()
document.getElementById('sizePicker').setAttribute('onsubmit','return makeGrid()');

function makeGrid() {
  let height = document.getElementById('input_height').value;
  let width = document.getElementById('input_width').value;
  const target = document.getElementById('pixel_canvas');
  let tr, td

  target.innerHTML = ('');
  for( let row = 0; row < height; row += 1){
    tr = document.createElement('tr');
    for( let col = 0; col < width; col += 1){
      td = document.createElement('td');
      tr.appendChild(td);
    }
    target.appendChild(tr);
  }

  console.log( height + '  ' + width );
  return false;
}
