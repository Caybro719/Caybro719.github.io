const dino = document.getElementById('dino');
const obstacle = document.getElementById('obstacle');
const gameContainer = document.getElementById('gameContainer');
const homeScreen = document.getElementById('homeScreen');
const scoreElement = document.getElementById('score');
const scoreList = document.getElementById('scoreList');
const playerNameInput = document.getElementById('playerName'); // Player name input field

let dinoBottom = 20; // Initial position of the dino from the bottom
let obstacleLeft = 800; // Initial position of the obstacle
let isJumping = false;
let jumpHeight = 0;
let jumpSpeed = 10; // Speed of the jump
let fallSpeed = 3; // Speed of falling after peak
let obstacleSpeed = 5; // Speed of the obstacle
let score = 0;
let jumpCount = 0; // Tracks the number of jumps
const MAX_JUMPS = 2; // Maximum number of jumps (double jump)
let gameInterval;
let playerName = ''; // Player's name

function startGame() {
  // Get player name and validate it
  playerName = playerNameInput.value.trim();
  if (!playerName) {
    alert('Please enter your name!');
    return;
  }

  homeScreen.style.display = 'none';
  gameContainer.style.display = 'block';

  // Reset game state
  dino.style.bottom = dinoBottom + 'px';
  obstacle.style.left = obstacleLeft + 'px';
  score = 0;
  updateScore();

  // Game loop
  gameInterval = setInterval(updateGame, 20);

  // Add keyboard controls
  document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
      if (!isJumping || (jumpCount < MAX_JUMPS && !isFalling())) {
        isJumping = true;
        jumpCount++;
      }
    }
  });
}

function updateGame() {
  // Move obstacle
  obstacleLeft -= obstacleSpeed;
  if (obstacleLeft < -40) {
    obstacleLeft = 800;
    score += 1; // Increase score
    updateScore();
  }
  obstacle.style.left = obstacleLeft + 'px';

  // Dino jump mechanics
  if (isJumping) {
    jumpHeight += jumpSpeed;
    dino.style.bottom = (dinoBottom + jumpHeight) + 'px';

    if (jumpHeight > 100) {
      isJumping = false; // Start falling
    }
  } else {
    // Apply constant fall speed
    if (dinoBottom + jumpHeight > 20) {
      jumpHeight -= fallSpeed;
      dino.style.bottom = (dinoBottom + jumpHeight) + 'px';
    } else {
      jumpHeight = 0;
      dino.style.bottom = dinoBottom + 'px';
    }
  }

  // Check for collision
  if (obstacleLeft < 90 && obstacleLeft > 50 && dinoBottom + jumpHeight <= 60) {
    gameOver();
  }
}

function updateScore() {
  scoreElement.innerText = 'Score: ' + score;
  saveHighScore(score);
  displayLeaderboard();
}

function saveHighScore(newScore) {
  let highScores = JSON.parse(localStorage.getItem('highScores')) || [];
  highScores.push({ name: playerName, score: newScore });
  highScores.sort((a, b) => b.score - a.score); // Sort scores in descending order
  highScores = highScores.slice(0, 5); // Keep top 5 scores
  localStorage.setItem('highScores', JSON.stringify(highScores));
}

function displayLeaderboard() {
  let highScores = JSON.parse(localStorage.getItem('highScores')) || [];
  scoreList.innerHTML = highScores.map(entry => `<li>${entry.name}: ${entry.score}</li>`).join('');
}

function gameOver() {
  clearInterval(gameInterval);
  alert('Game Over!');
  homeScreen.style.display = 'flex';
  gameContainer.style.display = 'none'; 
  updateScore(); // Ensure the final score is updated and shown
}

// Initialize leaderboard display on page load
document.addEventListener('DOMContentLoaded', displayLeaderboard);
