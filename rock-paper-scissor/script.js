let userScore = 0;
let compScore = 0;
userScoreText = document.querySelector("#user-score");
computerScoreText = document.querySelector("#computer-score");

const choises = document.querySelectorAll(".choise");
const msgPara = document.querySelector(".msg");

function computerChoiseGenrator() {
  const options = ["rock", "paper", "scissor"];
  const index = Math.floor(Math.random() * 3); //0 to 2 range
  return options[index];
}

function showWinner(userWin, compChoise) {
  if (userWin) {
    msgPara.innerText = "You Win😊!!!" + `Computer Selected ${compChoise}`;
    msgPara.style.backgroundColor = "green";
    userScore++;
    userScoreText.innerText = `${userScore}`;
  } else {
    msgPara.innerText = "You Loose😢!!!" + `Computer Selected ${compChoise}`;
    msgPara.style.backgroundColor = "#ea0000";
    compScore++;
    computerScoreText.innerText = `${compScore}`;
  }
}

function playgame(userChoise) {
  const compChoise = computerChoiseGenrator();

  if (userChoise == compChoise) {
    msgPara.innerText = "Game Draw👏!!!" + `Computer Selected ${compChoise}`;
    msgPara.style.backgroundColor = "#ead300";
  } else {
    let userWin = true;
    if (userChoise == "rock") {
      userWin = compChoise == "paper" ? false : true; //here else condition(scissor get selected) value is true
    } else if (userChoise == "paper") {
      userWin = compChoise == "rock" ? true : false; //here else condition(scissor get selected) value is false
    } //user chooses Scissor
    else {
      userWin = compChoise == "paper" ? true : false; //here else condition(rock get selected) value is false
    }

    showWinner(userWin, compChoise);
  }
}

choises.forEach(function (choise) {
  choise.addEventListener("click", function () {
    const userChoise = choise.getAttribute("id");
    playgame(userChoise);
  });
});
