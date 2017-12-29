const startPage = () => {
  const where = $('#title');
  const title = (where.width() < 700) ? "Pixel Art".split("") : "Lab: Pixel Art Maker".split("");
  let oneDiv;
  let sumWidth = 0;
  let overlap = 0.8;

  title.forEach(function(char) {
    oneDiv = $('<div class="char_div left_side">' + char + '</div>');
    where.append(oneDiv);
    sumWidth += oneDiv.width();
  });
 // style="transform: rotateY(180deg);"

  if ( sumWidth * overlap < where.width() - 20) {
    sumWidth = ((where.width() - (sumWidth * overlap)) >> 1) + 7;
  } else {
    overlap = $('.char_div').last().width();
    overlap = (where.width() - 20 - overlap) / (sumWidth - overlap);
    sumWidth = 10;
  }

  $('.char_div').each(function() {
    $(this).css('left', sumWidth);
    sumWidth += ($(this).width() * overlap) | 0;
  });

  $('.char_div').each(function(index, element) {
    setTimeout( function() {
      $(element).css('animation-name', 'turn_font1');
      $(element).removeClass('left_side');
    }, (index * 100 + 500) );
    setTimeout( function() {
      $(element).css('z-index', (title.length - index));
      $(element).css('animation-name', 'turn_font2');
    }, (index * 100 + 1500) );
    //console.log(index);
  });

  // $('.char_div:nth(0)').delay('slow').css('animation-name', 'turn_font');
  // console.log("a");
};

const setColors = () => {
  const array_colors = ['white', 'gray', 'red', 'fuchsia', 'yellow', 'lime', 'aqua', 'teal',
                        'silver', 'black', 'maroon', 'purple', 'olive', 'green', 'blue', 'navy'];

  $('#colors td').each(function(index) {
    $(this).css('background-color', array_colors[index]);
  });
}
