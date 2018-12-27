let clear = document.getElementById("clearRules");
let save = document.getElementById("saveRules");
let remove = document.getElementsByClassName("delete");
let add = document.getElementById("addRule");
let cancel = document.getElementById("cancel");


chrome.storage.sync.get('rules', function (data) {
    let savedRules = data['rules'];
    console.log(savedRules);
    let i = 1;
    for (let key in savedRules) {
        if (i > 1) {
            buildFields();
        }
        let rules = savedRules[key];
        document.getElementById('string' + i).value = rules.join("|");
        document.getElementById('replace' + i).value = key;
        i += 1;
    }
});

clear.addEventListener('click', function() {
    if (confirm('Warning: This will permanently delete all of your saved filters.\nDo you wish to continue?')) {
        chrome.storage.sync.set({ state: false, rules: {} });
        location.reload();
    } else {
        // Do nothing!
    }
})

save.addEventListener('click', function() {
    let objectResponse = {};

    let rules = document.getElementsByClassName('rule');
    for (var rule of rules) {
        var elements = getStringsReplace(rule);
        let stringArray = elements.string.value.split('|');
        let set = new Set(stringArray);
        objectResponse[elements.replace.value] = [...set];
    }

    chrome.storage.sync.set({rules: objectResponse});
    location.reload();
    console.log(objectResponse);
})

for (let butt of remove) {
    createEventListeners(butt);
};

add.addEventListener('click', function() {
    buildFields();
})

cancel.addEventListener('click', () => {
    location.reload();
})

function buildFields() {
    let rules = document.getElementsByClassName('rule');
    let rule = rules[0];
    var container = document.getElementsByClassName('container')[0];
    var newRule = rule.cloneNode(true);

    var elements = getStringsReplace(newRule);

    elements.string.id = 'string' + (rules.length + 1);
    elements.replace.id = 'replace' + (rules.length +1);
    elements.string.value = '';
    elements.replace.value = '';

    container.appendChild(newRule);
    createEventListeners(newRule.getElementsByClassName('delete')[0]);
    console.log(remove);
}

function getStringsReplace(element) {
    var string = element.getElementsByClassName('strings')[0];
    var replace = element.getElementsByClassName('replace')[0];
    return {string: string, replace: replace}
}

function clearFields(elements) {
    elements.string.value = '';
    elements.replace.value = '';
}

function createEventListeners(button) {
    button.addEventListener('click', function (element) {
        let rules = document.getElementsByClassName('rule');
        var parentRule = element.currentTarget.parentNode.parentNode;

        if (rules.length === 1) {
            var elements = getStringsReplace(rules[0]);
            clearFields(elements);
        } else {
            parentRule.remove();
        }
    })
}