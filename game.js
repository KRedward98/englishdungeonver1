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

document.getElementById(
  "firstH1"
).innerText = `"${state.yourInfo.yourName}" 용사님의 여정입니다`;

function letsPlayQuiz() {
  Object.keys(state.quizInfo).map((quizDate) => {
    const newDiv = document.createElement("button");
    newDiv.style.width = "80%";
    newDiv.style.height = "15%";
    newDiv.style.fontSize = "7vw";
    newDiv.innerText = quizDate;
    newDiv.id = `quizContainer-${quizDate}`;
    newDiv.addEventListener("click", (event) => {
      const text = event.target.innerText;
      document.getElementById("quizContainer").innerHTML = "";
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

        nextBtn.addEventListener("click", () => {
          singleQuiz.nextElementSibling.classList.remove("invisible");
          singleQuiz.classList.add("invisible");
        });

        prevBtn.addEventListener("click", () => {
          singleQuiz.previousElementSibling.classList.remove("invisible");
          singleQuiz.classList.add("invisible");
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
  divAppear("settingContainer");
  divAppear("firstH1");
  divDisappear("dungeonContainer");
});

document.getElementById("clearData").addEventListener("click", () => {
  localStorage.removeItem("state");
  window.location.href = "./index.html";
});
