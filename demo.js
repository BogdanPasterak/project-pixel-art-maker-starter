const startPage = () => {
  const title = ['L','a','b',':',' ','P','i','x','e','l',' ','A','r','t',' ','M','a','k','e','r'];
  const where = $('#title');

  title.forEach(function(char, index) {
    where.append(char);
  });

};
