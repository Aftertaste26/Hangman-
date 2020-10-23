const dictionary = [
  "Clash of Clans",
  "Minecraft",
  "Five Nights at Freddy's",
  "Need for Speed Most Wanted",
  "Grand Theft Auto Vice City",
  "Fortnite",
  "Rocket League",
  "The Legend Of Zelda",
  "League Of Legends",
  "Call Of Duty",
  "PlayerUnknown's Battlegrounds",
];

let wordToGuess;
let guessed;
let timeLimit;
let wrongCount = 0;
let started = false;

const sprites = [
  "assets/hangman_sprite/hangman0000.png",
  "assets/hangman_sprite/hangman0001.png",
  "assets/hangman_sprite/hangman0002.png",
  "assets/hangman_sprite/hangman0003.png",
  "assets/hangman_sprite/hangman0004.png",
  "assets/hangman_sprite/hangman0005.png",
  "assets/hangman_sprite/hangman0006.png",
];

const timer = (time) => () => {
  const now = new Date().getTime();
  const distance = time - now;
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  document.getElementById("timer").innerHTML = minutes + "m " + seconds + "s ";

  if (distance < 0) {
    gameOver();
  }
};

const startGame = () => {
  resetALL();
  const ramdomPick = Math.floor(Math.random() * 1000) % dictionary.length;
  wordToGuess = dictionary[ramdomPick];
  guessed = generatePlaceholders(wordToGuess);
  document.getElementById("placeholders").innerHTML = guessed;
  timeLimit = setInterval(timer(1 * 60000 + Date.now()), 1000);
  started = true;
};

const pickLetter = (letter) => {
  if (started) guessed = checkMatch(letter, wordToGuess, guessed);
};

const generatePlaceholders = (string) => {
  return string.replace(/\w/g, "_");
};

const checkMatch = (guess, wordToGuess, guessed) => {
  let output = "";
  for (const index in wordToGuess) {
    output +=
      guessed[index] != "_"
        ? guessed[index]
        : guess.toUpperCase() == wordToGuess[index].toUpperCase()
        ? wordToGuess[index]
        : "_";
  }

  if (guessed == output) {
    document.getElementById("sprite-img").src = sprites[wrongCount];
    wrongCount++;
  }

  if ([...output].every((elements) => elements != "_")) {
    output = wordToGuess;
    alert("you got it");
    resetALL();
  }

  if (wrongCount > 6) {
    output = wordToGuess;
    gameOver();
  }
  document.getElementById("placeholders").innerHTML = output;
  return output;
};

const gameOver = () => {
  clearInterval(timeLimit);
  document.getElementById("timer").innerHTML = "GAME OVER!!";
  document.getElementById("placeholders").innerHTML = wordToGuess;
  document.getElementById("sprite-img").src = sprites[6];
  alert("GAME OVER!");
  started = false;
};

const resetALL = () => {
  wrongCount = 0;
  resetKeyboard();
  clearInterval(timeLimit);
  document.getElementById("sprite-img").src = sprites[0];
};

////////////////////////////////////////////////////////////////

const init = () => {
  const main = document.createElement("div");
  main.classList.add("keyboard");
  main.id = "keyboard";
  main.appendChild(keysContainer(createKeys()));
  document.getElementById("game-display-container").appendChild(main);
};

const keysContainer = (keys) => {
  const container = document.createElement("div");
  container.classList.add("keyboard__keys");
  container.appendChild(keys);
  return container;
};

const resetKeyboard = () => {
  const keyboard = document.getElementById("keyboard");
  keyboard.childNodes[0].remove();
  keyboard.appendChild(keysContainer(createKeys()));
};

const createKeys = () => {
  const fragment = document.createDocumentFragment();
  const keyLayout = [
    "q",
    "w",
    "e",
    "r",
    "t",
    "y",
    "u",
    "i",
    "o",
    "p",
    "a",
    "s",
    "d",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    "z",
    "x",
    "c",
    "v",
    "b",
    "n",
    "m",
  ];

  keyLayout.forEach((key) => {
    const keyElement = document.createElement("button");
    const insertLineBreak = ["p", "l", "?"].indexOf(key) !== -1;

    keyElement.setAttribute("type", "button");
    keyElement.classList.add("keyboard__key");
    keyElement.textContent = key.toLowerCase();
    keyElement.addEventListener("click", () => {
      keyElement.style.visibility = "hidden";
      pickLetter(key.toLowerCase());
    });

    fragment.appendChild(keyElement);
    if (insertLineBreak) fragment.appendChild(document.createElement("br"));
  });

  return fragment;
};

window.addEventListener("DOMContentLoaded", init);
