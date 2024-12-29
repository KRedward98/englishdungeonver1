import {
  selectionCreation,
  getRandomInt,
  getUniqueRandomNumbers,
  quizCreation,
  readyToPlay,
  divAppear,
  divDisappear,
} from "./functions.js";

import { oxford3000 } from "./newword.js";

const state = JSON.parse(localStorage.getItem("state"));

const now = new Date();

const rightday = new Date(now.getTime());

const year = rightday.getFullYear();
const month = rightday.getMonth() + 1;
const day = rightday.getDate();

const result = `${year}-${month}-${day}`;

document.getElementById(
  "firstH1"
).innerText = `"${state.yourInfo.yourName}"\n 용사님의\n 여정입니다`;

function letsPlayQuiz() {
  Object.keys(state.quizInfo).map((quizDate) => {
    const newDiv = document.createElement("button");
    newDiv.style.width = "80%";
    newDiv.style.height = "15%";
    newDiv.style.fontSize = "7vw";
    newDiv.innerText = quizDate;
    newDiv.id = `quizContainer-${quizDate}`;
    if (result !== quizDate) {
      newDiv.style.backgroundColor = "gray";
      newDiv.disabled = true;
    }
    newDiv.addEventListener("click", (event) => {
      const text = event.target.innerText;
      document.getElementById("quizContainer").innerHTML = "";
      document.getElementById("quizContainer").style.backgroundImage =
        "url(./media/background/vintage-parchment.png)";
      document.getElementById("quizContainer").style.border = "0px";
      document.getElementById("quizContainer").style.backgroundColor = "none";
      state.quizInfo[quizDate].quizSelectedWords.map((el, index) => {
        const singleQuiz = document.createElement("div");
        singleQuiz.id = String(`${quizDate}-${Object.keys(oxford3000)[el]}`);
        singleQuiz.style.width = "100%";
        singleQuiz.style.height = "100%";
        if (index > 0) {
          singleQuiz.classList.add("invisible");
        }
        singleQuiz.style.display = "flex";
        singleQuiz.style.justifyContent = "center";
        singleQuiz.style.alignItems = "center";
        singleQuiz.style.flexDirection = "column";

        document.getElementById("quizContainer").append(singleQuiz);

        const sigleQuizUpperContainer = document.createElement("div");
        const sigleQuizLowerContainer = document.createElement("div");

        singleQuiz.append(sigleQuizUpperContainer);
        singleQuiz.append(sigleQuizLowerContainer);

        sigleQuizUpperContainer.textContent = `${index + 1} : ${
          Object.keys(oxford3000)[el]
        }`;

        const prevBtn = document.createElement("button");
        const nextBtn = document.createElement("button");

        sigleQuizLowerContainer.append(prevBtn);
        sigleQuizLowerContainer.append(nextBtn);

        prevBtn.textContent = "previous";
        nextBtn.textContent = "next";

        if (index === 0) {
          prevBtn.style.backgroundColor = "gray";
          prevBtn.disabled = true;
        }
        if (index === state.quizInfo[quizDate].quizSelectedWords.length - 1) {
          nextBtn.style.backgroundColor = "gray";
          nextBtn.disabled = true;
        }

        nextBtn.addEventListener("click", (event) => {
          const nextElement = singleQuiz.nextElementSibling;
          if (nextElement) {
            nextElement.classList.remove("invisible");
            singleQuiz.classList.add("invisible");
          } else {
            event.target.style.backgroundColor = "gray";
          }
        });

        prevBtn.addEventListener("click", (event) => {
          const previousElment = singleQuiz.previousElementSibling;
          if (previousElment) {
            previousElment.classList.remove("invisible");
            singleQuiz.classList.add("invisible");
          } else {
            event.target.style.backgroundColor = "gray";
          }
        });
      });
    });
    document.getElementById("quizContainer").append(newDiv);
    divAppear("dungeonContainer");

    divDisappear("settingContainer");
    divDisappear("firstH1");
  });
}

document.getElementById("dungeonBtn").addEventListener("click", () => {
  letsPlayQuiz();
  console.log(state);
});

document.getElementById("gobackBtn").addEventListener("click", () => {
  document.getElementById("quizContainer").innerHTML = "";

  document.getElementById("quizContainer").style.backgroundImage = "none";
  document.getElementById("quizContainer").style.border =
    "5px solid rgb(113, 74, 7)";
  document.getElementById("quizContainer").style.backgroundColor = "#5d3e2787";

  divAppear("settingContainer");
  divAppear("firstH1");
  divDisappear("dungeonContainer");
});

document.getElementById("clearData").addEventListener("click", () => {
  localStorage.removeItem("state");
  window.location.href = "./index.html";
});
