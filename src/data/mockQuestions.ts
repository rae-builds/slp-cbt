import { Question } from '../types/exam';

export const mockQuestions: Question[] = [
  {
    id: 1,
    number: 1,
    question: "다음 중 보건의료인 국가시험 직종이 아닌 것은?",
    options: [
      { id: 1, text: "의사" },
      { id: 2, text: "간호사" },
      { id: 3, text: "물리치료사" },
      { id: 4, text: "미용사" },
      { id: 5, text: "영양사" }
    ],
    correctAnswer: 4,
    type: 'text'
  },
  {
    id: 2,
    number: 2,
    question: "다음은 후두 내시경으로 관찰한 성대의 모습이다. 이 질환의 명칭으로 옳은 것은?",
    options: [
      { id: 1, text: "성대 결절" },
      { id: 2, text: "성대 폴립" },
      { id: 3, text: "성대 마비" },
      { id: 4, text: "후두암" },
      { id: 5, text: "라인케 부종" }
    ],
    correctAnswer: 1,
    type: 'image',
    mediaUrl: '/images/q2_slp.png'
  },
  {
    id: 3,
    number: 3,
    question: "다음의 조음기관 단면도에서 '혀끝과 윗잇몸'이 만나서 나는 소리(치조음)가 아닌 것은?",
    options: [
      { id: 1, text: "/ㄴ/" },
      { id: 2, text: "/ㄷ/" },
      { id: 3, text: "/ㄹ/" },
      { id: 4, text: "/ㅅ/" },
      { id: 5, text: "/ㄱ/" }
    ],
    correctAnswer: 5,
    type: 'image',
    mediaUrl: '/images/q3_slp.png'
  },
  {
    id: 4,
    number: 4,
    question: "다음은 손씻기 방법을 나타낸 동영상이다. 올바른 손씻기 6단계에 포함되지 않는 것을 고르시오.",
    options: [
      { id: 1, text: "손바닥과 손바닥을 마주 대고 문질러 주기" },
      { id: 2, text: "손등과 손바닥을 마주 대고 문질러 주기" },
      { id: 3, text: "손가락을 마주 잡고 문질러 주기" },
      { id: 4, text: "손등을 마주 대고 손깍지를 끼고 문질러 주기" },
      { id: 5, text: "엄지 손가락을 다른 편 손바닥으로 돌려주면서 문질러 주기" }
    ],
    correctAnswer: 4,
    type: 'video',
    mediaUrl: '/videos/손씻는영상.mp4'
  }
];
