$(document).ready(function () {
  //DOM variables
  const paper = $(".paper");
  const scissor = $(".scissor");
  const rock = $(".rock");
  const userImage = $(".user-img");
  const iconsContainer = $(".icons");
  const selectionContainer = $(".selection-container");
  const houseImage = $(".house-img");
  const resultContainer = $(".result");
  const resultText = $(".result h1");
  const scoresText = $(".score-board h2");

  //SOUNDS
  const winSound = new Audio("/audio/win.mp3");
  const loseSound = new Audio("/audio/lose.mp3");
  const drawSound = new Audio("/audio/draw.mp3");

  //To show selection container

  function showSelection() {
    iconsContainer.css("visibility", "hidden");
    selectionContainer.css("visibility", "visible");
  }

  //Image selected functions

  function paperSelected(image) {
    image.attr("src", "images/icon-paper.svg");
    image.css("border-color", "hsl(230, 89%, 62%)");
  }

  function scissorSelected(image) {
    image.attr("src", "images/icon-scissors.svg");
    image.css("border-color", "hsl(39, 89%, 49%)");
  }

  function rockSelected(image) {
    image.attr("src", "images/icon-rock.svg");
    image.css("border-color", "hsl(349, 71%, 52%)");
  }

  //user selection function

  function userSelection(myCallback) {
    //paper
    paper.click(function () {
      showSelection();
      paperSelected(userImage);
      setTimeout(myCallback, 1000); //set callback after userSelection container appear
    });

    //scissor
    scissor.click(function () {
      showSelection();
      scissorSelected(userImage);
      setTimeout(myCallback, 1000);
    });

    //rock
    rock.click(function () {
      showSelection();
      rockSelected(userImage);
      setTimeout(myCallback, 1000);
    });
  }

  //House Selection function
  function showHouseImage() {
    houseImage.css("visibility", "visible");
  }

  const choices = ["paper", "scissor", "rock"];

  function houseSelection() {
    let randomNumber = Math.floor(Math.random() * (choices.length + 1)); //random selection
    let choice = choices[randomNumber];
    if (choice === "paper") {
      paperSelected(houseImage);
      showHouseImage();
      checkImages();
    } else if (choice === "scissor") {
      scissorSelected(houseImage);
      showHouseImage();
      checkImages();
    } else {
      rockSelected(houseImage);
      showHouseImage();
      checkImages();
    }
  }

  //Image comparison

  function checkImages() {
    let house = houseImage[0].attributes[0].value;
    let user = userImage[0].attributes[0].value;
    let paper = "images/icon-paper.svg";
    let scissor = "images/icon-scissors.svg";
    let rock = "images/icon-rock.svg";
    if (user === paper && house === rock) {
      setTimeout(win, 500);
    } else if (user === paper && house === scissor) {
      setTimeout(lose, 500);
    } else if (user === rock && house === scissor) {
      setTimeout(win, 500);
    } else if (user === rock && house === paper) {
      setTimeout(lose, 500);
    } else if (user === scissor && house === paper) {
      setTimeout(win, 500);
    } else if (user === scissor && house === rock) {
      setTimeout(lose, 500);
    } else {
      setTimeout(draw, 500);
    }
  }

  //Result Container

  function showResultContainer() {
    resultContainer.css("visibility", "visible");
  }

  function win() {
    resultText.text("You win");
    winStorageValue();
    showResultContainer();
    winSound.play();
    userImage.addClass("win");
  }

  function lose() {
    resultText.text("You lose");
    loseStorageValue();
    showResultContainer();
    loseSound.play();
    houseImage.addClass("win");
  }

  function draw() {
    resultText.text("Draw");
    drawSound.play();
    showResultContainer();
  }

  // Set and get data from localStorage

  if (localStorage.length === 0) {
    scoresText.text(0);
    localStorage.setItem("scores", scoresText.text());
  } else {
    scoresText.text(localStorage.scores);
  }

  function winStorageValue() {
    scoresText.text(parseInt(localStorage.scores) + 1);
    localStorage.setItem("scores", parseInt(localStorage.scores) + 1);
  }

  function loseStorageValue() {
    scoresText.text(parseInt(localStorage.scores) - 1);
    localStorage.setItem("scores", parseInt(localStorage.scores) - 1);
  }

  userSelection(houseSelection);
});
