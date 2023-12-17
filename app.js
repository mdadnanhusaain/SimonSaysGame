let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let scoreboard = document.querySelector("h2");
let body = document.querySelector("body");
let start = document.querySelector("#start");
let end = document.querySelector("#end");
let allBtns = document.querySelectorAll(".btn");
let tutBtn = document.querySelector("#tutBtn");
let playBtn = document.querySelector("#playBtn");

let highscore = 0;

start.addEventListener("click", begin);
end.addEventListener("click", reset);
tutBtn.addEventListener("click", dispTut);
playBtn.addEventListener("click", hideTut);

for (btn of allBtns) {
  btn.addEventListener("click", begin);
}

function dispTut() {
  let ins = document.querySelector("#instructions");
  let tut = document.querySelector("#tutorials");
  let game = document.querySelector("#game");
  ins.style.display = "None";
  tut.style.display = "block";
  game.style.display = "None";
}

function hideTut() {
  let ins = document.querySelector("#instructions");
  let tut = document.querySelector("#tutorials");
  let game = document.querySelector("#game");
  ins.style.display = "block";
  tut.style.display = "None";
  game.style.display = "block";
}

function begin() {
  if (started == false) {
    console.log("Game has started");
    started = true;
    start.style.display = "none";
    end.style.display = "inline";
    for (btn of allBtns) {
      btn.addEventListener("click", btnPress);
      btn.removeEventListener("click", begin);
    }
    levelUp();
  }
}

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
  }, 350);
}

function flashUser(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 350);
}

function btnPress() {
  let btn = this;
  flashUser(btn);

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  check(userSeq.length - 1);
}

function check(ind) {
  console.log("Curr level : ", level);
  if (userSeq[ind] == gameSeq[ind]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    body.style.backgroundColor = "red";
    setTimeout(function () {
      body.style.backgroundColor = "white";
    }, 250);
    reset();
  }
}

function reset() {
  scoreboard.innerHTML = `Game Over! Press Start button to Start`;
  end.style.display = "none";
  start.style.display = "inline";
  highscore = highscore > level ? highscore : level;
  document.querySelector("h3").innerHTML = `HighScore : ${highscore}`;
  started = false;
  level = 0;
  gameSeq = [];
  userSeq = [];
  for (btn of allBtns) {
    btn.addEventListener("click", begin);
    btn.removeEventListener("click", btnPress);
  }
}
