$(document).ready(function() {
    
    $("#chirp-input").keyup(function() {
        var chirpButton = $("#chirp-button");
        var isEmpty = $("#chirp-input").val().length == 0;
        $("#chirp-button").prop('disabled', isEmpty);
    });
    
    $("#chirp-button").click(postChirp);

    // $.ajax({
    //     method: "GET",
    //     url: "http://localhost:3000/api/chirps",
    //     contentType: "application/json"
    // }) THIS IS ONE WAY OF DOING THINGS, BUT THE SHORT-HAND IS:
    $.get("http://localhost:3000/api/chirps", function(chirpArray) {
        for(var i = 0; i < chirpArray.length; i++) {
            createDiv(chirpArray[i]);
        }
    });
});

//FUNCTION TO CREATE CHIRP-DIV WHEN LOADING THE PAGE/POSTING NEW CHIRP
function createDiv(chirp) {
    var div = $("<div class='chirp'></div>");
    var h3 = $("<h3>" + chirp.user + "</h3>");
    var p = $("<p>" + chirp.message + "</p>"); 
    div.append(h3);
    div.append(p);
    $("#chirp-container").append(div);
}

//FUNCTION TO POST A CHIRP TO THE SERVER WHEN BUTTON IS CLICKED
function postChirp() {
    var chirp = {
        message: $("#chirp-input").val(),
        user: "Greyson",
        timestamp: Date.now().toString()
    };
    // $.ajax({
    //     method: "POST",
    //     url: "something",
    //     success: function() {
    //         console.log("Something");
    //     },
    //     error: function() {
    //         console.log("ERROR!");
    //     }
    // }) ANOTHER WAY, BUT SHORT-HAND IS:
    $.post("http://localhost:3000/api/chirps", JSON.stringify(chirp), "json")
        .done(function() {
            createDiv(chirp);
            $("#chirp-input").val('');
        }).fail(function() {
            console.log("ERROR!");
        })
}