import {
  selectionCreation,
  getRandomInt,
  getUniqueRandomNumbers,
  quizCreation,
  readyToPlay,
  divAppear,
  divDisappear,
} from "./functions.js";

const state = JSON.parse(localStorage.getItem("state"));

document.getElementById(
  "firstH1"
).innerText = `"${state.yourInfo.yourName}" 용사님의 여정입니다`;
function letsPlayQuiz() {
  Object.keys(state.quizInfo).map((el) => {
    const newDiv = document.createElement("button");
    newDiv.style.width = "80%";
    newDiv.style.height = "15%";
    newDiv.style.fontSize = "7vw";
    newDiv.innerText = el;
    newDiv.id = `quizContainer-${el}`;
    newDiv.addEventListener("click", (event) => {
      const text = event.target.innerText;
      console.log(state.quizInfo[text]);
    });
    document.getElementById("quizContainer").append(newDiv);
    divAppear("dungeonContainer");

    divDisappear("settingContainer");
    divDisappear("firstH1");
  });
}

document.getElementById("dungeonBtn").addEventListener("click", () => {
  letsPlayQuiz();
});

document.getElementById("gobackBtn").addEventListener("click", () => {
  divAppear("settingContainer");
  divAppear("firstH1");
  divDisappear("dungeonContainer");
});
