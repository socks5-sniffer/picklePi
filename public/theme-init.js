// Runs synchronously before any CSS/JS to prevent a theme flash.
// Kept as an external script so the CSP can stay `script-src 'self'`
// with no inline-script hash to maintain.
try {
  var t = localStorage.getItem('picklePi-theme');
  if (t) document.documentElement.setAttribute('data-theme', t);
} catch (e) {}
