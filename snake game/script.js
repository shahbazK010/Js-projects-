const playBoard = document.querySelector(".play-board");
const scoreEl = document.querySelector(".score");
const highscoreEl = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");

let gameOver = false;
let foodX, foodY;
let snakeX = 5,
	snakeY = 5;
let velocityX = 0,
	velocityY = 0;
let snakebody = [];
let setIntervalId;
let score = 0;

///// get highscore from local storage

let highscore = localStorage.getItem("high-score") || 0;
highscoreEl.innerText = `High Score: ${highscore}`;

///pass a random between 1 and 30 as food position

const updateFoodPosition = () => {
	foodX = Math.floor(Math.random() * 30) + 1;
	foodY = Math.floor(Math.random() * 30) + 1;
};
const handleGameover = () => {
	clearInterval(setIntervalId);
	alert("Game over press OK replay");
	location.reload();
};

////change velocity and value based on key press

const changeDirection = (e) => {
	if (e.key === "ArrowUp" && velocityY != 1) {
		velocityX = 0;
		velocityY = -1;
	} else if (e.key === "ArrowDown" && velocityY != -1) {
		velocityX = 0;
		velocityY = 1;
	} else if (e.key === "ArrowLeft" && velocityX != 1) {
		velocityX = -1;
		velocityY = 0;
	} else if (e.key === "ArrowRight" && velocityX != -1) {
		velocityX = 1;
		velocityY = 0;
	}
};
////////change direction on each key click

controls.forEach((button) =>
	button.addEventListener("click", () =>
		changeDirection({ key: button.dataset.key })
	)
);

const initGame = () => {
	if (gameOver) return handleGameover();
	// let html = `<div class='food' style= 'grid-area': ${foodY} / ${foodX}></div>`;
	let html = `<div class='food' style= 'grid-area: ${foodY} / ${foodX}'></div>`;

	//when snake eat food
	if (snakeX === foodX && snakeY === foodY) {
		updateFoodPosition();
		snakebody.push([foodY, foodX]); // add food to snake body
		score++;
		highscore = score >= highscore ? score : highscore; // if score > high score => highscore

		localStorage.setItem("high-score", highscore);
		scoreEl.innerText = `Score: ${score}`;
		highscoreEl.innerText = `High Score: ${highscore}`;
	}

	//update snake head

	snakeX += velocityX;
	snakeY += velocityY;

	///shifting forward value of elemens in snake body  by one
	for (let i = snakebody.length - 1; i > 0; i--) {
		snakebody[i] = snakebody[i - 1];
	}
	snakebody[0] = [snakeX, snakeY];

	///check snake body is out of the wall or not
	// if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) return gameOver;
	if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30)
		return (gameOver = true);

	// add dive for each part of snake body

	for (let i = 0; i < snakebody.length; i++) {
		html += `<div class = 'head' style = 'grid-area: ${snakebody[i][1]} / ${snakebody[i][0]}'></div>`;

		// check snake head hit body or not

		if (
			i !== 0 &&
			snakebody[0][1] === snakebody[i][1] &&
			snakebody[0][0] === snakebody[i][0]
		) {
			gameOver = true;
		}
	}
	playBoard.innerHTML = html;
};

updateFoodPosition();
setIntervalId = setInterval(initGame, 100);
document.addEventListener("keyup", changeDirection);
