var buttonColours=["red","blue","green","yellow"];

var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;
$(document).keydown(function()
{
    if(!started)
    {
        $("#level-title").text("Level"+level);
        nextSequence();
        started=true;
    }
});
$(".btn").click(function()
{   
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});
function nextSequence()
{level++;
    $("#level-title").text("Level "+level);
    
    var randomNumber=Math.floor(Math.random()*3)+1;

    var randomChosenColour = buttonColours[randomNumber];
  
    //6. Add the new randomChosenColour generated in step 4 to the end of the gamePattern.
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
    
   
}
function playSound(name)
{
    var a=new Audio("sounds/"+name+".mp3");
    a.play();
}
function animatePress(currentColour)
{
    $("#"+currentColour).addClass("pressed");
    setTimeout (function()
    {
        $("#"+currentColour).removeClass("pressed");
    },100)
}
function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel])
    {
        if(gamePattern.length==userClickedPattern.length)
        {
            setTimeout(function()
            {
                nextSequence();
            },1000);
        }
        else{
            playSound("wrong");
            $("#level-title").text("Game Over, Press Any Key to Restart");
            
            $("body").addClass("game-over");
            setTimeout(function()
        { $("body").removeClass("game-over");
        },200);
        startOver();
       
           
        }
    }
    else
    {
playSound("wrong");
 $("#level-title").text("Game Over, Press Any Key to Restart");
 $("body").addClass("game-over");
setTimeout(function()
{
    $("body").removeClass("game-over");
},200)
startOver();

    }

}
function startOver()
{
    level=0;
    started=false;
    gamePattern=[];
    userClickedPattern=[];
}