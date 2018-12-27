chrome.browserAction.setBadgeText({ 'text': '?' });
chrome.browserAction.setBadgeBackgroundColor({ 'color': "#777" });

// Check whether new version is installed
chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason == "install") {
        chrome.storage.sync.set({ 'state': false, 'rules': {'test': 'Testing'} });
        chrome.browserAction.setBadgeText({ 'text': 'off' });
        chrome.browserAction.setBadgeBackgroundColor({ 'color': "#777" });
    } else if (details.reason == "update") {
        var thisVersion = chrome.runtime.getManifest().version;
        console.log("Updated from " + details.previousVersion + " to " + thisVersion + "!");
    }
});

chrome.runtime.onStartup.addListener(function() {
    chrome.storage.sync.get('state', (data) => {
        let state = data['state'];
        if (state) {
            turnOn();
        } else {
            turnOff();
        }
    })
})

chrome.runtime.onMessage.addListener(function(request, sender) {
    if(request.state) {
        turnOn();
    } else {
        turnOff();
    }
});

function turnOn() {
    chrome.browserAction.setBadgeText({ 'text': 'on' });
    chrome.browserAction.setBadgeBackgroundColor({ 'color': '#6B459A' });
    reload();
}

function turnOff() {
    chrome.browserAction.setBadgeText({ 'text': 'off' });
    chrome.browserAction.setBadgeBackgroundColor({ 'color': "#777" });
    reload();
}

function reload() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.reload(tabs[0].id);
    });
}