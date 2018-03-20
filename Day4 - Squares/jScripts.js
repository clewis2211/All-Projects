//VARIABLE KEEPING TRACK OF THE NUMBER OF SQUARES ON THE PAGE
var numSquares = 0;

//WAIT UNTIL THE DOCUMENT HAS LOADED
$(document).ready(function() {
    //CREATE A BUTTON THAT RUNS OUR ADDDIV FUNCTION WHEN CLICKED
    var button = $("<button onclick='addDiv()'>Click Me jQuery!</button>");
    // button.click(addDiv); ALSO WORKS 
    //APPEND OUR NEWLY CREATED BUTTON TO THE BODY
    $("body").append(button);
});
//CREATE A FUNCTION TO ADD DIVS TO THE PAGE
function addDiv() {
    //CREATE A NEW DIV WITH A CLASS OF 'BOX' AND AN ID OF THE CURRENT NUMBER OF SQUARES
    var newDiv = $("<div class='box' id=" + numSquares + "></div>");
    // newDiv.addClass("box"); ALSO WORKS FOR SETTING THE CLASS
    // newDiv.attr("id", squareCount); ALSO WORKS FOR SETTING THE ID
    //INCREMENT THE NUMBER OF SQUARES SINCE WE JUST ADDED ONE
    numSquares++;
    //CREATE A HOVER-EVENT LISTENER FOR THE NEWLY CREATED DIV
    newDiv.hover(function() {
        //SET THE TEXT OF THE NEW DIV TO ITS ID WHEN WE HOVER
        newDiv.text(newDiv.attr("id"));
    }, function() {
        //AND SET THE TEXT TO BLANK WHEN WE STOP HOVERING
        newDiv.text("");
    });
    //CREATE A CLICK EVENT-LISTENER FOR OUR NEW DIV
    newDiv.click(function() {
        //WHEN THE DIV IS CLICKED, SET THE BACKGROUND COLOR TO A RANDOM COLOR 
        //THIS USES THE FUNCTION BELOW CALLED (AMAZINGLY) GETRANDOMCOLOR()
        newDiv.css("background-color", getRandomColor());
    });
    //CREATE A DOUBLECLICK-EVENT LISTENER FOR OUR NEW DIV
    newDiv.dblclick(function() {
        //IF THE DIV HAS AN EVEN ID...
        if(newDiv.attr("id") % 2 == 0) {
            //GET THE DIV'S NEXT SIBLING IN THE HTML
            var sibling = newDiv.next("div");
            //IF THERE IS NO SIBLING, PRINT AN ERROR MESSAGE
            if(sibling.length < 1) {
                alert("There is no sibling afterwards to remove!");
            //OTHERWISE: REMOVE THE SIBLING    
            } else {
                sibling.remove();
            }
        //OTHERWISE: IF THE DIV'S ID IS ODD    
    } else {
            //GET THE DIV'S PREVIOUS SIBLING IN THE HTML
             var sibling = newDiv.prev("div");
             //IF THERE IS NO SIBLING, PRINT AN ERROR MESSAGE
            if(sibling.length < 1) {
                alert("There is no sibling before to remove!");
            //OTHERWISE: REMOVE THE SIBLING   
            } else {
                sibling.remove();
            }
        }
    });
    //ONCE ITS FULLY MODIFIED, APPEND THE NEW DIV TO THE BODY OF THE PAGE
    $("body").append(newDiv);
}

//I FOUND THIS ON THE INTERNET...
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}