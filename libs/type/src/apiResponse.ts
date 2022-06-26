export type ApiResponse<PayloadType> = OkApiResponse<PayloadType> | ErrorApiResponse

export type OkApiResponse<PayloadType> = {
	type: 'OkApiResponse'
    data: PayloadType
}

export type ErrorApiResponse = {
	type: 'ErrorApiResponse'
    message: string
}
