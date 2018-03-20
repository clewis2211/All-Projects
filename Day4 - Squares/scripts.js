//CREATE A VARIABLE THAT KEEPS TRACK OF HOW MANY SQUARES ARE ON THE PAGE
var squareCount = 0;

//WAIT FOR THE HTML TO BE FULLY LOADED
document.addEventListener("DOMContentLoaded", function () {
    //CREATE A NEW BUTTON ELEMENT
    var button = document.createElement("button");
    //SET THE BUTTON'S TEXT TO SAY 'CLICK ME!' 
    // button.innerText = "Click Me!";
    // button.innerHTML = "Click Me!";
    button.appendChild(document.createTextNode("Click Me!"));
    //CALL ADDDIV WHEN THE BUTTON IS CLICKED
    button.addEventListener("click", function () {
        //CREATE A NEW DIV ELEMENT
        // newDiv.style.backgroundColor = "black";
        var newDiv = document.createElement("div");
        //SET THE NEW DIV'S CLASS TO 'BOX'
        newDiv.className = "box";
        //SET THE NEW DIV'S ID TO squareCount
        newDiv.id = squareCount;
        //INCREMENT SQUARECOUNT BY 1
        squareCount++;
        //ADD AN EVENT LISTENER FOR WHEN WE MOUSEOVER
        newDiv.addEventListener("mouseenter", function() {
            newDiv.innerHTML = newDiv.id;
        });
        //ADD AN EVENT LISTENER FOR WHEN WE MOUSEOUT
        newDiv.addEventListener("mouseleave", function() {
            newDiv.innerHTML = "";
        });
        //ADD AN EVENT LISTENER FOR WHEN WE CLICK
        newDiv.addEventListener("click", function() {
            newDiv.style.backgroundColor = getRandomColor();
        });
        //ADD AN EVENT LISTENER FOR WHEN WE DOUBLE-CLICK
        newDiv.addEventListener("dblclick", function() {
            if(newDiv.id % 2 == 0) {
                var sibling = newDiv.nextSibling;
                if(sibling == null) {
                    alert("There is no next sibling to remove!");
                } else {
                    sibling.remove();
                }
            } else {
                var sibling = newDiv.previousSibling;
                if(sibling == null || sibling.tagName.toLowerCase() !== "div") {
                    alert("There is no previous sibling to remove!");
                } else {
                    sibling.remove();
                }
            }
        });
        //ADD OUR NEW DIV TO THE BODY OF THE PAGE
        document.body.appendChild(newDiv);
    });
    //PUT THE BUTTON INTO THE BODY OF THE PAGE
    document.body.appendChild(button);
});

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
