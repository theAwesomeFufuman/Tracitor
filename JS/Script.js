var symbols = {};
var numSymbols = 1;
var importedJsonIsValid;

$(document).ready(function () {
    $('#jsonEditorTxtArea').attr('placeholder', '⌨️ Start writing your JSON here...\nThis editor uses "origin" as the start symbol for the tracery grammar.');
    $('#simpleEditorTxtArea').attr('placeholder', '\u270D\uFE0F Start writing your story here...\nUse the symbols that you have created above by enclosing them with \'#\'s, e.g. \'My favorite animal is #animal#\'.');

    $(document).on('keydown keyup change', '.symbolInput, .rulesetInput, .originInput', function () {
        $(this).parent().attr('id', 'activeDiv');
        editorTxtAreaToSymbolsObject();
        prettyPrintSymbolsObject(symbols, '#jsonEditorTxtArea');
    });

    $(document).on('click', '.generateStoryBtn', function () {
        var targetElement = $(this).attr('data-textarea');

        if (!($(targetElement).val() == "")) {
            importSymbolsFromJsonEditor(targetElement);
            prettyPrintSymbolsObject(symbols, targetElement);

            if (importedJsonIsValid) {
                $('#resultTxtArea').val(generateTraceryOutput());

                if ($('#jsonEditorCollapse').hasClass('show')) {
                    $('#resultHeading').trigger('click');   
                }
            }
        }
    });

    $(document).on('click', '#addSymbolInputBtn', function () {
        addSymbolInput(false);
    });

    //Remove symbol button
    $(document).on('click', '.symbolsInputFormGroupDiv > button', function () {
        $(this).parent().attr('id', 'activeDiv');
        removeSymbol();
    });

    $(document).on('click', '.copyBtn', function () {
        var targetElement = $(this).attr('data-textarea');

        if (targetElement == '#jsonEditorTxtArea') {
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

        if ($(this).hasClass('symbolInput')) {
            symbolObjectKey = $(this).val().trim();
        }

        if ($(this).hasClass('rulesetInput')) {
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
    $('#symbolsInputParentDiv').append('<div class=\"form-group symbolsInputFormGroupDiv\" ' + activeClassName +  '><input class=\"form-control symbolInput\" placeholder=\"\uD83C\uDFF7\uFE0F Give this symbol a title, e.g. \'animal\'.\" \/><input class=\"form-control rulesetInput\" placeholder=\"\u2753 Enter the word(s) or sentence(s) to randomize in this symbol, separated by commas. E.g. \'deer, fox, rabbit\'.\"><button class=\"btn btn-light btn-block\">\u274C Remove this symbol<\/button><\/div>');

    if (numSymbols > 1) {
        $('.symbolsInputFormGroupDiv > button').show();   
    }
}

function removeSymbol() {
    numSymbols -= 1;
    $('#activeDiv').children().each(function() {
        if ($(this).hasClass('symbolInput')) {
            delete symbols[$(this).val()];
        }
    });

    $('#activeDiv').remove();

    if (numSymbols == 1) {
        $('.symbolsInputFormGroupDiv > button').hide();
    }
    prettyPrintSymbolsObject(symbols, '#jsonEditorTxtArea');
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

        $('#symbolsInputParentDiv').children().each(function() {
            $(this).remove();
            numSymbols -= 1;
        });

        var keys = Object.keys(importedJsonObject);
        for (const key of keys) {
            if (key == 'origin') {
                $('#simpleEditorTxtArea').val(importedJsonObject[key].toString());
            } else {
                addSymbolInput(true);
                $('#activeDiv').children().each(function() {
                    if ($(this).hasClass('symbolInput')) {
                        $(this).val(key);
                    }

                    if ($(this).hasClass('rulesetInput')) {
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