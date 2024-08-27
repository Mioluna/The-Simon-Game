
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var gameStarted = false;
var level = 0;

var wrongSound = new Audio("sounds/wrong.mp3");


$(document).keydown(function() {
    if (!gameStarted) {
      $("#level-title").text("Level " + level);
      nextSequence();
      gameStarted = true;
    }
  });

  $(".btn").on("click", function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer((userClickedPattern.length) - 1);
});

function nextSequence(){

    level++;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor((Math.random() * 4));
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    
    
    $("#"+ randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

}



function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
$("#" + currentColor).addClass("pressed")
setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");

},100);
}

function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] != userClickedPattern[currentLevel])
    {
        wrongSound.play();
        $("body").addClass("game-over")

        setTimeout(function() {
        $("body").removeClass("game-over");
        },200);

        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }

    if(gamePattern.length == userClickedPattern.length)
    {
        setTimeout(nextSequence, 1000);
        userClickedPattern = [];
    }
    
}

function startOver()  {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    gameStarted = false;
}

