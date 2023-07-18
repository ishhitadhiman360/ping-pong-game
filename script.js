alert("Welcome to the Ping Pong game!\nCurrent highscore is 5. Let's see if you can beat it!\nPress enter to start.");

var gameArea = document.getElementById("app");
var rod1 = document.getElementById("rod1");
var rod2 = document.getElementById("rod2");
var ball = document.getElementById("ball");

//initialising variables
var rounds = 0;
var score1 = 0;
var score2 =0;
var highscore =5;
localStorage.setItem("highscore", "5"); //adding highscore to local storage
var winner = " ";
localStorage.setItem("winner", " ");//adding winner to local storage

//height and width of rod1 and rod2 are same
var rodWidth = parseInt(getComputedStyle(rod1).width);
var rodHeight = parseInt(getComputedStyle(rod1).height);
var contWidth = parseInt(getComputedStyle(gameArea).width);
var contHeight = parseInt(getComputedStyle(gameArea).height);

//getting the constraints 
var maxWidth = contWidth - rodWidth;
var maxHeight = contHeight - rodHeight;

// ball properties
var ballWidth = parseInt(getComputedStyle(ball).width);
var ballHeight = parseInt(getComputedStyle(ball).height);
var ballSpeedX = 0; // horizontal speed of the ball
var ballSpeedY = 0; // vertical speed of the ball

// set the initial position of the ball
ball.style.top = "50%";
ball.style.left = "50%";

// update the ball position continuously
var startGame = setInterval(updateBall, 10);
initialise();//starts the game on pressing enter

function resetGame()
{
  // Reset the game
  ballSpeedX = 0;
  ballSpeedY = 0;
  score1 = 0;
  score2 = 0;
  // set the initial position of the ball
  ball.style.top = "50%";
  ball.style.left = "50%";
  //set the initial position of the rods
  rod1.style.top= "1%";
  rod2.style.top= "95%";
  rod1.style.left= "45%";
  rod2.style.left= "45%";

  initialise();
  var startGame = setInterval(updateBall, 10);
}

function stopgame(ballTop){
  if (ballTop <= 0 || ballTop >= contHeight - rodHeight) // ball hits the top or bottom edge of container 
  {
    //  either of rods missed the ball
    clearInterval(startGame); //stop the ball
    rounds += 1; // one round is over
    // Reset the game
    ballSpeedX = 0;
    ballSpeedY = 0;

    //check who won and print in alert box
    if(score1 > score2)
  {
      if(score1 > highscore)
      {
          highscore = score1;
          localStorage.setItem("highscore", score1);
      }
      localStorage.setItem("winner", "Player 1");
      var message= "Player 1 is the winner!\n Player 1 : " + score1 + "points\nPlayer 2: " + score2 + "points \nHighscore : " + highscore;
      alert(message);
  }
  else if(score2 > score1)
  {
      if(score2 > highscore)
      {
          highscore = score2;
          localStorage.setItem("highscore", score2);
      }
      localStorage.setItem("winner", "Player 2");
      var message= "Player 2 is the winner!\n Player 1 : " + score1 + "points\nPlayer 2: " + score2 + "points \nHighscore : " + highscore;
      alert(message);
  }
  else if(score2 == score1)
  {
      if(score2 > highscore)
      {
          highscore = score2;
          localStorage.setItem("highscore", score2);
      }
      var message= "It's A Tie! \n Player 1 : " + score1 + "points\nPlayer 2: " + score2 + "points \nHighscore : " + highscore;
      alert(message);
  }
  if (rounds < 3)//if rounds are still left
  {
    resetGame();
  }
  else 
  {
    // game is over
    alert("All rounds are over. Well played! :)\nPlease refresh the page to play again. ");
    resetGame();
  }
  }
  
}

// update ball position and check collisions
function updateBall() {
  var ballTop = parseInt(getComputedStyle(ball).top);
  var ballLeft = parseInt(getComputedStyle(ball).left);

  // update ball position
  ballTop += ballSpeedY;
  ballLeft += ballSpeedX;

  // check collision with rods
  if (
    ballTop <= rodHeight &&
    ballLeft >= parseInt(getComputedStyle(rod1).left) &&
    ballLeft <= parseInt(getComputedStyle(rod1).left) + rodWidth
  ) {
    // ball hit rod1, change direction
    score1 += 1;
    ballSpeedY = -ballSpeedY;
  } 
  else if (
    ballTop >= contHeight - rodHeight - ballHeight &&
    ballLeft >= parseInt(getComputedStyle(rod2).left) &&
    ballLeft <= parseInt(getComputedStyle(rod2).left) + rodWidth
  ) {
    // ball hit rod2, change direction
    score2 += 1;
    ballSpeedY = -ballSpeedY;
  }

  // check collision with container edges on left and right
  if (ballLeft <= 0 || ballLeft >=  contWidth - ballWidth) {
    ballSpeedX = -ballSpeedX;
  }

   // update ball position
   ball.style.top = Math.min(Math.max(ballTop, 0),  contHeight - ballHeight) + "px";
   ball.style.left = Math.min(Math.max(ballLeft, 0),  contWidth - ballWidth) + "px";

   stopgame(ballTop);
}

// to move the rods on pressing 'a' and 'd'
window.addEventListener('keypress', function(event){
    var key = event.key;

    //left value of rod1 and rod2 are same
    let left = parseInt(getComputedStyle(rod1).left); // Get the left value from CSS

    if(key == 'a' || key == 'A')
    {
        left -= 30;
        if(left <= 0){
            rod1.style.left = 0 + 'px';
            rod2.style.left = 0 + 'px';
            return;
        }
        rod1.style.left = left + 'px';
        rod2.style.left = left + 'px';
    }

    else if(key == 'd' || key == 'D')
    {
        left += 30;
        if(left >= maxWidth){
            rod1.style.left = maxWidth + 'px';
            rod2.style.left = maxWidth + 'px';
            return;
        }
        rod1.style.left = left + 'px';
        rod2.style.left = left + 'px';
    }

});

// to move the rods on pressing left and right arrow keys
window.addEventListener('keydown', function(event){
    //same algorithm for pressing left and right keys 
    var key = event.key;
    //left value of rod1 and rod2 are same
    let left = parseInt(getComputedStyle(rod1).left); // Get the left value from CSS

    if(key == 'ArrowLeft')
    {
        left -= 30;
        if(left <= 0){
            rod1.style.left = 0 + 'px';
            rod2.style.left = 0 + 'px';
            return;
        }
        rod1.style.left = left + 'px';
        rod2.style.left = left + 'px';
    }
    else if(key == 'ArrowRight')
    {
        left += 30;
        if(left >= maxWidth){
            rod1.style.left = maxWidth + 'px';
            rod2.style.left = maxWidth + 'px';
            return;
        }
        rod1.style.left = left + 'px';
        rod2.style.left = left + 'px';
    }
});

// start the game when the user presses Enter
function initialise(){
  window.addEventListener("keypress", function (event) {
    if (event.key === "Enter" && ballSpeedX === 0 && ballSpeedY === 0) {
      ballSpeedX = 3;
      ballSpeedY = -3;
    }
  });
}

  
  


