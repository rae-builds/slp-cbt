export type Option = {
  id: number;
  text: string;
};

export type QuestionType = 'text' | 'image' | 'video';

export interface Question {
  id: number;
  number: number;
  type: QuestionType;
  question: string;
  subQuestion?: string;
  mediaUrl?: string;
  options: Option[];
  correctAnswer: number;
}

export interface ExamState {
  currentQuestionIndex: number;
  answers: Record<number, number | null>; // questionId -> optionId
  markedQuestions: Set<number>;
  memos: Record<number, string>;
  timeLeft: number; // in seconds
  fontSize: number; // 80, 100, 125
  layout: '1-pane' | '2-pane';
}
