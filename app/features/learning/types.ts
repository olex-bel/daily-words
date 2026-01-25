
export type Answer = 'known' | 'harder' | 'unknown';

type Action<T extends string, P = undefined> = 
  [P] extends [undefined]? 
    {type: T} : 
    {type: T; payload: P};

type AnswerPayload = {
  answer: Answer;
  isLast: boolean;
}

type AnswerAction = Action<'ANSWER', AnswerPayload>;
type IncrementIndexAction = Action<'INCREMENT_INDEX'>;
type SetCompletedAction = Action<'SET_COMPLETED', boolean>;

export type LearningAction = AnswerAction | IncrementIndexAction | SetCompletedAction;

export interface LearningState {
    readonly known: number;
    readonly harder: number;
    readonly unknown: number;
    readonly currentIndex: number;
    readonly completed: boolean;
}
