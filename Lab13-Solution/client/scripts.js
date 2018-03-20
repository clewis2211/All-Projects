$(document).ready(function() {
    $.get("http://localhost:3000/api/locations", function(data) {
        for(var i = 0; i < data.length; i++) {
            makeDiv(data[i]);
        }
    })
});

function makeDiv(loc) {
    var container = $("<div class='location'></div>");
    var left = $("<div class='left'></div>");
    var right = $("<div class='right'></div>");
    left.append(
        $("<h2>" + loc.name + "</h2>"),
        $("<h3>Delivers: " + loc.delivers + "</h3>"),
        $("<h3>Phone: " + loc.phone + "</h3>")
    );
    right.append(
        $("<h3>" + loc.address.line1 + "</h3>"),
        $("<h3>" + (loc.address.line2 == "" ? "NOTHING" : loc.address.line2) + "</h3>"),
        $("<h3>" + loc.address.city + ", " + loc.address.state + " " + loc.address.zip + "</h3>")
    )
    container.append(left, right);
    $("#loc-container").append(container);
}

function postLoc() {
    var location = {
        name: $("#name").val(),
        delivers: $("#delivers").prop("checked"),
        phone: $("#phone").val(),
        address: {
            line1: $("#addr1").val(),
            line2: $("#addr2").val(),
            city: $("#city").val(),
            state: $("#state").val(),
            zip: $("#zip").val()
        }
    }
    $.ajax({
        method: "POST", 
        url: "http://localhost:3000/api/locations",
        contentType: "application/json",
        data: JSON.stringify(location)
    })
    .then(function(data) {
        console.log(data);
        makeDiv(location);
        $("input:not([type=button])").val('');
        alert("Successfully added new Location!");
    }, function(err) {
        console.log(err);
        alert("Could not add your Location!");
    })
}

