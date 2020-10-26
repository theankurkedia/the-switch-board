chrome.contextMenus.create({
    id: "switch-board",
    title: "Turn off the lights",
    contexts: ["all"]
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (tab) {
        var code = [
            'var htmlTag = document.getElementsByTagName("html");',
            'if (htmlTag && htmlTag.length) {' +
            'htmlTag[0].style.filter = "invert(1) hue-rotate(180deg)";' +
            '}'
        ].join("\n");
        chrome.tabs.executeScript(tab.id, { code: code });
    }
});