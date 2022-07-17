
// learnings from this module of building a game: 
// 1. code is written either in functions or inside event listeners!
// 2. Dry Run to find why code is not working.
// 3. Console of chrome can tell you compilation errors.
// 4. for run time errors i.e the code not working as desired can be found by dry run or by printing in values by console.log(). 

var boxes = ["green", "red", "yellow", "blue"];

var gamePattern = [];

var userPattern = [];

var level = 0, countOfClicks = 0;


// the game will start on keypress.

$("body").keydown(function(){
	if(level == 0) nextSequence();
});


function checkAns(){
	if(level > 0) {
		// check if the user sequence matches the game pattern.
		var n = gamePattern.length;
		var m = userPattern.length;
		var j = 0, i;
		for( i=0; i<n && j<m; i++){
			if(gamePattern[i] != userPattern[j]){
				wrongAns();
				break;
			}
			j++;
		}

		if(i==n && userPattern.length == gamePattern.length){
			userPattern.splice(0, userPattern.length);
			setTimeout(function(){
				nextSequence();
			}, 1000);
		}
		// if matches then continue matching.
		// if not then set level to 0 and display wrong.
		// if the full sequence is correct then next sequence is called.
	}
}

function wrongAns(){
	$("h1").text("Wrong! Enter any key to start again");
	level = 0;
	userPattern.splice(0, userPattern.length);
	gamePattern.splice(0, gamePattern.length);
	var alertSound = new Audio("sounds/wrong.mp3");

	$("body").addClass("red");
	setTimeout(function(){
		$("body").removeClass("red");
	}, 250);
}


// a random color will be chosen and will be shown through animation.

function nextSequence(){
	level = level + 1;
	countOfClicks = 0;

	$("h1").text("Level " + level);
	var randomNo = Math.floor(Math.random()*4);
	var randomColor = boxes[randomNo];
	gamePattern.push(randomColor);

	$("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);

	var sound = new Audio("sounds/" + randomColor + ".mp3");
	sound.play();
}


$(".btn").click(function(){
	var userChosenBox = $(this).attr("id");
	userPattern.push(userChosenBox);

	var color = $(this).attr("id");
	var sound = new Audio("sounds/" + color + ".mp3");
	sound.play();

	$("#" + color).addClass("pressed");
	setTimeout(function(){
		$("#" + color).removeClass("pressed");
	}, 200);

	checkAns();

	// console.log(userPattern);
});












// if user clicks that box then level 2 and choose color again.

// now if user selcts the same sequence as before that is the prev random number and then the curr one then 
// if sequence is correct then level 3 and again another random number.
// else game over.

// repeat the game on key press
