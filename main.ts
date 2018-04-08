import * as $ from 'jquery';

$('h1').css('color', 'red');

(async () => {
  const response = await fetch('http://localhost:3003');
  const text = await response.text();
  console.log(text);
})();
