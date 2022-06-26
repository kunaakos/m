import React, { MouseEvent, useCallback, useEffect, useState } from 'react'

import { ApiResponse, QuestionResponse } from '@m/type'
import { useQuestionnaireService } from '../hooks/useQuestionnaireService'

import { Container, BodyText, PrimaryButton } from '@m/ui'
import { QuestionnaireForm } from './QuestionnaireForm'

export const App = () => {
    const { status, questionnaire, submitQuestionnaireResponse } = useQuestionnaireService()
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [responses, setResponses] = useState<QuestionResponse[]>([])
    const userId = 'mock-user-id'

    const responsesChangedHandler = useCallback(
        (responses: QuestionResponse[]) => setResponses(responses),
        [setResponses],
    )
    const submitClickedHandler = useCallback(async () => {
        try {
            if (!questionnaire) return
            await submitQuestionnaireResponse({
                type: 'QuestionnaireResponse',
                userId,
                questionnaireId: questionnaire.id,
                responses,
            })
            setIsSubmitted(true)
        } catch (error) {
            // @ts-ignore
            alert(`Something went wrong: ${error.message}`)
        }
    }, [responses, questionnaire, userId])

    return (
        <>
            <Container>
                {status === 'init' && <div>Loading questionnaire...</div>}
                {status === 'ok' && questionnaire === null && (
                    <div>Seems like we can't find the relevant questionnaire :(</div>
                )}
                {status === 'ok' && questionnaire !== null && !isSubmitted && (
                    <>
                        <BodyText>
                            <h1>It's feedback time!</h1>
                            <p>Look deep into your soul before you provide an answer to any of the questions below.</p>
                        </BodyText>
                        <QuestionnaireForm
                            questionnaire={questionnaire}
                            userId={userId}
                            onResponsesChanged={responsesChangedHandler}
                        />
                        <PrimaryButton onClick={submitClickedHandler}>Submit</PrimaryButton>
                    </>
                )}
                {status === 'ok' && questionnaire !== null && isSubmitted && (
                    <>
                        <BodyText>
                            <h1>Thank you for your answers!</h1>
                            <p>
                                You've answered this questionnaire and thanks to that we're one step close to better
                                understanding the issue at hand.
                            </p>
                        </BodyText>
                    </>
                )}
            </Container>
        </>
    )
}
