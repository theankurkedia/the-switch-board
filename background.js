chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    id: 'switch-board',
    title: 'Switch mode',
    contexts: ['all'],
  });
});

function toggleMode(tab) {
  if (!tab || tab.id == null) {
    console.warn('[SwitchBoard] No valid tab to inject into.');
    return;
  }
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js'],
  }).catch(function (err) {
    console.warn('[SwitchBoard] Script injection failed:', err.message);
  });
}

chrome.action.onClicked.addListener(function (tab) {
  toggleMode(tab);
});

chrome.commands.onCommand.addListener(function (command, tab) {
  if (command === 'switch') {
    if (tab && tab.id != null) {
      toggleMode(tab);
    }
  }
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (tab && info.menuItemId === 'switch-board') {
    toggleMode(tab);
  }
});
