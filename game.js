var words = [
  "javascript", "hangman", "coding", "website", "browser",
  "keyboard", "galaxy", "python", "robot", "pixel",
  "matrix", "hacker", "binary", "crypto", "dragon",
  "wizard", "arcade", "zombie", "ninja", "laser",
  "phantom", "thunder", "volcano", "eclipse", "nebula",
  "quantum", "circuit", "chrome", "glitch", "vertex",
  "plasma", "photon", "cipher", "prism", "vortex",
  "anchor", "blizzard", "compass", "dagger", "enigma",
  "falcon", "gravity", "horizon", "inferno", "jungle",
  "lantern", "mammoth", "octopus", "panther", "riddle",
  "shadow", "tornado", "unicorn", "velvet", "whisper",
  "abstract", "buffalo", "chimera", "dungeon", "furnace",
  "gargoyle", "iceberg", "jukebox", "ketchup", "labyrinth",
  "mustang", "origami", "paradox", "quicksand", "saffron",
  "tangent", "umbrella", "vagrant", "wraith", "zeppelin"
];

var word = "";
var guessed = [];
var wrong = 0;
var maxWrong = 6;
var gameOver = false;

var canvas = document.getElementById("hangman");
var ctx = canvas.getContext("2d");

function pickWord() {
  word = words[Math.floor(Math.random() * words.length)];
}

function drawHangman() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#ff6ec7";
  ctx.lineWidth = 3;
  ctx.lineCap = "round";

  // base
  if (wrong >= 1) {
    ctx.beginPath();
    ctx.moveTo(20, 200);
    ctx.lineTo(100, 200);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(60, 200);
    ctx.lineTo(60, 30);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(60, 30);
    ctx.lineTo(130, 30);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(130, 30);
    ctx.lineTo(130, 50);
    ctx.stroke();
  }
  // head
  if (wrong >= 2) {
    ctx.beginPath();
    ctx.arc(130, 70, 20, 0, Math.PI * 2);
    ctx.stroke();
  }
  // body
  if (wrong >= 3) {
    ctx.beginPath();
    ctx.moveTo(130, 90);
    ctx.lineTo(130, 145);
    ctx.stroke();
  }
  // left arm
  if (wrong >= 4) {
    ctx.beginPath();
    ctx.moveTo(130, 105);
    ctx.lineTo(100, 130);
    ctx.stroke();
  }
  // right arm
  if (wrong >= 5) {
    ctx.beginPath();
    ctx.moveTo(130, 105);
    ctx.lineTo(160, 130);
    ctx.stroke();
  }
  // legs
  if (wrong >= 6) {
    ctx.beginPath();
    ctx.moveTo(130, 145);
    ctx.lineTo(105, 185);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(130, 145);
    ctx.lineTo(155, 185);
    ctx.stroke();
  }
}

function updateWord() {
  var display = "";
  for (var i = 0; i < word.length; i++) {
    if (guessed.indexOf(word[i]) !== -1) {
      display += word[i];
    } else {
      display += "_";
    }
  }
  document.getElementById("word").textContent = display;
  return display.indexOf("_") === -1;
}

function guess(letter) {
  if (gameOver || guessed.indexOf(letter) !== -1) return;

  guessed.push(letter);
  var btn = document.querySelector('[data-letter="' + letter + '"]');

  if (word.indexOf(letter) !== -1) {
    btn.classList.add("correct");
    btn.disabled = true;
    if (updateWord()) {
      document.getElementById("message").textContent = "YOU WIN!";
      document.getElementById("message").style.color = "#00ffcc";
      gameOver = true;
      document.getElementById("restart").style.display = "inline-block";
      disableAll();
    }
  } else {
    btn.classList.add("wrong");
    btn.disabled = true;
    wrong++;
    drawHangman();
    if (wrong >= maxWrong) {
      document.getElementById("message").textContent = 'GAME OVER! It was "' + word + '"';
      document.getElementById("message").style.color = "#ff4444";
      gameOver = true;
      document.getElementById("restart").style.display = "inline-block";
      updateWord();
      disableAll();
    }
  }
}

function disableAll() {
  var keys = document.querySelectorAll(".key");
  for (var i = 0; i < keys.length; i++) {
    keys[i].disabled = true;
  }
}

function buildKeyboard() {
  var kb = document.getElementById("keyboard");
  kb.innerHTML = "";
  var letters = "abcdefghijklmnopqrstuvwxyz";
  for (var i = 0; i < letters.length; i++) {
    var btn = document.createElement("button");
    btn.className = "key";
    btn.textContent = letters[i];
    btn.setAttribute("data-letter", letters[i]);
    btn.addEventListener("click", (function(l) {
      return function() { guess(l); };
    })(letters[i]));
    kb.appendChild(btn);
  }
}

function init() {
  word = "";
  guessed = [];
  wrong = 0;
  gameOver = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  document.getElementById("message").textContent = "";
  document.getElementById("restart").style.display = "none";
  pickWord();
  buildKeyboard();
  updateWord();
}

document.getElementById("restart").addEventListener("click", init);

document.addEventListener("keydown", function(e) {
  var letter = e.key.toLowerCase();
  if (letter.length === 1 && letter >= "a" && letter <= "z") {
    guess(letter);
  }
});

init();
