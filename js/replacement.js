var elements = document.getElementsByTagName('*');

chrome.storage.sync.get('rules', function (data) {
    let savedRules = data['rules'];
    let replacements = buildReplacements(savedRules);
    console.log(savedRules);
    
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];

        for (var j = 0; j < element.childNodes.length; j++) {
            var node = element.childNodes[j];

            if (node.nodeType === 3) {
                var text = node.nodeValue;
                var replacedText = text;
                for (var replacement of replacements) {
                    replacedText = replacedText.replace(replacement[1], replacement[0]);
                }
                
                if (replacedText !== text) {
                    console.log('replaced');
                    element.replaceChild(document.createTextNode(replacedText), node);
                }
            }
        }
    }
});

function buildReplacements(rules) {
    let replacements = [];
    for (var key in rules) {
        replacements.push([key, buildRegex(rules[key])])
    }
    console.log(replacements);
    return replacements;
}

function buildRegex(values) {
    return new RegExp("\\b" + values.join("\\b|\\b") + "\\b", "g")
}