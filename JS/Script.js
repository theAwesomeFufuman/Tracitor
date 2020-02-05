var categoriesArray = ["category1"];
var shuffleWordsArray = ["shuffleWords1"];
var symbols = {};

$(document).ready(function () {
    $(document).on('keydown keyup change', '.categoryInput, .shuffleWordInput', function () {
        inputFieldsToJson();
    });

    $(document).on('click', '#addCategoryBtn', function () {
        generateTraceryOutput();
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
    console.log(grammar);
    var results = grammar.flatten($('#reportInputText').val());
    $('#reportOutputText').val(results);
}