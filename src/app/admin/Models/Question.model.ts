export interface QuestionModel{
  desc?: string
  respuestas: Resp[]
  tema?: string
}

export interface Resp{
  desc: string
  correcta: boolean 
}