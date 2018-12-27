let reset = document.getElementById("clearRules");
let save = document.getElementById("saveRules");
let remove = document.getElementById("deleteString1");
let add = document.getElementById("addRule");
let cancel = document.getElementById("cancel");
// let page = document.getElementById('buttonDiv');
// const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1', '#fff'];
// function constructOptions(kButtonColors) {
//     for (let item of kButtonColors) {
//         let button = document.createElement('button');
//         button.style.backgroundColor = item;
//         button.addEventListener('click', function () {
//             chrome.storage.sync.set({ color: item }, function () {
//                 console.log('color is ' + item);
//             })
//         });
//         page.appendChild(button);
//     }
// }
// constructOptions(kButtonColors);

chrome.storage.sync.get('rules', function (data) {
    let savedRules = data['rules'];
    console.log(savedRules);
    // if (Object.keys(savedRules).length > 0) {
    //     console.log(Object.keys(savedRules).length);
    // }
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

reset.addEventListener('click', function() {
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
        // let string1 = rule.getElementById("string1").value;
        let stringArray = elements.string.value.split('|');
        let set = new Set(stringArray);
        // let replace1 = rule.getElementById("replace1").value;
        // let val = { replace1: string1 };
        objectResponse[elements.replace.value] = [...set];
    }

    chrome.storage.sync.set({rules: objectResponse});
    location.reload();
    console.log(objectResponse);
})

remove.addEventListener('click', function(element) {
    console.log(element)
    let replace1 = document.getElementById("replace1").value;
    chrome.storage.sync.get('rules', function(data) {
        let savedRules = data['rules'];
        console.log(savedRules);
        console.log(savedRules[replace1]);
        delete savedRules[replace1];
        chrome.storage.sync.set({rules: savedRules});
    });
    location.reload();
})

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

    // var string = newRule.getElementsByClassName('strings')[0];
    // var replace = newRule.getElementsByClassName('replace')[0];
    var elements = getStringsReplace(newRule);

    elements.string.id = 'string' + (rules.length + 1);
    elements.replace.id = 'replace' + (rules.length +1);
    elements.string.value = '';
    elements.replace.value = '';
    // var groups = newRule.getElementsByClassName('form-group');


    container.appendChild(newRule);
}

function getStringsReplace(element) {
    var string = element.getElementsByClassName('strings')[0];
    var replace = element.getElementsByClassName('replace')[0];
    return {string: string, replace: replace}
}