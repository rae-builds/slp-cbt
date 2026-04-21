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
  wrongAnswers: Record<number, Set<number>>; // questionId -> Set of optionIds
  highlightedContent: Record<number, string>; // questionId -> HTML with marks
  memos: Record<number, string>;
  timeLeft: number; // in seconds
  fontSize: number; // 80, 100, 125
  layout: '1-pane' | '2-pane';
  highlighterMode: 'on' | 'off';
  isFinished: boolean;
  showCalculator: boolean;
  showDrawingBoard: boolean;
  drawingData: string | null;
  showMemo: boolean;
  activeMemoQuestionId: number | null;
  showQuestionView: boolean;
  questionViewTab: 'all' | 'marked' | 'unsolved';
}
