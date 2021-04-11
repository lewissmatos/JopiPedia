export interface QuestionModel{
  _id?: string
  desc?: string
  respuestas: Resp[]
  tema?: string
}

export interface Resp{
  desc: string
  correcta: boolean 
}