
export type Answer = 'know' | 'hard' | 'unknown';

type Action<T extends string, P = undefined> = 
  [P] extends [undefined]? 
    {type: T} : 
    {type: T; payload: P};

type AnswerPayload = {
  answer: Answer;
  isLast: boolean;
}

type NextPayload = {
  isLast: boolean;
}

type AnswerAction = Action<'ANSWER', AnswerPayload>;
type NextAction = Action<'NEXT', NextPayload>;

export type LearningAction = AnswerAction | NextAction;

export interface LearningState {
    readonly know: number;
    readonly hard: number;
    readonly unknown: number;
    readonly currentIndex: number;
    readonly completed: boolean;
}
