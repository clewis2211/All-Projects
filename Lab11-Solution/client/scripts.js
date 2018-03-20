//CREATE A LISTENER THAT HANDLES WHAT TO DO WHEN THE DOCUMENT IS LOADED
$(document).ready(function () {
    // MAKE A GET REQUEST TO GET CHIRPS
    $.get("http://localhost:3000/api/chirps", function (data) {
        //ITERATE THROUGH EACH OF THE CHIRPS WE GOT AND PUT THEM IN OUR HTML
        for (var i = 0; i < data.length; i++) {
            createLi(data[i]);
        }
    });
    //CREATE AN EVENT LISTENER THAT LISTENS FOR KEY-UP ON THE INPUT BOX
    //IF THE BOX IS EMPTY AFTER A KEYSTROKE, DISABLE THE BUTTON
    $("#chirp-input").keyup(function () {
        var isEmpty = $("#chirp-input").val().length === 0;
        $("#chirp-button").prop("disabled", isEmpty);
    });
    //CREATE AN EVENT LISTENER THAT LISTENS FOR THE BUTTON BEING CLICKED
    $("#chirp-button").click(function () {
        postChirp();
        $("#chirp-input").val('');
    });
});

//FUNCTION TO POST A CHURP TO THE SERVER
function postChirp() {
    //CREATE A JSON OBJECT WITH THE CHURP'S CONTENTS
    var chirp = {
        message: $("#chirp-input").val(),
        user: "Greyson",
        timestamp: new Date().toISOString()
    };
    //CREATE A NEW POST REQUEST TO THE SERVER WITH THE JSON-CONVERTED CHIRP OBJECT
    $.ajax({
        method: "POST",
        url: "http://localhost:3000/api/chirps",
        contentType: "application/json",
        data: JSON.stringify(chirp)
    }).then(function() {
        createLi(chirp);
    }, function (err) {
        console.log(err);
    });
    // $.post("http://localhost:3000/api/chirps", JSON.stringify(chirp), "json")
    //     .done(function () {
    //         createDiv(chirp);
    //     }).fail(function () {
    //     console.log("ERROR POSTING CHIRP!");
    // });
}

var array = ["success", "info", "warning", "danger"];
var counter = 0;

//FUNCTION TO CREATE A NEW DIV WITH STYLED CHIRP
function createLi(chirp) {
    //IF COUNTER + 1 > ARRAY'S LENGTH... COUNTER = 0 || COUNTER = COUNTER + 1
   counter = (counter + 1 >= array.length ? 0 : counter + 1);
   var className = "list-group-item list-group-item-" + array[counter];
   var newLi = $("<li class='" + className + "'></li>");
   newLi.text(chirp.user + ": " + chirp.message);
   $(".list-group").append(newLi);
}