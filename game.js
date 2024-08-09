let btnColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];


var started = false;
var level = 0;


$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      $("#instruction").hide();
      nextSequence();
      started = true;
    }
  });


$(".btn").click(function(){
    var userChosenColour = $(this).attr("id")
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour)
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length - 1)
})


function nextSequence() {
    level++
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = btnColors[randomNumber];
    gamePattern.push(randomChosenColour);
  
    animatePress(randomChosenColour)
  
    playSound(randomChosenColour)
  }

function checkAnswer(clickLevel){
  console.log(clickLevel)
    if (userClickedPattern[clickLevel]===gamePattern[clickLevel]){
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence()
          }, 1000)
          userClickedPattern = []
        }
        }else{
        playSound("wrong")
        $("body").addClass("game-over")
        setTimeout(function(){
          $("body").removeClass("game-over")
        }, 1000)
        $("#level-title").text("Game Over!");
        $("#instruction").show();
        startOver()
    }
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }


function animatePress(color){
    $("#" + color).fadeIn(100).fadeOut(100).fadeIn(100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = []
  started = false;
}

