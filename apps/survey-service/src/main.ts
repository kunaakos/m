import * as express from 'express'
import { postQuestionnaireResponseHandler, postQuestionnaireResponsePath } from './middleware/postQuestionnaireResponseHandler'

const app = express()

app.use(express.json())

app.post(`/api/${postQuestionnaireResponsePath}`, postQuestionnaireResponseHandler )

const port = process.env.port || 3333
const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`)
})
server.on('error', console.error)
