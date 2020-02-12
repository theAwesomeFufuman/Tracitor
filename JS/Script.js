﻿var symbols = {};
var numCategories = 1;

$(document).ready(function () {
    $('#srcJsonObject').attr('placeholder', '⌨️ Start writing your JSON here...\nThis editor uses "origin" as the start symbol for the tracery grammar.');
    $('#reportInputText').attr('placeholder', '\u270D\uFE0F Start writing your story here...\nUse the rules that you have created by enclosing them with \'#\'s, e.g. \'I love #animals#\'.');

    $(document).on('keydown keyup change', '.categoryInput, .shuffleWordInput, .originInput', function () {
        $(this).parent().attr('id', 'activeDiv');
        inputFieldsToJson();
    });

    $(document).on('click', '#createReportBtn, #importJsonBtn', function () {
        var targetElement = $(this).attr('data-textarea');

        $(targetElement).val(js_beautify($(targetElement).val()));
        importJson(targetElement);

        generateTraceryOutput();
        collapseThisAndShowResult();
    });

    $(document).on('click', '#addCategoryBtn', function () {
        addCategory(false);
    });

    $(document).on('click', '.categoryDivs > button', function () {
        $(this).parent().attr('id', 'activeDiv');
        removeCategory();
    });

    $(document).on('click', '.copyBtn', function () {
        var targetElement = $(this).attr('data-textarea');

        if (targetElement == '#srcJsonObject') {
            $(targetElement).val(js_beautify($(targetElement).val()));
        }

        copyToClipboard(targetElement);
    });
});

function inputFieldsToJson(){
        var tempObjectKey;
        var tempArray;
    $('#activeDiv').children().each(function() {

        if ($(this).hasClass('categoryInput')) {
            tempObjectKey = $(this).val().trim();
        }

        if ($(this).hasClass('shuffleWordInput')) {
            tempArray = $(this).val().split(',');
        }

        if ($(this).hasClass('originInput')) {
            tempObjectKey = "origin";
            tempArray = $(this).val();
        }
    });

    if (tempArray != "") {
        for (var i = 0; i < tempArray.length; i++) {
            tempArray[i] = tempArray[i].trim();
        }

        symbols[tempObjectKey] = tempArray;
    }

    if (numCategoriesInJsonObject() > numCategories) {
        removeObsoleteJsonObjects(tempObjectKey, tempArray);
    }
    $('#srcJsonObject').val(js_beautify(JSON.stringify(symbols)));
    $('#activeDiv').attr('id', '');
}

function generateTraceryOutput() {
    var grammar = tracery.createGrammar(symbols);
    var results = grammar.flatten($('#reportInputText').val());
    $('#reportOutputText').val(results);
}

function addCategory(setActive) {
    var activeClassID = setActive ? "id=\"activeDiv\"" : "";
    numCategories += 1;
    $('#inputDivs').append('<div class=\"form-group categoryDivs\" ' + activeClassID +  '><input class=\"form-control categoryInput\" placeholder=\"\uD83C\uDFF7\uFE0F Give this category a title, e.g. \'animals\'\" \/><input class=\"form-control shuffleWordInput\" placeholder=\"\u2753 Words to shuffle, e.g. \'deer, fox, rabbit\'\" \/><button class=\"btn btn-light btn-block\">\u274C Remove this category<\/button><\/div>');

    if (numCategories > 1) {
        $('.categoryDivs > button').show();   
    }
}

function removeCategory() {
    numCategories -= 1;
    $('#activeDiv').children().each(function() {
        if ($(this).hasClass('categoryInput')) {
            delete symbols[$(this).val()];
        }
    });

    $('#activeDiv').remove();

    if (numCategories == 1) {
        $('.categoryDivs > button').hide();
    }
    $('#srcJsonObject').val(js_beautify(JSON.stringify(symbols)));
}

function copyToClipboard(valToCopy) {
    var dt = new clipboard.DT();
    dt.setData("text/plain", $(valToCopy).val());
    clipboard.write(dt);
}

function importJson(objectToImport) {

    if ($(objectToImport).val() != "") {
        
        try {
            var jsonObject = JSON.parse($(objectToImport).val());
        } catch (err) {
            var redirectUsr = confirm("The JSON object that you provided is incorrectly formatted.\nDo you need help with formatting JSON correctly?")
            if (redirectUsr) {
                window.open('https://jsonlint.com/?json=' + $(objectToImport).val());
            }
        }

        if (!redirectUsr) {
            $('#inputDivs').children().each(function() {
                $(this).remove();
                numCategories -= 1;
            });

            var keys = Object.keys(jsonObject);
            for (const key of keys) {
                if (key == 'origin') {
                    $('#reportInputText').val(jsonObject[key].toString());
                } else {
                    addCategory(true);
                    $('#activeDiv').children().each(function() {
                        if ($(this).hasClass('categoryInput')) {
                            $(this).val(key);
                        }

                        if ($(this).hasClass('shuffleWordInput')) {
                            $(this).val(jsonObject[key].toString());
                        }
                    });
                }
                symbols = jsonObject;

                $('#activeDiv').attr('id', '');
            }
        }   
    }
}

function numCategoriesInJsonObject() {
    var keys = Object.keys(symbols);
    return keys.length;
}

function removeObsoleteJsonObjects(objectKeyToCheck, objectArrayToCheck) {
    var keys = Object.keys(symbols);
    for (const key of keys) {
        if (key != objectKeyToCheck && JSON.stringify(objectArrayToCheck) == JSON.stringify(symbols[key])) {
            delete symbols[key];
        }
    }
}

function collapseThisAndShowResult() {
    //$('#jsonAccordionCollapse, #simpleEditorAccordionCollapse').collapse('toggle');
    //$('#resultAccordionCollapse').collapse('toggle');
}