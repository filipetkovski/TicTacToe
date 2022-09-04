//Model
const xType = "X";
const oType = "O";
let xCell = [];
let oCell = [];
let oTurn = false;
let xoArray = [];

const winningCombination = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//Controller
function addIcon(i) {
   const cell = document.querySelectorAll(".cell");

   if(oTurn) {
      cell[i].innerHTML = oType;
      oCell.push(i);
      oTurn = false;
   } else {
      cell[i].innerHTML = xType;
      xCell.push(i);
      oTurn = true;
   }

   cell[i].style.fontSize = "4em";
   cell[i].style.pointerEvents = "none";

   checkForWinner();
}
function checkForWinner() {
      let w;
      let l;
      for(let i=0;i<8;i++) {
         w = 0;
         l = 0;
         xoArray = [];
         for(let j=0;j<3;j++) {
            for(let k=0;k<9;k++) {
               if(winningCombination[i][j] === xCell[k]) {
                  w++;
                  xoArray.push(k);
                  if(w >= 3) {
                     winner(1,i);
                  }
               } else if(winningCombination[i][j] === oCell[k]) {
                  l++;
                  xoArray.push(k);
                  if(l >= 3) {
                     winner(2,i);
                  }
               }
               if(xoArray.length > 3) {
                   xoArray = [];
               }
            }
         }
      }
      if(xCell.length === 5) {
         draw();
      }
}
function stopGame() {
   const cellsDiv = document.querySelector(".cells-div");

   cellsDiv.style.pointerEvents = "none";
   cellsDiv.classList.add("animation");
}

//View
function winner(n,i) {
   stopGame();
    winnerAnimation(i);

   const winnerDiv = document.querySelector(".winner-div");
   const winSpan = document.querySelector(".win");
   winnerDiv.classList.add("animation");

   if(n === 1) {
      winSpan.innerHTML = xType;
   } else {
      winSpan.innerHTML = oType;
   }

   winnerDiv.style.display = "unset";
   xCell = [];
}
function draw() {
   stopGame();
   const drawDiv = document.querySelector(".draw-div");

   drawDiv.classList.add("animation");
   drawDiv.style.display = "unset";
}
function winnerAnimation(i) {

    const cell = document.querySelectorAll(".cell");

    for(let j=0;j<3;j++) {
        const div = document.createElement("div");

        if(i >= 0 && i < 3) {
            div.classList.add("red-line-3");
        } else if(i >= 3 && i < 6) {
            div.classList.add("red-line-4");
        } else if(i === 6 ) {
            div.classList.add("red-line-1");
        } else if(i === 7 ) {
            div.classList.add("red-line-2");
        }

        cell[winningCombination[i][j]].appendChild(div);
    }
}
