// TODO: This script reads google fonts and then starts my procedure startPage() from the js/demo.js script

WebFontConfig = { google: { families: [ 'Monoton' ] } , active : function() { startPage(); } };
(function() {
  var wf = document.createElement('script');
  wf.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
  wf.type = 'text/javascript';
  wf.async = 'true';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(wf, s);
})();
