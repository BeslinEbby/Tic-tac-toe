let boxes = document.querySelectorAll(".boxes");
let restartBtn = document.querySelector("#restart-btn");
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let playerName = document.querySelector("#player-name");

let player = true; //playerX or playerO

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

boxes.forEach((box) => {
   box.addEventListener("click", () => {
      if (player) {
         box.innerText = "X";
         playerName.innerText = "Player O turns";
         player = false;
      } else {
         box.innerText = "O";
         playerName.innerText = "Player X turns";
         player = true;
      }
      box.disabled = true;
      checkWinner();
   });
});

const checkWinner = () => {
   for (let pattern of winPatterns) {
      let pos1Val = boxes[pattern[0]].innerText;
      let pos2Val = boxes[pattern[1]].innerText;
      let pos3Val = boxes[pattern[2]].innerText;
      let pos1 = boxes[pattern[0]];
      let pos2 = boxes[pattern[1]];
      let pos3 = boxes[pattern[2]];

      if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
         if (pos1Val == pos2Val && pos2Val == pos3Val) {
            showWinner(pos1Val);
            matchedBoxes(pos1, pos2, pos3);
            playerName.innerText = "";
         }
      }
   }
};

const matchedBoxes = (pos1, pos2, pos3) => {
   pos1.style.background = "transparent";
   pos1.style.boxShadow = "2px 4px 6px white,-2px -2px 4px white";
   pos2.style.background = "transparent";
   pos2.style.boxShadow = "2px 4px 6px white,-2px -2px 4px white";
   pos3.style.background = "transparent";
   pos3.style.boxShadow = "2px 4px 6px white,-2px -2px 4px white";
};

const showWinner = (winner) => {
   msg.innerText = `Congratulations, The Winner is : ${winner}`;
   msgContainer.classList.remove("hide");
   disableBoxes();
   fireworks();
   restartBtn.style.display = "none";
};
const restartOrNew = () => {
   player = false;
   enableBoxes();
   msgContainer.classList.add("hide");
   window.location.reload();
};

const disableBoxes = () => {
   for (let box of boxes) {
      box.disabled = true;
   }
};
const enableBoxes = () => {
   for (let box of boxes) {
      box.disabled = false;
      box.innerText = "";
   }
};

const fireworks = () => {
   const duration = 15 * 1000,
      animationEnd = Date.now() + duration,
      defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

   function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
   }
   const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
         return clearInterval(interval);
      }
      const particleCount = 50 * (timeLeft / duration);

      // since particles fall down, start a bit higher than random
      confetti(
         Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
         })
      );
      confetti(
         Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
         })
      );
   }, 250);
};

restartBtn.addEventListener("click", restartOrNew);
newBtn.addEventListener("click", restartOrNew);
