(function () {
  var STYLE_ID = 'the-switch-board-dark-mode-style';
  var existing = document.getElementById(STYLE_ID);

  if (existing) {
    existing.remove();
    return;
  }

  var style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = [
    'html { filter: invert(1) hue-rotate(180deg); color-scheme: dark; }',
    'img, video, iframe { filter: invert(1) hue-rotate(-180deg); }',
  ].join('\n');

  document.documentElement.appendChild(style);
})();
