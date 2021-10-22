export interface IData {
  flag: string
  capital: string
  name: string
}

export type IQuestion = {
  question: string
  answers: string[]
  validAnswer?: string
  urlFlag?: string
}

export enum QuestionType {
  FLAG = 'FLAG',
  CAPITAL = 'CAPITAL',
}
