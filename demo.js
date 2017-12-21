const startPage = () => {
  const title = ['L','a','b',':',' ','P','i','x','e','l',' ','A','r','t',' ','M','a','k','e','r'];
  const where = $('#title');
  let oneDiv;


  title.forEach(function(char, index) {
    oneDiv = $('<div class="char_div">' + char + '</div>');
    where.append(oneDiv);
    // oneDiv.css('left', sumWidth);
    // console.log(sumWidth + "  " + (oneDiv.width() | 0) + "  " + (oneDiv.width()));
    // sumWidth += oneDiv.width() | 0;
  });

  setTimeout(setDystans,500);

};

const setDystans = () => {
  let sumWidth = 50;

  $('.char_div').each(function() {
    $(this).css('left', sumWidth);
    console.log(sumWidth + "  " + ($(this).width() | 0) + "  " + ($(this).width()));
    sumWidth += $(this).width() | 0;
  });

};
