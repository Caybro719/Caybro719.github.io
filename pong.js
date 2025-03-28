// Get the canvas and context
const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// Set initial positions for paddles and ball
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 3; // Speed of the ball in the X direction
let ballSpeedY = 3; // Speed of the ball in the Y direction

let player1Y = canvas.height / 2 - 50; // Initial position of player 1 paddle 
let player2Y = canvas.height / 2 - 50; // Initial position of player 2 paddle
const paddleWidth = 10;
const paddleHeight = 100;

// Variables to handle player controls
let player1UpPressed = false;
let player1DownPressed = false;
let player2UpPressed = false;
let player2DownPressed = false;

// Score variables
let player1Score = 0;
let player2Score = 0;
const maxScore = 100; // Maximum score to win the game
  

// Function to draw the ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, 10, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
}

// Function to draw paddles
function drawPaddles() {
    // Draw player 1 paddle
    ctx.fillStyle = 'white';
    ctx.fillRect(0, player1Y, paddleWidth, paddleHeight);

    // Draw player 2 paddle
    ctx.fillRect(canvas.width - paddleWidth, player2Y, paddleWidth, paddleHeight);
}

// Function to handle collisions and game logic
function update() {
    // Move ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Handle collisions with top and bottom walls
    if (ballY - 10 < 0 || ballY + 10 > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    // Handle collisions with paddles or scoring
    if (ballX - 10 < 0) {
        if (ballY > player1Y && ballY < player1Y + paddleHeight) {
            ballSpeedX *= 1.2
            ballSpeedY *= 1.2
            ballSpeedX = -ballSpeedX;
        } else {
            player2Score++;
            resetBall();
        }
    }
    if (ballX + 10 > canvas.width) {
        if (ballY > player2Y && ballY < player2Y + paddleHeight) {
            ballSpeedX *= 1.2
            ballSpeedY *= 1.2
            ballSpeedX = -ballSpeedX;
        } else {
            player1Score++;
            resetBall();
        }
    }

    // Update player paddle positions based on key presses
    if (player1UpPressed && player1Y > 0) {
        player1Y -= 7;
    } else if (player1DownPressed && player1Y + paddleHeight < canvas.height) {
        player1Y += 7;
    }

    if (player2UpPressed && player2Y > 0) {
        player2Y -= 7;
    } else if (player2DownPressed && player2Y + paddleHeight < canvas.height) {
        player2Y += 7;
    }

    // Check if a player has won
    if (player1Score >= maxScore || player2Score >= maxScore) {
        endGame();
    }
}

// Function to reset the ball position
function resetBall() {
    console.log(ballSpeedX)
    console.log(ballSpeedY)
    ballSpeedX = 3
    ballSpeedY = 3
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX; // Change ball direction after reset
}

// Function to draw everything on the canvas
function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw elements
    drawBall();
    drawPaddles();

    // Draw scores
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(player1Score, 100, 50);
    ctx.fillText(player2Score, canvas.width - 130, 50);

    // Update game logic
    update();

    // Request animation frame to continue game loop
    requestAnimationFrame(draw);
}

// Function to handle game end
function endGame() {
    // Display winner
    let winner = (player1Score >= maxScore) ? "Player 1" : "Player 2";
    alert(`${winner} wins the game!`);

    // Reset scores
    player1Score = 0;
    player2Score = 0;

    ballSpeedX = 3;
    ballSpeedY = 3;

    // Reset ball position
    resetBall();
}

// Event listeners for player controls
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

// Key down handler function
function keyDownHandler(event) {
    if (event.key === 'w') {
        player1UpPressed = true;
    } else if (event.key === 's') {
        player1DownPressed = true;
    }

    if (event.key === 'ArrowUp') {
        player2UpPressed = true;
    } else if (event.key === 'ArrowDown') {
        player2DownPressed = true;
    }
}

// Key up handler function
function keyUpHandler(event) {
    if (event.key === 'w') {
        player1UpPressed = false;
    } else if (event.key === 's') {
        player1DownPressed = false;
    }

    if (event.key === 'ArrowUp') {
        player2UpPressed = false;
    } else if (event.key === 'ArrowDown') {
        player2DownPressed = false;
    }
}



// Start the game loop
draw();
