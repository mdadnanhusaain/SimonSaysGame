let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let scoreboard = document.querySelector("h2");
let body = document.querySelector("body");

let highscore = 0;

document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("Game has started");
    started = true;

    levelUp();
  }
});

function levelUp() {
  userSeq = [];
  level++;
  scoreboard.innerText = `Level ${level}`;

  let ranInd = Math.floor(Math.random() * 4);
  let ranCol = btns[ranInd];
  let ranBtn = document.querySelector(`.${ranCol}`);
  gameSeq.push(ranCol);
  console.log(gameSeq);
  setTimeout(flashBtn, 1000, ranBtn);
}

function flashBtn(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function flashUser(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}

function btnPress() {
  let btn = this;
  flashUser(btn);

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  check(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function check(ind) {
  console.log("Curr level : ", level);
  if (userSeq[ind] == gameSeq[ind]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    highscore = highscore > level - 1 ? highscore : level - 1;
    scoreboard.innerHTML = `Game Over! Press any key to start`;
    body.style.backgroundColor = "red";
    setTimeout(function () {
      body.style.backgroundColor = "white";
    }, 150);
    reset();
    document.querySelector("h3").innerHTML = `HighScore : ${highscore}`;
  }
}

function reset() {
  started = false;
  level = 0;
  gameSeq = [];
  userSeq = [];
}