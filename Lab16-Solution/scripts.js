
var Shape = function (width, height, cssClass) {
    this.width = width;
    this.height = height;
    this.cssClass = cssClass;
    this.draw();
}

Shape.prototype.draw = function () {
    this.div = $("<div class='" + this.cssClass + "'></div>");
    this.div.css({
        width: this.width + "px",
        height: this.height + "px",
        top: Math.floor(Math.random() * (600 - this.height)),
        left: Math.floor(Math.random() * (600 - this.width))
    });
    this.div.click(this.describe.bind(this));
    this.div.dblclick(function () {
        this.div.remove();
    }.bind(this));
    $("#shape-canvas").append(this.div);
}

Shape.prototype.describe = function () {
    $("#name").text("Name: " + this.constructor.name);
    $("#width").text("Width: " + this.width);
    $("#height").text("Height: " + this.height);
    $("#radius").text("Radius: " + (this.cssClass == "circle" ? this.radius : "N/A"));
    $("#area").text("Area: " + this.area());
    $("#perimeter").text("Perimeter: " + this.perimeter());
}

//CIRCLE CLASS DECLARATION 

var Circle = function (radius) {
    this.radius = radius;
    Shape.call(this, radius * 2, radius * 2, "circle");
}

Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.area = function () {
    return Math.PI * (this.radius * this.radius);
}

Circle.prototype.perimeter = function () {
    return 2 * Math.PI * this.radius;
}

//TRIANGLE CLASS DECLARATION 

var Triangle = function (height) {
    Shape.call(this, 0, 0, "triangle");
    var y = this.div.css("top");
    var x = this.div.css("left");
    this.div.css({
        top: (y - (y + height > 600 ? height : 0)) + "px",
        left: (x - (x + height > 600 ? height : 0)) + "px",
        "border-bottom": height + "px solid goldenrod",
        "border-right":  height + "px solid transparent"
    })
}

Triangle.prototype = Object.create(Shape.prototype);
Triangle.prototype.constructor = Triangle;

Triangle.prototype.area = function () {
    return 0.5 * this.height * this.height;
}

Triangle.prototype.perimeter = function () {
    return 2 * this.height * Math.sqrt(2 * this.height * this.height);
}

//RECTANGLE CLASS DECLARATION

var Rectangle = function (width, height) {
    Shape.call(this, width, height, "rectangle");
}

Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.area = function () {
    return this.height * this.width;
}

Rectangle.prototype.perimeter = function () {
    return (2 * this.height) + (2 * this.width);
}

//SQUARE CLASS DECLARATION 

var Square = function (side) {
    this.side = side;
    Shape.call(this, side, side, "square");
}

Square.prototype = Object.create(Shape.prototype);
Square.prototype.constructor = Square;

Square.prototype.area = function () {
    return this.side * this.side;
}

Square.prototype.perimeter = function () {
    return 4 * this.side;
}

//CLICKITY-FUNCTIONS

function addCircle() {
    new Circle($("#c-radius").val());
}

function addTriangle() {
    new Triangle($("#t-height").val());
}

function addRectangle() {
    new Rectangle($("#r-width").val(), $("#r-height").val());
}

function addSquare() {
    new Square($("#s-side").val());
}