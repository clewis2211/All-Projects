var users = [];

//CREATE A LISTENER THAT HANDLES WHAT TO DO WHEN THE DOCUMENT IS LOADED
$(document).ready(function () {
    //MAKE A GET REQUEST TO GET USERS 
    $.get("http://localhost:3000/api/users", function (data) {
        for (var i = 0; i < data.length; i++) {
            var opt = $("<option value=" + data[i].id + ">" + data[i].name + "</option>");
            $("#user-list").append(opt);
            users.push(data[i].name);
        }
        // MAKE A GET REQUEST TO GET CHIRPS
        $.get("http://localhost:3000/api/chirps", function (data) {
            //ITERATE THROUGH EACH OF THE CHIRPS WE GOT AND PUT THEM IN OUR HTML
            for (var i = 0; i < data.length; i++) {
                createDiv(data[i], data[i].id);
            }
        });
    })
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
        userId: $("#user-list").val()
    };
    //CREATE A NEW POST REQUEST TO THE SERVER WITH THE JSON-CONVERTED CHIRP OBJECT
    $.ajax({
        method: "POST",
        url: "http://localhost:3000/api/chirps",
        contentType: "application/json",
        data: JSON.stringify(chirp)
    }).then(function (data) {
        console.log(data);
        // createDiv(chirp, data.id); 
        location.reload();
    }, function (err) {
        console.log(err);
    });
}

var array = ["success", "info", "warning", "danger"];
var counter = 0;

//FUNCTION TO CREATE A NEW DIV WITH STYLED CHIRP
function createDiv(chirp, id) {
    counter = counter + 1 >= array.length ? 0 : counter + 1;
    var container = $("<li class='list-group-item list-group-item-" + array[counter] + "'></li>");
    console.log(chirp.userId + " > " + users);
    var heading = $("<h4>" + users[chirp.userId - 1] + "</h4>");
    var message = $("<p>" + chirp.message + "</p>");
    var date = $("<p>" + chirp.timestamp + "</p>");
    var delBtn = $("<button type='button' class='btn btn-default' aria-label='Left Align'>"
        + "<span class='glyphicon glyphicon-trash' aria-hidden='true'></span>" +
        + "</button>");
    delBtn.click(function () {
        $.ajax({
            method: "DELETE",
            url: "http://localhost:3000/api/chirps/" + id
        }).then(function () {
            container.remove();
        }, function (err) {
            console.log(err);
        });
    })
    container.prepend(delBtn);
    container.append(heading);
    container.append(message);
    container.append(date);
    $("#chirp-container").append(container);
}