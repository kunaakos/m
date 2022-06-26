import { useEffect, useState } from 'react'
import { MOCK_QUESTIONNAIRE } from './mock-data'
import { ServiceHookStatus, Questionnaire, QuestionnaireResponse, ApiResponse } from '@m/type'

type UseQuestionnaireServiceReturns = {
    status: ServiceHookStatus
    questionnaire: Questionnaire | null
    submitQuestionnaireResponse: (questionnaireResponse: QuestionnaireResponse) => void
}

const getErrorMessage = (error: unknown) => {
    if (error instanceof Error) return error.message
    return String(error)
}

const submitQuestionnaireResponse = async (questionnaireResponse: QuestionnaireResponse) => {
    const response = await fetch('/api/questionnaire/qid/response/uid', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(questionnaireResponse),
    })
    const apiResponse: ApiResponse<null> = await response.json()
    if (apiResponse.type === 'ErrorApiResponse') {
        throw new Error(apiResponse.message)
    } else if (!response.ok) {
        throw new Error('server error')
    }
}

export const useQuestionnaireService = (): UseQuestionnaireServiceReturns => {
    const [status, setStatus] = useState<UseQuestionnaireServiceReturns['status']>('init')
    const [questionnaire, setQuestionnaire] = useState<UseQuestionnaireServiceReturns['questionnaire']>(null)

    useEffect(() => {
        setStatus('ok')
        setQuestionnaire(MOCK_QUESTIONNAIRE)
    }, [setStatus, setQuestionnaire])

    return {
        status,
        questionnaire,
        submitQuestionnaireResponse,
    }
}
