import { state } from "./state.js";
import {
  selectionCreation,
  getRandomInt,
  getUniqueRandomNumbers,
  quizCreation,
  readyToPlay,
} from "./functions.js";

function animateTextWithLineBreaks(elementId, text, delay) {
  return new Promise((resolve) => {
    const element = document.getElementById(elementId); // 대상 요소
    let index = 0; // 현재 글자 인덱스

    function typeChar() {
      if (index < text.length) {
        const currentChar = text[index];

        // 줄바꿈 처리
        if (currentChar === "\n") {
          element.innerHTML += "<br>"; // 줄바꿈 추가
        } else {
          element.innerHTML += currentChar; // 한 글자 추가
        }

        index++; // 인덱스 증가
        setTimeout(typeChar, delay); // 다음 글자 출력 딜레이
      } else {
        resolve(); // 애니메이션 완료 시 Promise 해결
      }
    }

    typeChar(); // 애니메이션 시작
  });
}

// 애니메이션 실행
const animatedText = `안녕하세요, 만나서 반갑습니다\n 지금 세상은\n 당신의 도움이 필요합니다!`;

animateTextWithLineBreaks(
  "welcomeWord",
  animatedText,
  state.yourInfo.wordSpeed
).then(() => {
  divAppear("welcomeWordBtn");
});

// div 등장
function divAppear(elementId) {
  const div = document.getElementById(elementId);
  div.classList.remove("invisible");
}

// div 퇴장
function divDisappear(elementId) {
  const div = document.getElementById(elementId);
  div.classList.add("invisible");
}

document.getElementById("welcomeWordBtn").addEventListener("click", () => {
  divDisappear("firstPage");
  divAppear("secondPage");
  const nameText = `그렇습니다..!\n 자세한걸 설명하기 전에\n 용사님의 이름은 무엇인가요?`;
  animateTextWithLineBreaks(
    "nameWord",
    nameText,
    state.yourInfo.wordSpeed
  ).then(() => {
    divAppear("nameContainer");
  });
});

let changeName = "";
let changeNumber = "";

document.getElementById("nameInput").addEventListener("input", (event) => {
  const settingName = event.target.value;
  changeName = settingName;
});

document.getElementById("nameBtn").addEventListener("click", () => {
  divDisappear("secondPage");
  divAppear("thirdPage");
  const numberText = `${changeName}이라... \n 정말 멋진 이름이에요!\n 이제 당신이 하루에 외우고 싶은\n 단어의 숫자를 입력하세요!`;
  animateTextWithLineBreaks(
    "numberWord",
    numberText,
    state.yourInfo.wordSpeed
  ).then(() => {
    divAppear("numberContainer");
  });
});

document.getElementById("numberInput").addEventListener("input", (event) => {
  changeNumber = event.target.value;
});

document.getElementById("numberBtn").addEventListener("click", () => {
  divDisappear("thirdPage");
  divAppear("forthPage");
  const doubleCheckText = `좋습니다 용사님!\n 당신의 이름은 ${changeName}이고 \n ${changeNumber}개의 단어들 만큼 \n하루에 공부하는 \n 모험을 떠날 준비가 되었나요?`;
  animateTextWithLineBreaks(
    "doubleCheckWord",
    doubleCheckText,
    state.yourInfo.wordSpeed
  ).then(() => {
    divAppear("checkerContatiner");
  });
});

document.getElementById("iAmNotReady").addEventListener("click", () => {
  divDisappear("firstPage");
  divDisappear("thirdPage");
  divDisappear("forthPage");
  divDisappear("checkerContatiner");
  divDisappear("numberContainer");
  divDisappear("nameContainer");
  divAppear("secondPage");
  document.getElementById("nameWord").innerText = "";
  document.getElementById("numberWord").innerText = "";
  document.getElementById("doubleCheckWord").innerText = "";
  const nameText = `괜찮습니다..!\n 그렇다면\n 용사님의 이름은 무엇인가요?`;
  animateTextWithLineBreaks(
    "nameWord",
    nameText,
    state.yourInfo.wordSpeed
  ).then(() => {
    divAppear("nameContainer");
  });
});

document.getElementById("iAmReady").addEventListener("click", async () => {
  try {
    await readyToPlay(state, changeName, changeNumber);

    await quizCreation(state);
  } catch (error) {
    console.error("Error during readyToPlay:", error);
  }
  localStorage.setItem("state", JSON.stringify(state));

  window.location.href = "./game.html";
});
