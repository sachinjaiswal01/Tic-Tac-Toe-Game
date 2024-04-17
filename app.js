let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;   //tracking the turn.

let winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
];


boxes.forEach((box) => {
  box.addEventListener("click", () => {
    const span=document.createElement("span");  //creating span to give differnt different color to x and o
    if (turnO) {
        span.innerText = "O";
        span.classList.add("turnO");
        turnO = false;    
    } else {
      span.innerText = "X";
      span.classList.add("turnX");
      turnO = true;
    } 
    box.appendChild(span)  //adding span as a child to box
    box.disabled = true;
    checkWinner();
  });
});

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();   //so that after winnner no one can olay further withought reset.
};


const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
      }
    }
  }
};

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

// adding new functionality when no one won the game

let count =0;
const handleOnClick=()=>{
    count++;
    if(count==9){
        msg.innerText="Draw! No winner yet."
        msgContainer.classList.remove("hide");
    }
}
boxes.forEach((span)=>{
    span.addEventListener("click",handleOnClick)
});
