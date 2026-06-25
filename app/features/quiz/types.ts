
type Action<T extends string, P = undefined> = 
  [P] extends [undefined]? 
    {type: T} : 
    {type: T; payload: P};

type AnswerPayload = {
  isCorrect: boolean;
  isLast: boolean;
}

type AnswerAction = Action<'ANSWER', AnswerPayload>;

export type QuizAction = AnswerAction;

export interface QuizState {
    readonly known: number;
    readonly unknown: number;
    readonly currentIndex: number;
    readonly completed: boolean;
}
