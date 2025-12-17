const words = ["javascript", "hangman", "developer", "coding", "browser", "softui", "pastel"];
let chosenWord, guessedLetters, wrongGuesses, attemptsLeft;

const canvas = document.getElementById("hangman");
const ctx = canvas.getContext("2d");

const wordEl = document.getElementById("word");
const wrongEl = document.getElementById("wrong");
const messageEl = document.getElementById("message");
const inputEl = document.getElementById("guessInput");

function startGame() {
  chosenWord = words[Math.floor(Math.random() * words.length)];
  guessedLetters = [];
  wrongGuesses = [];
  attemptsLeft = 6;
  messageEl.textContent = "";
  inputEl.disabled = false;
  inputEl.focus();
  clearCanvas();
  drawGallows();
  updateDisplay();
}

function updateDisplay() {
  wordEl.textContent = chosenWord
    .split("")
    .map(l => (guessedLetters.includes(l) ? l : "_"))
    .join(" ");

  wrongEl.textContent = wrongGuesses.join(", ");
}

function guessLetter() {
  const letter = inputEl.value.toLowerCase();
  inputEl.value = "";
  if (!letter || guessedLetters.includes(letter) || wrongGuesses.includes(letter)) return;

  if (chosenWord.includes(letter)) {
    guessedLetters.push(letter);
  } else {
    wrongGuesses.push(letter);
    attemptsLeft--;
    drawHangman(6 - attemptsLeft);
  }

  updateDisplay();
  checkGameStatus();
}

function checkGameStatus() {
  if (!wordEl.textContent.includes("_")) {
    messageEl.textContent = "🎉 You win! Starting a new word...";
    endRound();
  }

  if (attemptsLeft === 0) {
    messageEl.textContent = `💀 You lost! The word was "${chosenWord}".`;
    endRound();
  }
}

function endRound() {
  inputEl.disabled = true;
  setTimeout(startGame, 2000);
}

/* Drawing Functions */

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawGallows() {
  ctx.strokeStyle = "#555";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(10, 190);
  ctx.lineTo(190, 190);
  ctx.moveTo(40, 190);
  ctx.lineTo(40, 20);
  ctx.lineTo(120, 20);
  ctx.lineTo(120, 40);
  ctx.stroke();
}

function drawHangman(step) {
  ctx.strokeStyle = "#444";
  ctx.lineWidth = 2;
  ctx.beginPath();

  switch (step) {
    case 1: // Head
      ctx.arc(120, 55, 15, 0, Math.PI * 2);
      ctx.stroke();
      break;
    case 2: // Body
      ctx.moveTo(120, 70);
      ctx.lineTo(120, 120);
      ctx.stroke();
      break;
    case 3: // Left arm
      ctx.moveTo(120, 85);
      ctx.lineTo(95, 105);
      ctx.stroke();
      break;
    case 4: // Right arm
      ctx.moveTo(120, 85);
      ctx.lineTo(145, 105);
      ctx.stroke();
      break;
    case 5: // Left leg
      ctx.moveTo(120, 120);
      ctx.lineTo(95, 155);
      ctx.stroke();
      break;
    case 6: // Right leg
      ctx.moveTo(120, 120);
      ctx.lineTo(145, 155);
      ctx.stroke();
      break;
  }
}

startGame();
