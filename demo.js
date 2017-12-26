const startPage = () => {
  const where = $('#title');
  const title = (where.width() < 700) ? "Pixel Art".split("") : "Lab: Pixel Art Maker".split("");
  let oneDiv;
  let sumWidth = 0;
  let overlap = 1;

  title.forEach(function(char) {
    oneDiv = $('<div class="char_div">' + char + '</div>');
    where.append(oneDiv);
    sumWidth += oneDiv.width();
  });

  if ( sumWidth < where.width() - 20) {
    sumWidth = ((where.width() - sumWidth) >> 1) + 7;
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
      $(element).css('animation-name', 'turn_font');
    }, ((title.length - index) * 100) );
    console.log(index);
  });

  // $('.char_div:nth(0)').delay('slow').css('animation-name', 'turn_font');
  // console.log("a");
};

const turnFont = () => {
}
