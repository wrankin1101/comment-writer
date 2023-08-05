//globals
var name;
var isMale;
var defaultInfoObj;

$(document).ready(function() {
    defaultInfoObj = serialize();
    var json = Cookies.get('infoObj');
    if (json) {
        var infoObj = JSON.parse(json);
        loadInfoObj(infoObj);
    }
});

$("#resetBtn").click(function() {
    if (confirm("Are you sure you want to reset all info to the default?")) {
        loadInfoObj(JSON.parse(defaultInfoObj));
    }
});

$("#writecomment").click(function() {
    saveCookie();
    name = $("#textName").val();
    isMale = $("#male").is(":checked");

    //compile first factors into array
    var goodstringArr = [];
    $("#firstFactorList .factor input:checked").each(function() {
        var factor = $(this).parents(".factor").find("textarea").val().trim();
        goodstringArr.push(cleanString(factor));
    });
    if ($("#chkrandom").is(":checked"))
        goodstringArr = _.shuffle(goodstringArr);

    //compile bad factors into array
    var badstringArr = [];
    $("#secondFactorList .factor input:checked").each(function() {
        var factor = $(this).parents(".factor").find("textarea").val().trim();
        badstringArr.push(cleanString(factor));
    });
    if ($("#chkrandom").is(":checked"))
        badstringArr = _.shuffle(badstringArr);

    //compile final factors into array
    var finalstringArr = [];
    $("#finalFactorList .factor input:checked").each(function() {
        var factor = $(this).parents(".factor").find("textarea").val().trim();
        finalstringArr.push(cleanString(factor, false));
    });
    if ($("#chkrandom").is(":checked"))
        finalstringArr = _.shuffle(finalstringArr);

    //build comment
    var commentStr = $("#firstFactorTitle").val().trim() + "\n";
    while (goodstringArr.length > 0) {
        commentStr += capitalize(goodstringArr.pop()) + " ";
    }
    commentStr += "\n\n";
    commentStr += $("#secondFactorTitle").val().trim() + "\n";
    while (badstringArr.length > 0) {
        commentStr += capitalize(badstringArr.pop()) + " ";
    };
    commentStr += "\n\n";
    commentStr += $("#finalFactorTitle").val().trim() + "\n";
    while (finalstringArr.length > 0) {
        commentStr += capitalize(finalstringArr.pop()) + " ";
    };

    //write and copy to clipboard
    $("#commentout").val(commentStr);
    $("#commentout").select();
    document.execCommand("copy");
    $("#alertCopy").show();
});

//delete factor
$(document).on('click', '.deleteFactor', function() {
    if (confirm("Are you sure? Can't be undone")) {
        $(this).parents(".factor").remove();
    }
});
$(document).on('change', 'textarea', function() {
    saveCookie();
});

//add new factor
$(".newFactor").click(function() {
    var listSelector = $(this).parents(".factorGroup").find(".factorList");
    var newFactor = {
        title: "New",
        comment: "",
        checked: true
    }
    addFactor(newFactor, listSelector, true);
});

//serialize info
function serialize() {
    var infoObj = {
        name: $("#textName").val(),
        isMale: $("#male").is(":checked"),
        chkrandom: $("#chkrandom").is(":checked"),
        firstFactorTitle: $("#firstFactorTitle").val().trim(),
        secondFactorTitle: $("#secondFactorTitle").val().trim(),
        finalFactorTitle: $("#finalFactorTitle").val().trim(),
        firstFactorList: [],
        secondFactorList: [],
        finalFactorList: []
    }
    $("#firstFactorList .factor").each(function() {
        var factor = {
            title: $(this).find(".factorTitle").val(),
            comment: $(this).find("textarea").val().trim(),
            checked: $(this).find("input").is(":checked")
        }
        infoObj.firstFactorList.push(factor);
    });
    $("#secondFactorList .factor").each(function() {
        var factor = {
            title: $(this).find(".factorTitle").val(),
            comment: $(this).find("textarea").val().trim(),
            checked: $(this).find("input").is(":checked")
        }
        infoObj.secondFactorList.push(factor);
    });
    $("#finalFactorList .factor").each(function() {
        var factor = {
            title: $(this).find(".factorTitle").val(),
            comment: $(this).find("textarea").val().trim(),
            checked: $(this).find("input").is(":checked")
        }
        infoObj.finalFactorList.push(factor);
    });
    var myJSON = JSON.stringify(infoObj);
    return myJSON;
}

//save infoObj for 14 days
function saveCookie() {
    var json = serialize();
    Cookies.set('infoObj', json )
}

//parse info and load DOM
function loadInfoObj(infoObj) {
    $("#textName").val(infoObj.name);
    $("#male").prop('checked', infoObj.isMale);
    $("#female").prop('checked', !infoObj.isMale);
    $("#chkrandom").prop('checked', infoObj.chkrandom);

    $("#firstFactorTitle").val(infoObj.firstFactorTitle);
    $("#secondFactorTitle").val(infoObj.secondFactorTitle);
    $("#finalFactorTitle").val(infoObj.finalFactorTitle);

    $(".factorList .factor").remove();
    while (infoObj.firstFactorList.length > 0) {
        var factor = infoObj.firstFactorList.shift();
        addFactor(factor, $("#firstFactorList .factorList"));
    };
    while (infoObj.secondFactorList.length > 0) {
        var factor = infoObj.secondFactorList.shift();
        addFactor(factor, $("#secondFactorList .factorList"));
    };
    while (infoObj.finalFactorList.length > 0) {
        var factor = infoObj.finalFactorList.shift();
        addFactor(factor, $("#finalFactorList .factorList"));
    };
}

//take factor object and add to listSelector
function addFactor(factorObj, listSelector, prepend = false) {
    var $factor = $("#blankFactor").children(".factor").clone();
    if (prepend)
      $factor.prependTo(listSelector);
    else{
      $factor.appendTo(listSelector);
    }

    $factor.find(".factorTitle").val(factorObj.title);
    $factor.find("textarea").val(factorObj.comment);
    $factor.find("input").prop('checked', factorObj.checked);
}

//clean hashtags into gender specific pronouns and names
function cleanString(factor, genderclean = true) {
    factor = factor.replace(/#name/g, name);

    if (genderclean) {
        factor = factor.replace(/\bhis\b/gi, isMale ? "his" : "her");
        factor = factor.replace(/\bher\b/gi, isMale ? "his" : "her");

        factor = factor.replace(/\bhim\b/gi, isMale ? "him" : "her");
        factor = factor.replace(/\bher\b/gi, isMale ? "him" : "her");

        factor = factor.replace(/\bhe\b/gi, isMale ? "he" : "she");
        factor = factor.replace(/\bshe\b/gi, isMale ? "he" : "she");

        factor = factor.replace(/\bhimself\b/gi, isMale ? "himself" : "herself");
        factor = factor.replace(/\bherself\b/gi, isMale ? "himself" : "herself");
    }

    return factor;
}

//string helpers
function capitalize(s) {
    return s ? s[0].toUpperCase() + s.slice(1) : "";
}
String.prototype.format = function() {
    var args = arguments;
    return this.replace(/\{(\d+)\}/g, function(m, n) {
        return args[n];
    });
};