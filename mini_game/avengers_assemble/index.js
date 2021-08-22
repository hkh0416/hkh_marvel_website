let buttonColor = ["green", "red", "yellow", "blue"];
let gameStarted = false;
let gameStatus = false; // for 1 & 2
let gamePattern = [];
let userClickedPattern = [];
let level = 0;

// Press key to start game
$("body").keypress(function () {
    if (!gameStarted) {
        gameStarted = true;
        nextSequence();
    }
});

// Button trigger
$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    if (gameStatus) {
        //Won't trigger effect if passing to (1) next level or (2) game over
        userClickedPattern.push(userChosenColour);
        buttonPressed(userChosenColour);
        checkAnswer(userClickedPattern.length);
        console.log(userClickedPattern);
        console.log(gamePattern);
    }
});

// Check for correct answer
function checkAnswer(currentLevel) {
    for (let i = 0; i < currentLevel; i++) {
        if (gamePattern[i] !== userClickedPattern[i]) {
            wrongAnswer();
        }
        if (i + 1 === gamePattern.length) {
            gameStatus = false; // 1. disable buttonPressed effect when passing to next level
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
}

// Generate new sequence
function nextSequence() {
    gameStatus = true; // 1. enable buttonPressed effect when starting a new level
    userClickedPattern = [];
    level++;
    $("h2").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let chosenColour = buttonColor[randomNumber];
    gamePattern.push(chosenColour);
    $("#" + chosenColour)
        .fadeOut(100)
        .fadeIn(100);
    playAudio(chosenColour);
}

// PLay 4 color or wrong music
function playAudio(music) {
    let sound = new Audio("sounds/" + music + ".mp3");
    sound.play();
}

// Action after button pressed
function buttonPressed(color) {
    $("." + color).addClass("glow-effect");
    setTimeout(function () {
        $("." + color).removeClass("glow-effect");
    }, 100);
    playAudio(color);
}

// Action for wrong answer
function wrongAnswer() {
    $("h2").text("Game over. Press Any Key to Restart");
    $("body").addClass("red");
    setTimeout(function () {
        $("body").removeClass("red");
    }, 150);
    playAudio("wrong");
    restart();
}

// Restart
function restart() {
    gameStarted = false;
    gameStatus = false; //2. disable buttonPressed effect when game over
    level = 0;
    gamePattern = [];
}
