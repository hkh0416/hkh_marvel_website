var model = {
    boardSize: 7,
    numShips: 3,
    shipLength: 3,
    shipsSunk: 0,
    ships: [
        {
            locations: ["00", "00", "00"],
            hits: ["", "", ""],
        },
        { locations: ["00", "00", "00"], hits: ["", "", ""] },
        { locations: ["00", "00", "00"], hits: ["", "", ""] },
    ],
    fire: function (guess) {
        for (var i = 0; i < this.numShips; i++) {
            var ship = this.ships[i];
            var index = ship.locations.indexOf(guess);
            if (ship.hits[index] === "hit") {
                view.displayMessage("You have already hit the location!");
                return true;
            } else if (index >= 0) {
                ship.hits[index] = "hit";
                view.displayHit(guess);
                view.displayMessage("HIT!");
                if (this.isSunk(ship)) {
                    view.displayMessage("You defeated an Ulton!");
                    this.shipsSunk++;
                }
                return true;
            }
        }
        view.displayMiss(guess);
        view.displayMessage("You missed!");
        return false;
    },
    isSunk: function (ship) {
        for (var i = 0; i < this.shipLength; i++) {
            if (ship.hits[i] !== "hit") {
                return false;
            }
        }
        return true;
    },
    generateShipLocation: function () {
        var locations;
        for (var i = 0; i < this.numShips; i++) {
            do {
                locations = this.generateship();
                // run the code first
            } while (this.collision(locations));
            // Then determine the condition, if true the loop will continue
            this.ships[i].locations = locations;
            // If false, break the loop and run the above code.
        }
        console.log(this.ships);
    },
    generateship: function () {
        var direction = Math.floor(Math.random() * 2);
        var row, col;

        if (direction === 1) {
            row = Math.floor(Math.random() * this.boardSize);
            col = Math.floor(
                Math.random() * (this.boardSize - this.shipLength)
            );
        } else {
            row = Math.floor(
                Math.random() * (this.boardSize - this.shipLength)
            );
            col = Math.floor(Math.random() * this.boardSize);
        }

        var newShipLocations = [];
        for (var i = 0; i < this.shipLength; i++) {
            if (direction === 1) {
                newShipLocations.push(row + "" + (col + i));
                // Add "" to conbine them as s string.
            } else {
                newShipLocations.push(row + i + "" + col);
            }
        }
        return newShipLocations;
    },
    collision: function (locations) {
        for (var i = 0; i < this.numShips; i++) {
            var ship = this.ships[i];
            for (var j = 0; j < locations.length; j++) {
                if (ship.locations.indexOf(locations[j]) >= 0) {
                    return true;
                }
            }
        }
        return false;
    },
};

var view = {
    displayMessage: function (msg) {
        var messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = msg;
        // innerHTML = update HTML
    },
    displayHit: function (location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "hit");
    },
    displayMiss: function (location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "miss");
    },
};

var controller = {
    guesses: 0,
    processGuess: function (guess) {
        var location = parseGuess(guess);
        if (location) {
            // null is a falsey value, wont run function
            if (model.numShips <= model.shipsSunk) {
                view.displayMessage("All Ulton are defeated!!!");
            } else {
                this.guesses++;
                var hit = model.fire(location);
                if (hit && model.shipsSunk === model.numShips) {
                    view.displayMessage(
                        "You defeated all Ulton <br> in " +
                            this.guesses +
                            " guesses."
                    );
                }
            }
        }
    },
};

function parseGuess(guess) {
    var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

    if (guess === null || guess.length !== 2) {
        alert("Please enter a letter and a number on the board.");
    } else {
        var firstChar = guess.charAt(0);
        var row = alphabet.indexOf(firstChar); // typeof row: string;
        var column = guess.charAt(1); // typeof column: string;
        // console.log(typeof row);
        // console.log(typeof column);

        if (isNaN(row) || isNaN(column)) {
            // check NaN
            alert("That isn't on the board");
        } else if (
            row < 0 ||
            row >= model.boardSize ||
            column < 0 ||
            column >= model.boardSize
        ) {
            alert("That's off the board");
        } else {
            return row + column; // Number + String = String
        }
    }
    return null;
}

function init() {
    var fireButton = document.getElementById("fireButton");
    fireButton.onclick = handleFireButton;
    var guessInput = document.getElementById("guessInput");
    guessInput.onkeypress = handleKeyPress;

    model.generateShipLocation();
}

function handleFireButton() {
    var guessInput = document.getElementById("guessInput"); // typeof: Object
    var guess = guessInput.value.toUpperCase(); // .value: change the type to String
    controller.processGuess(guess);

    guessInput.value = "";
}

function handleKeyPress(e) {
    var fireButton = document.getElementById("fireButton");
    if (e.keyCode === 13) {
        //13 = Return/ Enter button
        fireButton.click();
        return false; // stop the function from doing any action
    }
}

window.onload = init;

/*controller.processGuess("A0");

controller.processGuess("A6");
controller.processGuess("B6");
controller.processGuess("C6");

controller.processGuess("C4");
controller.processGuess("D4");
controller.processGuess("E4");

controller.processGuess("C5");

controller.processGuess("B0");
controller.processGuess("B1");
controller.processGuess("B2");

controller.processGuess("C6");

console.log(controller.guesses);
*/

/*console.log(parseGuess("AA"));
console.log(parseGuess("A1"));
console.log(parseGuess("D4"));
console.log(parseGuess("00"));
console.log(parseGuess("888"));
console.log(parseGuess("Z9"));
*/

/* view.displayMiss("00");
view.displayHit("34");
view.displayMiss("55");
view.displayHit("12");
view.displayMiss("25");
view.displayHit("26");
view.displayMessage("HIHI"); 
*/

/* model.fire("53");

model.fire("06");
model.fire("16");
model.fire("26");

model.fire("24");
model.fire("34");
model.fire("44");

model.fire("12");
model.fire("22");
model.fire("11");
model.fire("13");
model.fire("10");
*/
