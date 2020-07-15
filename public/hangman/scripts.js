const wordButton = document.querySelector(".wordbutton");
const guessBox = document.querySelector(".guessbox");
const wordSpaces = document.querySelector(".wordspaces");
const letterButton = document.querySelector(".letterinput-button");

let wordID = "";
let wordLength = 0;

const handleNewGame = async () => {
  const response = await fetch("/hangman/word/");
  const parsedResponse = await response.json();
  wordID = parsedResponse.id;
  wordLength = parsedResponse.letterCount;
  for (i = 0; i < wordLength; i++) {
    const letterSpace = document.createElement("li");
    letterSpace.setAttribute("class", "letterspace");
    wordSpaces.appendChild(letterSpace);
  }
  wordButton.removeEventListener("click", handleNewGame);
};

handleLetterGuess = async (e) => {
  e.preventDefault();
  const letterInput = document.getElementById("letterinput").value;
  console.log(letterInput, wordID);
  const response = await fetch(`/hangman/guess/${wordID}/${letterInput}`)
    .then((response) => response.json())
    .then((data) => data);
  console.log(response);
};

wordButton.addEventListener("click", handleNewGame);

letterButton.addEventListener("click", handleLetterGuess);
