var categoriesArray = ['categoryInput1'];
var shuffleWordsArray = ['shuffleWordsInput1'];
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
        removeCategory($(this).attr('id'));
    });
});

/*
function inputFieldsToJson() {
    for (var i = 0; i < categoriesArray.length; i++) {
        var tempArray = [];
        for (var j = 0; j < shuffleWordsArray.length; j++) {
            var tempString = ($('#' + shuffleWordsArray[j]).val());
            tempString = tempString.trim();
            tempArray = tempString.split(',');
        }
        var tempObjectKey = ($('#' + categoriesArray[i]).val());
        console.log($('#' + categoriesArray[i]).val());
        symbols = { [tempObjectKey]: tempArray };
    }
}
*/

function inputFieldsToJson(){
    $('#activeDiv').children().each(function() {
        var tempObjectKey;
        var tempArray;
        if ($(this).hasClass('categoryInput')) {
            tempObjectKey = $(this).val();
        }

        if ($(this).hasClass('shuffleWordInput')) {
            tempArray = $(this).val().split(',');
        }

        symbols = { [tempObjectKey]: tempArray };
    });
}

function generateTraceryOutput() {
    var grammar = tracery.createGrammar(symbols);
    var results = grammar.flatten($('#reportInputText').val());
    $('#reportOutputText').val(results);
}

function addCategory() {
    categoriesArray.push('category' + numCategories);
    shuffleWordsArray.push('shuffleWordsInput' + numCategories);

    numCategories = categoriesArray.length;

    $('#inputDivs').append('<div class=\"form-group categoryDivs\" id=\"newForm-group\"><input id=\"newCategory\" class=\"form-control categoryInput\" placeholder=\"\uD83C\uDFF7\uFE0F Give this category a title, e.g. \'animals\'\" \/><input id=\"newShuffleWords\" class=\"form-control shuffleWordInput\" placeholder=\"\u2753 Words to shuffle, e.g. \'deer, fox, rabbit\'\" \/><button id=\"newRemoveCategoryBtn\" class=\"btn btn-light btn-block\">\u274C Remove this category<\/button><\/div>');
    $('#newForm-group').attr('id', 'form-group' + numCategories);
    $('#newCategory').attr('id', 'category' + numCategories);
    $('#newShuffleWords').attr('id', 'shuffleWordsInput' + numCategories);
    $('#newRemoveCategoryBtn').attr('id', 'RemoveCategoryBtn' + numCategories);
    $('.categoryDivs > button').show();
}

function removeCategory(elementSequenceNumber) {

}