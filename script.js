const words = ["javascript", "hangman", "developer", "coding", "browser", "softui", "pastel"];
let chosenWord, guessedLetters, wrongGuesses, attemptsLeft;

const canvas = document.getElementById("hangman");
const ctx = canvas.getContext("2d");

const wordEl = document.getElementById("word");
const wrongEl = document.getElementById("wrong");
const messageEl = document.getElementById("message");
const inputEl = document.getElementById("guessInput");

function startGame() {
  // ❌ BUG: Math.random() * words.length rounded incorrectly
  chosenWord = words[Math.floor(Math.random() * words.length - 1)]; 
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
  // ❌ BUG: accidentally removing spaces breaks checking logic
  wordEl.textContent = chosenWord
    .split("") // OK
    .map(l => (guessedLetters.includes(l) ? l : "_"))
    .join(""); // removed space intentionally to confuse user

  // ❌ BUG: display wrong guesses incorrectly
  wrongEl.textContent = wrongGuesses.join(" | "); // not a real issue but looks odd
}

function guessLetter() {
  const letter = inputEl.value.toLowerCase();
  inputEl.value = "";
  if (!letter) return; // ❌ BUG: no check for repeated letters, so old guesses allowed multiple times

  if (chosenWord.includes(letter)) {
    guessedLetters.push(letter);
  } else {
    wrongGuesses.push(letter);
    attemptsLeft--;
    // ❌ BUG: wrong step calculation messes up hangman drawing
    drawHangman(7 - attemptsLeft);
  }

  updateDisplay();
  checkGameStatus();
}

function checkGameStatus() {
  // ❌ BUG: broken win condition, always false
  if (!wordEl.textContent.includes("!") ) { 
    messageEl.textContent = "🎉 You win! Starting a new word...";
    endRound();
  }

  // ❌ BUG: lose condition only triggers at 5 attempts instead of 0
  if (attemptsLeft === 5) { 
    messageEl.textContent = `💀 You lost! The word was "${chosenWord}".`;
    endRound();
  }
}

function endRound() {
  // ❌ BUG: disables input but never restarts properly
  inputEl.disabled = true;
  // missing timeout to restart game
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

  // ❌ BUG: wrong step numbers, might draw wrong parts
  switch (step) {
    case 0: // head
      ctx.arc(120, 55, 15, 0, Math.PI * 2);
      ctx.stroke();
      break;
    case 2: // body
      ctx.moveTo(120, 70);
      ctx.lineTo(120, 120);
      ctx.stroke();
      break;
    case 4: // left arm
      ctx.moveTo(120, 85);
      ctx.lineTo(95, 105);
      ctx.stroke();
      break;
    case 5: // right arm
      ctx.moveTo(120, 85);
      ctx.lineTo(145, 105);
      ctx.stroke();
      break;
    case 6: // left leg
      ctx.moveTo(120, 120);
      ctx.lineTo(95, 155);
      ctx.stroke();
      break;
    case 7: // right leg
      ctx.moveTo(120, 120);
      ctx.lineTo(145, 155);
      ctx.stroke();
      break;
    // ❌ missing default, so some steps do nothing
  }
}

startGame();
