//CREATE AN ARRAY TO STORE OUR DICE
var dice = [];

//DIE CLASS CONSTRUCTOR RIGHT HERE v
var Die = function() {
    //SET THE VALUE PROPERTY TO A RANDOM NUMBER BETWEEN 1 AND 6
    this.value = Math.floor(Math.random() * 6) + 1;
    //SET THE DIV PROPERTY TO A NEW DIV WITH CLASS 'DIE'
    this.div = $("<div class='die'>" + this.value + "</div>");
    //SET THE ROLL FUNCTION TO RUN WHEN CLICKED
    this.div.click(this.roll.bind(this));
    //SET THE REMOVE FUNCTION TO RUN WHEN DOUBLE-CLICKED`
    this.div.dblclick(this.remove.bind(this));
    //APPEND THE NEW DIE TO THE DICE CONTAINER
    $("#dice-container").append(this.div);
}

//ROLL THE DIE (SET THE VALUE TO A RANDOM BETWEEN 1 - 6 AND UPDATE THE DIV'S TEXT)
Die.prototype.roll = function() {
    this.value = Math.floor(Math.random() * 6) + 1;
    this.div.text(this.value);
}

//REMOVE THE DIE FROM THE ARRAY AND REMOVE ITS DIV FROM THE PAGE
Die.prototype.remove = function() {
    this.div.remove();
    var index = dice.indexOf(this);
    dice.splice(index, 1);
}

//FUNCTION TO CREATE A NEW DIE WHEN THE GENERATE BUTTON IS CLICKED
function createDie() {
    dice.push(new Die());
}

//ROLL ALL THE DICE ON THE PAGE BY ITERATING THROUGH THE ARRAY AND CALLING ROLL ON EACH
function rollDice() {
    for(var i = 0; i < dice.length; i++) {
        dice[i].roll();
    }
} 

//SUM UP ALL THE DIE'S VALUES AND ALERT THE TOTAL
function sumDice() {
    var sum = 0;
    for(var i = 0; i < dice.length; i++) {
        sum += dice[i].value;
    }
    alert("The sum of the dice is: " + sum);
}