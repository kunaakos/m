import React, { useCallback, useEffect, useState } from 'react'

import {
    Id,
    Questionnaire,
    Question,
    QuestionResponse,
    SlidingScaleQuestion,
    SlidingScaleQuestionResponse,
} from '@m/type'
import { Slider } from '@m/ui'

type SharedQuestionFieldProps = {
    onChange: (response: QuestionResponse) => void
    userId: QuestionResponse['userId']
    questionnaireId: Questionnaire['id']
}

type SlidingScaleQuestionFieldProps = SharedQuestionFieldProps & {
    question: SlidingScaleQuestion
    response: SlidingScaleQuestionResponse | null
}

const SlidingScaleQuestionField = ({
    question,
    userId,
    questionnaireId,
    response,
    onChange,
}: SlidingScaleQuestionFieldProps) => {
    const sliderValueChangeHandler = useCallback(
        (newValue: number) => {
            onChange({
                type: 'SlidingScaleQuestionResponse',
                userId,
                questionnaireId,
                questionId: question.id,
                value: newValue,
            })
        },
        [onChange],
    )
    return (
        <Slider
            id={question.id}
            prompt={question.prompt}
            extremes={question.extremes}
            onChange={sliderValueChangeHandler}
            value={response?.value || 0}
        />
    )
}

export type QuestionnaireFormProps = {
    userId: Id
    questionnaire: Questionnaire
    initialResponses?: Responses
    onResponsesChanged: (responses: QuestionResponse[]) => void
}

type Responses = {
    [key: Id]: QuestionResponse
}

const QuestionError = () => <div>Something went wrong with this question :(</div>

export const QuestionnaireForm = ({
    userId,
    questionnaire: { questions, id: questionnaireId },
    initialResponses,
    onResponsesChanged,
}: QuestionnaireFormProps) => {
    const [responses, setResponses] = useState<Responses>(initialResponses || {})
    useEffect(() => onResponsesChanged(Object.values(responses)), [responses, onResponsesChanged])

    const responseChangeHandler = useCallback(
        (question: Question) => (response: QuestionResponse) => {
            setResponses({
                ...responses,
                [question.id]: response,
            })
        },
        [setResponses, responses],
    )

    const getResponse = (questionId: Question['id']): QuestionResponse | null => responses[questionId] || null

    return (
        <>
            {questions.map((question) => {
                const response = getResponse(question.id)
                switch (question.type) {
                    case 'SlidingScaleQuestion':
                        if (response !== null && response.type !== 'SlidingScaleQuestionResponse') {
                            return <QuestionError />
                        } else {
                            return (
                                <SlidingScaleQuestionField
                                    key={question.id}
                                    question={question}
                                    response={response}
                                    userId={userId}
                                    questionnaireId={questionnaireId}
                                    onChange={responseChangeHandler(question)}
                                />
                            )
                        }
                    default:
                        return <QuestionError />
                }
            })}
        </>
    )
}
