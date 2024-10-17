$(document).keypress(function () {
    startGame();
});

var buttonColors = ["red", "blue", "green", "yellow", "wrong"];
var level = 0;
var gamePattern = [];
var userPattern = [];
var isRunning = false;

function startGame() {
    gamePattern = [];
    userPattern = [];
    level = 0;
    isRunning = true;
    nextSequence();
}

function nextSequence() {

    userPattern = [];
    level++;

    $("h1").text("Level " + level);
    var pickedColor = Math.floor(Math.random() * 4);
    gamePattern.push(pickedColor);

    showPattern(gamePattern[gamePattern.length - 1], gamePattern[gamePattern.length - 1]);
}

$(".btn").click(function () {
    if(!isRunning) return;

    var userChosenTile = $(this).attr("id");
    userTile = buttonColors.indexOf(userChosenTile);
    userPattern.push(userTile);

    if (userTile !== gamePattern[userPattern.length-1]) {
        showPattern(userTile, 4);
        $("h1").text("Game Over, Press Any Key to Restart");
        isRunning = false;
    }else if(userPattern.length === gamePattern.length){
        showPattern(userTile, userTile);
        if(level === 3){
            $("h1").text("You Won! Press Any Key to Restart");
            isRunning = false;
        }else{
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }else{
        showPattern(userTile, userTile);
    }
});

function showPattern(tile, sound) {
    $("#" + buttonColors[tile]).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/" + buttonColors[sound] + ".mp3");
    audio.play();
}
