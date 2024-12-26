import { state } from "./state.js";
import { vocab } from "./words.js";

function selectionCreation(el) {
  const answerSheetOriginal = getUniqueRandomNumbers(
    5,
    0,
    Object.keys(vocab).length - 1
  );
  const answerNum = getUniqueRandomNumbers(1, 0, 4);
  answerSheetOriginal.splice(answerNum, 1, el);

  return answerSheetOriginal;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getUniqueRandomNumbers(count, min, max) {
  const numbers = [];
  while (numbers.length < count) {
    const num = getRandomInt(min, max);
    if (!numbers.includes(num)) {
      numbers.push(num);
    }
  }
  return numbers;
}

function readyToPlay(state, changeName, changeNumber) {
  state.yourInfo.yourName = changeName;
  state.yourInfo.givenNumber = Number(changeNumber);
  state.yourInfo.isSettingComplete = true;
}

function quizCreation(state) {
  const entirelength = state.yourInfo.entireWordLength;
  const quizInfoArray = getUniqueRandomNumbers(
    entirelength,
    0,
    entirelength - 1
  );

  const counter = entirelength / state.yourInfo.givenNumber;

  for (let i = 0; i < Math.ceil(counter); i++) {
    const now = new Date();
    const oneDay = 24 * 60 * 60 * 1000;
    const rightday = new Date(now.getTime() + i * oneDay);

    const year = rightday.getFullYear();
    const month = rightday.getMonth() + 1;
    const day = rightday.getDate();

    const result = `${year}-${month}-${day}`;

    const indexResult = quizInfoArray.slice(
      i * state.yourInfo.givenNumber,
      (i + 1) * state.yourInfo.givenNumber
    );

    state.quizInfo[result] = {
      quizSelectedWords: [...indexResult],
      quizSelectedWordsAnswerSheet: new Array(indexResult.length).fill(true),
      quizSolve: false,
    };
  }
}

export {
  selectionCreation,
  getRandomInt,
  getUniqueRandomNumbers,
  quizCreation,
  readyToPlay,
};
