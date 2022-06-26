import { ErrorApiResponse, isQuestionnaireResponse, OkApiResponse } from '@m/type'

export const postQuestionnaireResponsePath = 'questionnaire/:questionnaireId/response/:userId'

export const postQuestionnaireResponseHandler = (request, response) => {
    try {
        const { questionnaireId, userId } = request.params
        const questionnaireResponse = request.body
        if (isQuestionnaireResponse(questionnaireResponse)) {
			// STORE!
            const OkResponse: OkApiResponse<null> = { type: 'OkApiResponse', data: null }
            response.json(OkResponse)
        } else {
            const errorResponse: ErrorApiResponse = { type: 'ErrorApiResponse', message: 'Response format is not valid.' }
            response.status(400)
            response.json(errorResponse)
        }
    } catch (error) {
        const errorResponse: ErrorApiResponse = { type: 'ErrorApiResponse', message: error.message }
        response.status(500)
        response.json(errorResponse)
    }
}
