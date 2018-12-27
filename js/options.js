let reset = document.getElementById("clearRules");
let save = document.getElementById("saveRules");
let remove = document.getElementById("deleteString1");
let add = document.getElementById("addRule");
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
    let string1 = document.getElementById("string1").value;
    let stringArray = string1.split('|');
    let set = new Set(stringArray);
    let replace1 = document.getElementById("replace1").value;
    // let val = { replace1: string1 };
    objectResponse[replace1] = [...set];
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
    let rules = 
})

function buildFields(params) {
    let rule = document.getElementsByClassName('rule')[0];
    var container = document.getElementsByClassName('container')[0];
    var newRule = rule.cloneNode(true);

    // var groups = newRule.getElementsByClassName('form-group');


    container.appendChild(newRule);
}