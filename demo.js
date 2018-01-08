// TODO: Building and animation of the title.
//  Each letter is set and animated individually,
//  at the start of the document and resize.
const startPage = () => {
  const where = $('#title');
  // Two other titles depending on the place available
  const title = (where.width() < 700) ? "Pixel Art".split("") : "Lab: Pixel Art Maker".split("");
  let oneDiv;
  let sumWidth = 0;
  let overlap = 0.8;

  // clear
  where.html('');
  // setting letters outside the image and adding up the width of the string
  title.forEach(function(char) {
    oneDiv = $('<div class="char_div left_side">' + char + '</div>');
    where.append(oneDiv);
    sumWidth += oneDiv.width();
  });

  // centering the title by moving the first letter or deeper overlap
  // in sumWidth result (start position)
  if ( sumWidth * overlap < where.width() - 20) {
    sumWidth = ((where.width() - (sumWidth * overlap)) >> 1) + 7;
  } else {
    overlap = $('.char_div').last().width();
    overlap = (where.width() - 20 - overlap) / (sumWidth - overlap);
    sumWidth = 10;
  }

  // positioning letters in proportion to their width
  $('.char_div').each(function() {
    $(this).css('left', sumWidth);
    sumWidth += ($(this).width() * overlap) | 0;
  });

  // animation in two turns, between them changing the order of overlapping
  $('.char_div').each(function(index, element) {
    setTimeout( function() {
      $(element).css('animation-name', 'turn_font1');
      $(element).removeClass('left_side');
    }, (index * 100 + 500) );
    setTimeout( function() {
      $(element).css('z-index', (title.length - index));
      $(element).css('animation-name', 'turn_font2');
    }, (index * 100 + 1500) );
  });
};

// TODO: Auxiliary procedure, change of the color recording format,
//  e.g. 'rgb(255, 128, 0)' to '#ff8000'
const rgbToHex = (color) => {
  const nums = /(.*?)rgb\((\d+),\s*(\d+),\s*(\d+)\)/i.exec(color),
      r = parseInt(nums[2], 10).toString(16),
      g = parseInt(nums[3], 10).toString(16),
      b = parseInt(nums[4], 10).toString(16);
  return "#" + (r.length == 1 ? "0"+ r : r) + (g.length == 1 ? "0"+ g : g) + (b.length == 1 ? "0"+ b : b);
};

// TODO: Setting the basic color in the auxiliary palette and 8 white
//  for the individual customer's choice.
const setColors = () => {
  const array_colors = ['white', 'gray', 'red', 'fuchsia', 'yellow', 'lime', 'aqua', 'teal',
                        'silver', 'black', 'maroon', 'purple', 'olive', 'green', 'blue', 'navy',
                        'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'];

  $('#colors td').each(function(index) {
    $(this).css('background-color', array_colors[index]);
  });
};

// TODO: Blink color to confirm or deny the validation of the entered value
const blink = (which, color) => {

  $(which).css('animation-name', 'blink_' + color);
  setTimeout( function() {
    $(which).removeAttr('style');
  }, (3000) );

};
