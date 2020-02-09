var categoriesArray = ['category1'];
var shuffleWordsArray = ['shuffleWordsInput1'];
var symbols = {};

var numCategories = categoriesArray.length;

$(document).ready(function () {
    $(document).on('keydown keyup change', '.categoryInput, .shuffleWordInput', function () {
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

function inputFieldsToJson() {
    for (var i = 0; i < categoriesArray.length; i++) {
        var tempArray = [];
        for (var j = 0; j < shuffleWordsArray.length; j++) {
            var tempString = ($('#' + shuffleWordsArray[j]).val());
            tempString = tempString.trim();
            tempArray = tempString.split(',');
        }
        var tempObjectKey = ($('#' + categoriesArray[i]).val());
        symbols = { [tempObjectKey]: tempArray };
    }
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
    elementSequenceNumber = elementSequenceNumber.charAt(elementSequenceNumber.length - 1);
    var catNum;

    for (var i = 0; i < categoriesArray.length; i++) {
        catNum = categoriesArray[i].charAt(categoriesArray[i].length - 1);
        if (catNum == elementSequenceNumber) {
            $('#form-group' + elementSequenceNumber).remove();
            categoriesArray.splice(i, 1);
            shuffleWordsArray.splice(i, 1);

            numCategories = categoriesArray.length;
        }
    }

    console.log(categoriesArray);

    for (var i = 0; i < categoriesArray.length; i++) {
        catNum = categoriesArray[i].charAt(categoriesArray[i].length - 1);
        if (catNum != (i + 1)) {
            $('#form-group' + catNum).attr('id', 'form-group' + (i + 1));
            $('#category' + catNum).attr('id', 'category' + (i + 1));
            $('#shuffleWordsInput' + catNum).attr('id', 'shuffleWordsInput' + (i + 1));
            $('#RemoveCategoryBtn' + catNum).attr('id', 'RemoveCategoryBtn' + (i + 1));
            categoriesArray[i] = 'category' + (i + 1);
            shuffleWordsArray[i] = 'shuffleWordsInput' + (i + 1);
        }
    }
}