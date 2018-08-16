// Game Values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Variables
const UIgame = document.querySelector('#game'),
      UIminNum = document.querySelector('.min-num'),
      UImaxNum = document.querySelector('.max-num'),
      UIguessInput = document.querySelector('#guess-input'),
      UIguessBtn = document.querySelector('#guess-button'),
      UImessage = document.querySelector('.message');

// Set min and max
UIminNum.textContent = min;
UImaxNum.textContent = max;

// Play again
UIguessBtn.addEventListener('mousedown', function(e) {
  if(e.target.className === 'play-again') {
    window.location.reload();
  }
});

// Listen for guess
UIguessBtn.addEventListener('click', function(e) {
  let guess = parseInt(UIguessInput.value);

  // Validate Guess
  if (isNaN(guess) || guess < min || guess > max) {
    UIguessInput.value = '';
    setMessage(`Please enter a number between ${min} and ${max}.`, 'red');
  } else {
    // Check if won
    if (guess === winningNum) {
      // game over - you won
      gameOver(true, `${winningNum} is correct, YOU WIN!`);
    } else {
      guessesLeft -= 1;

      if (guessesLeft === 0) {
        // game over - you lost
        gameOver(false, `Game over, YOU LOST! The correct number was ${winningNum}.`);
      } else {
        UIguessInput.value = '';
        setMessage(`${guess} is not correct, ${guessesLeft} guesses left.`);
      }
    }
  }
});

// Game over
function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red';

  UIguessInput.disabled = true;
  UIguessInput.style.borderColor = color;
  UImessage.style.color = color;
  setMessage(msg);

  // Play again
  UIguessBtn.value = 'Play again';
  UIguessBtn.className += 'play-again';
}

// Get Random Number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
  
}

// Set Message
function setMessage(msg, color) {
  UImessage.textContent = msg;
  UImessage.style.color = color;
}