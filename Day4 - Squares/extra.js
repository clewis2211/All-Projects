squareCount = 0;
    // squareCount++;
document.addEventListener('DOMContentLoaded', function () {
    var button = document.createElement("button");
    var n = document.createTextNode('Click!');
    // var squareDiv = document.createElement('div');
    // n.appendChild(squareDiv);
    // button.appendChild(n);
    button.appendChild(n);
    document.body.appendChild(button);
    button.addEventListener('click', function () {
        var squareDiv = document.createElement('div');
        squareDiv.className = 'box';
        squareDiv.id = squareCount;
        squareCount++;
        squareDiv.style.backgroundColor = 'blue';
        // squareDiv.style.color = 'white';
        // squarDiv.
        // button.appendChild(squareDiv);
        document.body.appendChild(squareDiv);

        squareDiv.addEventListener("mouseover", function () {
            squareDiv.innerHTML = squareDiv.id;
        });
        squareDiv.addEventListener('mouseleave', function () {
            squareDiv.innerHTML = "";
        });
        squareDiv.addEventListener('click', function(){
            squareDiv.style.backgroundColor = getRandomColor();
        });
        squareDiv.addEventListener('dblclick', function(){
            if(squareDiv && squareDiv.nextSibling){
                squareDiv.parentNode.removeChild(squareDiv.nextSibling);
            }
        });
        function getRandomColor(){
            var letters = '01234567ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++){
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
    });
});