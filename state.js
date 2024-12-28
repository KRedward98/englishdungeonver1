import { vocab } from "./words.js";
import { oxford3000 } from "./newword.js";

export const state = {
  yourInfo: {
    yourName: "",
    givenNumber: 0,
    entireWordLength: Number(Object.keys(oxford3000).length),
    wordSpeed: 110,
    isSettingComplete: false,
    yourLevel: 0,
    consecutive: 0,
    readThis:
      "음악 파일은 SUNO AI 를 이용하였습니다. 배경화면은 CHAT GPT-4 를 이용하였습니다. 글꼴은 Neodgm체를 사용하였습니다. 영어단어의 뜻과 발음은 모두 CHAT GPT를 이용함을 미리 말씀드립니다. 오류 발견시, gentlegyu98@gmail.com 으로 연락 부탁드립니다.  ",
  },
  quizInfo: {},
  staredWords: [],
  wrongAnswers: {},
  setting: {
    music: true,
    kakaotalkid: null,
  },
};
