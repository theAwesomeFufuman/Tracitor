var symbols = {};
var numCategories = 1;

$(document).ready(function () {
    $(document).on('keydown keyup change', '.categoryInput, .shuffleWordInput', function () {
        $(this).parent().attr('id', 'activeDiv');
        inputFieldsToJson();
    });

    $(document).on('click', '#createReportBtn', function () {
        generateTraceryOutput();
    });

    $(document).on('click', '#addCategoryBtn', function () {
        addCategory();
    });

    $(document).on('click', '.categoryDivs > button', function () {
        $(this).parent().attr('id', 'activeDiv');
        removeCategory();
    });

    $(document).on('click', '.copyBtn', function () {
        copyToClipboard($(this).attr('data-textarea'));
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
    });

    if (tempArray != "") {
        for (var i = 0; i < tempArray.length; i++) {
            tempArray[i] = tempArray[i].trim();
        }

        symbols[tempObjectKey] = tempArray;
    }

    $('#srcJsonObject').val(JSON.stringify(symbols, null, 4));
    $('#activeDiv').attr('id', '');
}

function generateTraceryOutput() {
    var grammar = tracery.createGrammar(symbols);
    var results = grammar.flatten($('#reportInputText').val());
    $('#reportOutputText').val(results);
}

function addCategory() {
    numCategories += 1;
    $('#inputDivs').append('<div class=\"form-group categoryDivs\"><input class=\"form-control categoryInput\" placeholder=\"\uD83C\uDFF7\uFE0F Give this category a title, e.g. \'animals\'\" \/><input class=\"form-control shuffleWordInput\" placeholder=\"\u2753 Words to shuffle, e.g. \'deer, fox, rabbit\'\" \/><button class=\"btn btn-light btn-block\">\u274C Remove this category<\/button><\/div>');
    $('.categoryDivs > button').show();
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
}

function copyToClipboard(valToCopy) {
    var dt = new clipboard.DT();
    dt.setData("text/plain", $(valToCopy).val());
    clipboard.write(dt);
}