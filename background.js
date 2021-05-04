chrome.contextMenus.create({
  id: 'switch-board',
  title: 'Switch mode',
  contexts: ['all'],
});

function toggleMode(tab) {
  let code = [
    "var style = document.getElementById('the-switch-board-dark-mode-style');",
    'if(style){',
    'style.remove();',
    '}',
    'else{',
    "style = document.createElement('STYLE');",
    "style.setAttribute('id','the-switch-board-dark-mode-style')",
    "style.type = 'text/css';",
    "style.appendChild(document.createTextNode('" +
      'html { filter: invert(1) hue-rotate(180deg); color-scheme: dark;}' +
      ' img { filter: invert(1) hue-rotate(-180deg);}' +
      " iframe { filter: invert(1) hue-rotate(-180deg);}'));",
    "document.getElementsByTagName('html')[0].appendChild(style);",
    '}',
  ].join('\n');
  chrome.tabs.executeScript(tab.id, { code });
}

function onCommandListener(command, tab) {
  if (command === 'switch') {
    console.log('Switch command entered');
    if (tab) {
      toggleMode(tab);
    }
  }
}

function registerCommands() {
  chrome.commands.onCommand.addListener(onCommandListener);
}

function registerContextMenuItem() {
  chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (tab && info.menuItemId === 'switch-board') {
      toggleMode(tab);
    }
  });
}

registerCommands();
registerContextMenuItem();
