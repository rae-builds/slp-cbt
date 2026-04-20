import { Question } from '@/types/exam';

export const mockQuestions: Question[] = [
  {
    id: 1,
    number: 1,
    type: 'text',
    question: '다음 중 보건의료인 국가시험 직종이 아닌 것은?',
    options: [
      { id: 1, text: '의사' },
      { id: 2, text: '간호사' },
      { id: 3, text: '물리치료사' },
      { id: 4, text: '미용사' },
      { id: 5, text: '영양사' },
    ],
    correctAnswer: 4,
  },
  {
    id: 2,
    number: 2,
    type: 'image',
    question: '문항풀이 연습',
    subQuestion: '가장 적합한 답을 하나만 고르시오.\n\n다음은 우리나라에서 가을에 많이 피는 꽃 사진(사진1)이다. 이 꽃의 이름은?',
    mediaUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=1000&auto=format&fit=crop', // Placeholder for cosmos
    options: [
      { id: 1, text: '가을국화' },
      { id: 2, text: '방울꽃' },
      { id: 3, text: '코스모스' },
      { id: 4, text: '투구꽃' },
      { id: 5, text: '구절초' },
    ],
    correctAnswer: 3,
  },
  {
    id: 3,
    number: 3,
    type: 'image',
    question: '문항풀이 연습',
    subQuestion: '가장 적합한 답을 하나만 고르시오.\n\n다음은 우리나라의 세계문화유산 사진(사진1)이다. 문화유산의 이름은?',
    mediaUrl: 'https://images.unsplash.com/photo-1608958435020-e8a7109ba809?q=80&w=1000&auto=format&fit=crop', // Placeholder for dolmen
    options: [
      { id: 1, text: '왕릉' },
      { id: 2, text: '고인돌' },
      { id: 3, text: '종묘' },
      { id: 4, text: '석탑' },
      { id: 5, text: '움집' },
    ],
    correctAnswer: 2,
  },
  {
    id: 4,
    number: 4,
    type: 'video',
    question: '문항풀이 연습',
    subQuestion: '가장 적합한 답을 하나만 고르시오.\n\n다음은 손씻기 방법을 나타낸 동영상이다. 올바른 손씻기 6단계에 포함되지 않는 것을 고르시오.',
    mediaUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', // Placeholder video
    options: [
      { id: 1, text: '손바닥과 손바닥을 마주 대고 문질러 주기' },
      { id: 2, text: '손등과 손바닥을 마주 대고 문질러 주기' },
      { id: 3, text: '손가락을 마주 잡고 문질러 주기' },
      { id: 4, text: '손등을 마주 대고 손깍지를 끼고 문질러 주기' },
      { id: 5, text: '엄지 손가락을 다른 편 손바닥으로 돌려주면서 문질러 주기' },
    ],
    correctAnswer: 4,
  },
];
