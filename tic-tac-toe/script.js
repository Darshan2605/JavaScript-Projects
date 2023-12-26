let boxes = document.querySelectorAll(".box");
let reset_btn = document.querySelector(".reset-btn");
let newGamebtn = document.querySelector(".new-game-btn");
let winnerMsgDiv = document.querySelector(".msg");
let winnerMsg = document.querySelector("#winner-msg");

let PlayerX = true; //by default playerX is going to Start.

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
];

function resetGame() {
  PlayerX = true;
  enableBoxes();
  winnerMsgDiv.classList.add("hide");
}

boxes.forEach(function (box) {
  box.addEventListener("click", function () {
    if (PlayerX) {
      //if it is playerX turn
      box.innerText = "X";
      PlayerX = false; //now next time playerO's turn(else block get executed)
    } else {
      box.innerText = "O";
      PlayerX = true; //now next time playerX's turn(if block get executed)
    }
    box.disabled = true; //whenever button get clicked we can not again change its vale(X or O)
    checkWinner();
  });
});

function disabelBoxes() {
  for (let box of boxes) {
    box.disabled = true;
  }
}

function enableBoxes() {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
}

function showWinner(pos1) {
  winnerMsg.innerText = `Congratulations! Winner is ${pos1}`;
  // winnerMsgDiv.style.display = "block";
  winnerMsgDiv.classList.remove("hide");
  disabelBoxes();
}

function checkWinner() {
  for (let pattern of winPatterns) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 != "" && pos2 != "" && pos3 != "") {
      if (pos1 == pos2 && pos2 == pos3) {
        showWinner(pos1);
      }
    }
  }
}

newGamebtn.addEventListener("click", resetGame);
reset_btn.addEventListener("click", resetGame);
