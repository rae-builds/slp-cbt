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
    question: "다음 사진의 꽃 이름으로 가장 적합한 것은?",
    options: [
      { id: 1, text: "장미" },
      { id: 2, text: "튤립" },
      { id: 3, text: "코스모스" },
      { id: 4, text: "해바라기" },
      { id: 5, text: "백합" }
    ],
    correctAnswer: 3,
    type: 'image',
    mediaUrl: '/images/q2.jpg'
  },
  {
    id: 3,
    number: 3,
    question: "다음은 우리나라의 세계문화유산 사진이다. 문화유산의 이름은?",
    options: [
      { id: 1, text: "황룡" },
      { id: 2, text: "고인돌" },
      { id: 3, text: "종묘" },
      { id: 4, text: "석굴암" },
      { id: 5, text: "움집" }
    ],
    correctAnswer: 2,
    type: 'image',
    mediaUrl: '/images/q3.jpg'
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
