chrome.contextMenus.create({
    id: "switch-board",
    title: "Turn off the lights",
    contexts: ["all"]
});
chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (tab) {
        let code = [
            "var style = document.createElement('STYLE');",
            "style.type = 'text/css';",
            "style.appendChild(document.createTextNode('" +
            "html { filter: invert(1) hue-rotate(180deg);}" +
            "img { filter: invert(1) hue-rotate(-180deg);}" +
            "iframe { filter: invert(1) hue-rotate(-180deg);}'));",
            "document.getElementsByTagName('html')[0].appendChild(style);"
        ].join("\n");
        on = false;
        chrome.tabs.executeScript(tab.id, { code });
    }
});