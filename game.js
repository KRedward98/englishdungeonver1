const state = JSON.parse(localStorage.getItem("state"));

document.getElementById(
  "firstH1"
).innerText = `"${state.yourInfo.yourName}" 용사님의 여정입니다`;
function letsPlayQuiz() {
  Object.keys(state.quizInfo).map((el) => {
    const newDiv = document.createElement("button");
    newDiv.style.width = "80%";
    newDiv.style.height = "15vh";
    newDiv.innerText = el;
    newDiv.id = `quizContainer-${el}`;
    newDiv.addEventListener("click", (event) => {
      const text = event.target.innerText;
      console.log(state.quizInfo[text]);
    });
    document.getElementById("quizContainer").append(newDiv);
    document.getElementById("quizContainer").classList.remove("invisible");
  });
}

document.getElementById("dungeonBtn").addEventListener("click", () => {
  letsPlayQuiz();
});
