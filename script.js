const cardsArray = [
  { name: "A", img: "A" },
  { name: "B", img: "B" },
  { name: "C", img: "C" },
  { name: "D", img: "D" },
  { name: "E", img: "E" },
  { name: "F", img: "F" },
  { name: "G", img: "G" },
  { name: "H", img: "H" },
];

let gameGrid = cardsArray.concat(cardsArray);
gameGrid.sort(() => 0.5 - Math.random());

const gameBoard = document.getElementById("gameBoard");
const attemptsDisplay = document.getElementById("attempts");
const restartButton = document.getElementById("restart");
let attempts = 0;
let firstGuess = "";
let secondGuess = "";
let count = 0;
let previousTarget = null;
let delay = 1200;

function createBoard() {
  gameGrid.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.name = item.name;
    card.innerText = item.img;
    card.addEventListener("click", handleCardClick);
    gameBoard.appendChild(card);
  });
}

function handleCardClick(event) {
  const clicked = event.target;

  if (clicked === previousTarget || clicked.classList.contains("flip")) {
    return;
  }

  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.dataset.name;
      clicked.classList.add("flip");
    } else {
      secondGuess = clicked.dataset.name;
      clicked.classList.add("flip");
    }

    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        setTimeout(matchCards, delay);
      }
      setTimeout(resetGuesses, delay);
    }
    previousTarget = clicked;
  }
}

function matchCards() {
  const matchedCards = document.querySelectorAll(".card.flip");
  matchedCards.forEach((card) => {
    card.classList.add("matched");
    card.removeEventListener("click", handleCardClick);
  });
}

function resetGuesses() {
  firstGuess = "";
  secondGuess = "";
  count = 0;
  attempts++;
  attemptsDisplay.textContent = attempts;

  const cards = document.querySelectorAll(".card:not(.matched).flip");
  cards.forEach((card) => {
    card.classList.remove("flip");
  });
}

function restartGame() {
  gameGrid.sort(() => 0.5 - Math.random());
  gameBoard.innerHTML = "";
  attempts = 0;
  attemptsDisplay.textContent = attempts;
  firstGuess = "";
  secondGuess = "";
  count = 0;
  previousTarget = null;
  createBoard();
}

restartButton.addEventListener("click", restartGame);

createBoard();
