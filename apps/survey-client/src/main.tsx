import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import { Global } from '@emotion/react'

import { App } from './components/App'
import { globalStyles } from '@m/ui'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <StrictMode>
        <Global styles={globalStyles} />
        <App />
    </StrictMode>,
)
