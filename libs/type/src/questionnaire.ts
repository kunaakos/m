import { Id } from './misc'

// Definitions of Questionnaires and responses

export type Questionnaire = {
    type: 'Questionnaire'
    id: Id
    questions: Question[]
}
export type QuestionnaireResponse = {
    type: 'QuestionnaireResponse'
    userId: Id
    questionnaireId: Id
    responses: QuestionResponse[]
}

// Generic definitions of questions and responses

export type GenericQuestion<TypeIdentifier> = {
    type: TypeIdentifier
    id: Id
    prompt: string
}
export type GenericQuestionResponse<TypeIdentifier, ResponseType> = {
    type: TypeIdentifier
    userId: Id
    questionnaireId: Id
    questionId: Id
    value: ResponseType
}

// Specific question and answer definitions

export type SlidingScaleQuestion = GenericQuestion<'SlidingScaleQuestion'> & {
    extremes: [string, string]
}
export type SlidingScaleQuestionResponse = GenericQuestionResponse<'SlidingScaleQuestionResponse', number>

export type TestQuestion = GenericQuestion<'TestQuestion'>
export type TestQuestionResponse = GenericQuestionResponse<'TestQuestionResponse', string>

// Union types of all question and answer types (don't forget to add new ones!)

export type Question = SlidingScaleQuestion | TestQuestion
export type QuestionResponse = SlidingScaleQuestionResponse | TestQuestionResponse
