var friends = ["Jeff", "David", "Jack", "Wells", "Paul"];
var locations = ["Kitchen", "Dining Room", "Washroom", "Bedroom", "Bathroom", "Living Room", "Study", "Cellar", "Pizza Hut", "Innovation Depot"]
var weapons = ["Twizzler", "Candle Stick", "Hand of Mitas", "Axe", "Trapper Keeper", "Spoon", "Marbles", "The Elder Wand", "Box o' Crayons", "Shoe",
    "Oven Mits", "Tomahawk", "Pencil", "Humor", "Yoga Pants", "Good looks", "Killer Instinct", "Cheese", "Crossbow", "Agnis"]

//WAY OF DOING IT THROUGH CLOSURE
$(document).ready(function () {
    for (var i = 1; i <= 100; i++) {
        createHead(i);
    }
})
function createHead(num) {
    var head = $("<h3>Clue " + num + "</h3>");
    head.click(function () {
        alert("Clue " + num + ": " + friends[(num - 1) % 5] + " did it in the " + locations[(num - 1) % 10] + " with a " + weapons[(num - 1) % 20]);
    });
    $("body").append(head);
}

//WAY OF DOING IT THROUGH BIND
$(document).ready(function () {
    for (var i = 1; i <= 100; i++) {
        var head = $("<h3>Clue " + num + "</h3>");
        head.click(doAlert.bind(i, friends[(num - 1) % 5], locations[(num - 1) % 10], weapons[(num - 1) % 20]));
        $("body").append(head);
    }
})
function doAlert(num, friend, location, weapon) {
    alert("Clue " + num + ": " + friend + " did it in the " + location + " with a " + weapon);
}