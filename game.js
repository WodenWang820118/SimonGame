var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var checkTime = 3000;

/**
 * The function to generate the next random color
 */
function nextSequence() {
    randomNumber = Math.floor(Math.random()*buttonColors.length);
    randomChosenColor = buttonColors[randomNumber];
    showAndSound(randomChosenColor);   
    gamePattern.push(randomChosenColor);
    return gamePattern;
}

/**
 * use the setTimeout method to generate the animation when the computer
 * generate the random color; or when the use click the color button
 * @param {} color 
 */
function showAndSound(color) {
    $("."+color).css("opacity",0.5);
    sound = new Audio("sounds/"+color+".mp3");
    sound.play();
    setTimeout(function(){$("."+color).css("opacity", 1);}, 500);
}

/**
 * will save any clicked buttons to the userClickedPattern
 */
$(".btn").click(function(){
    var userChoice = $(this).attr("id");
    userClickedPattern.push(userChoice);
    showAndSound(userChoice);
    console.log(userClickedPattern);
})

/**
 * press any key to activate the new game
 */
$(document).on("keyup", game);

/**
 * whether the userClickedPattern equals the gamePattern
 */
function checkAnswer(){
    if (gamePattern.length===userClickedPattern.length) {
        for (var i = 0; i < gamePattern.length; i++){
            if (gamePattern[i] !== userClickedPattern[i]) {
                console.log("wrong");
                gameOver();
                setTimeout(gameOverReset,200);
                return;
            }
            else {
                console.log("success");
                level += 1;
                return setTimeout(game,3000);
            }
        }
    } else {
        console.log("wrong");
                gameOver();
                setTimeout(gameOverReset,200);
                return;
    }    
}
/**
 * game over, add the game-over background
 */
function gameOver(){
    $("body").addClass("game-over");
}
/**
 * remove the background to the default color;
 * reset the gamePttern and the userClickedPattern array
 */
function gameOverReset(){
    $("body").removeClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    gamePattern = [];
    userClickedPattern = [];
}

/**
 * the game process. 
 * 1. each time computer generates a random color and reset the userClickedPattern
 * 2. check the answer every 3 seconds, each success will increase 1 second to check again
 */
function game() {
    // the random number for the user
    nextSequence();
    $("#level-title").text("Level "+level);
    console.log(gamePattern);
    // set the userClickedPattern to an empty array to re-put new click buttons
    userClickedPattern = [];

    setTimeout(checkAnswer,checkTime);
    checkTime += 1000;   
}