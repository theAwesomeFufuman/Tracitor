var symbols = {};
var numSymbols = 1;
var importedJsonIsValid;

$(document).ready(function () {
    $('#srcJsonObject').attr('placeholder', '⌨️ Start writing your JSON here...\nThis editor uses "origin" as the start symbol for the tracery grammar.');
    $('#reportInputText').attr('placeholder', '\u270D\uFE0F Start writing your story here...\nUse the rules that you have created above by enclosing them with \'#\'s, e.g. \'My favorite animal is #animal#\'.');

    $(document).on('keydown keyup change', '.categoryInput, .shuffleWordInput, .originInput', function () {
        $(this).parent().attr('id', 'activeDiv');
        editorTxtAreaToSymbolsObject();
        prettyPrintSymbolsObject(symbols, '#srcJsonObject');
    });

    $(document).on('click', '#createReportBtn, #importJsonBtn', function () {
        var targetElement = $(this).attr('data-textarea');

        importSymbolsFromJsonEditor(targetElement);
        prettyPrintSymbolsObject(symbols, targetElement);

        if (importedJsonIsValid) {
            $('#reportOutputText').val(generateTraceryOutput());
            $('#resultAccordionHeading').trigger('click');
        }
    });

    $(document).on('click', '#addCategoryBtn', function () {
        addSymbolInput(false);
    });

    //Remove symbol button
    $(document).on('click', '.categoryDivs > button', function () {
        $(this).parent().attr('id', 'activeDiv');
        removeSymbol();
    });

    $(document).on('click', '.copyBtn', function () {
        var targetElement = $(this).attr('data-textarea');

        if (targetElement == '#srcJsonObject') {
            importSymbolsFromJsonEditor(targetElement);
            prettyPrintSymbolsObject(symbols, targetElement);
        }

        copyToClipboard(targetElement);
    });
});

function editorTxtAreaToSymbolsObject(){
        var symbolObjectKey;
        var symbolValueArray;
    $('#activeDiv').children().each(function() {

        if ($(this).hasClass('categoryInput')) {
            symbolObjectKey = $(this).val().trim();
        }

        if ($(this).hasClass('shuffleWordInput')) {
            symbolValueArray = $(this).val().split(',');
        }

        if ($(this).hasClass('originInput')) {
            symbolObjectKey = "origin";
            symbolValueArray = $(this).val();
        }
    });

    if (symbolValueArray != "" && symbolValueArray != undefined) {
        for (var i = 0; i < symbolValueArray.length; i++) {
            symbolValueArray[i] = symbolValueArray[i].trim();
        }

        symbols[symbolObjectKey] = symbolValueArray;
    }

    if (numCategoriesInJsonObject() > numSymbols) {
        removeObsoleteJsonObjects(symbolObjectKey, symbolValueArray);
    }
    $('#activeDiv').attr('id', '');
}

function prettyPrintSymbolsObject(objectToPrint, elementToPrintTo) {
    $(elementToPrintTo).val(js_beautify(JSON.stringify(objectToPrint)));
}

function generateTraceryOutput() {
    var grammar = tracery.createGrammar(symbols);
    var traceryOutput = grammar.flatten(symbols["origin"].toString());
    return traceryOutput;
}

function addSymbolInput(setActive) {
    var activeClassName = setActive ? "id=\"activeDiv\"" : "";
    numSymbols += 1;
    $('#inputDivs').append('<div class=\"form-group categoryDivs\" ' + activeClassName +  '><input class=\"form-control categoryInput\" placeholder=\"\uD83C\uDFF7\uFE0F Give this category a title, e.g. \'animals\'\" \/><input class=\"form-control shuffleWordInput\" placeholder=\"\u2753 Words to shuffle, e.g. \'deer, fox, rabbit\'\" \/><button class=\"btn btn-light btn-block\">\u274C Remove this category<\/button><\/div>');

    if (numSymbols > 1) {
        $('.categoryDivs > button').show();   
    }
}

function removeSymbol() {
    numSymbols -= 1;
    $('#activeDiv').children().each(function() {
        if ($(this).hasClass('categoryInput')) {
            delete symbols[$(this).val()];
        }
    });

    $('#activeDiv').remove();

    if (numSymbols == 1) {
        $('.categoryDivs > button').hide();
    }
    prettyPrintSymbolsObject(symbols, '#srcJsonObject');
}

function copyToClipboard(valToCopy) {
    var dt = new clipboard.DT();
    dt.setData("text/plain", $(valToCopy).val());
    clipboard.write(dt);
}

function importSymbolsFromJsonEditor(jsonToImport) {

    if ($(jsonToImport).val() != "") {
        
        try {
            var importedJsonObject = JSON.parse($(jsonToImport).val());
            importedJsonIsValid = true;
        } catch (err) {
            importedJsonIsValid = false;
            var redirectUsr = confirm("The JSON object that you provided is incorrectly formatted.\nDo you need help with formatting JSON correctly?")
            if (redirectUsr) {
                window.open('https://jsonlint.com/?json=' + $(jsonToImport).val());
            }
        }

        $('#inputDivs').children().each(function() {
            $(this).remove();
            numSymbols -= 1;
        });

        var keys = Object.keys(importedJsonObject);
        for (const key of keys) {
            if (key == 'origin') {
                $('#reportInputText').val(importedJsonObject[key].toString());
            } else {
                addSymbolInput(true);
                $('#activeDiv').children().each(function() {
                    if ($(this).hasClass('categoryInput')) {
                        $(this).val(key);
                    }

                    if ($(this).hasClass('shuffleWordInput')) {
                        $(this).val(importedJsonObject[key].toString());
                    }
                });
            }
            symbols = importedJsonObject;

            $('#activeDiv').attr('id', '');
        }
    }
}

function numCategoriesInJsonObject() {
    return Object.keys(symbols).length;
}

function removeObsoleteJsonObjects(objectKeyToCheck, objectArrayToCheck) {
    var keys = Object.keys(symbols);
    for (const key of keys) {
        if (key != objectKeyToCheck && JSON.stringify(objectArrayToCheck) == JSON.stringify(symbols[key])) {
            delete symbols[key];
        }
    }
}