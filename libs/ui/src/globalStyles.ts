import { css } from '@emotion/react'
import { THEME } from './theme'

export const globalStyles = css`
    html {
        background-color: ${THEME.colors.background};
        color: ${THEME.colors.neutral_6};
        font-family: 'Inter', sans-serif;
    }
    body {
        margin: 0;
    }
`
