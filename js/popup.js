let enable = document.getElementById('enable');
let disable = document.getElementById('disable');
let state = document.getElementById('state');
let options = document.getElementById('options');

chrome.storage.sync.get('state', function (data) {
    let currentState = data['state'];
    if (currentState != true) {
        state.innerHTML = "disabled.";
    } else {
        state.innerHTML = "enabled.";
    }
    // state.innerHTML = testing;
});

enable.onclick = function (element) {
    chrome.storage.sync.set({'state': true}, function() {
        alert('Refresh page to activate.');
    });
};

disable.onclick = function (element) {
    chrome.storage.sync.set({ 'state': false }, function () {
        alert('Refresh page to disable.');
    });
};

options.onclick = function() {
    chrome.runtime.openOptionsPage();
}