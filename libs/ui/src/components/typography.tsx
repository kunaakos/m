import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { THEME } from '../theme'

export const noSelection = css`
    user-select: none;
`

export const fontInterStandardStyles = css`
    font-family: 'Inter', sans-serif;
`

export const bodyTextStyles1 = css`
    ${fontInterStandardStyles}
    font-size: 1.75rem;
`

export const bodyTextStyles2 = css`
    ${fontInterStandardStyles}
    font-size: 1.25rem;
`

export const bodyTextStyles3 = css`
    ${fontInterStandardStyles}
    font-size: 1.125rem;
`

export const bodyTextStyles4 = css`
    ${fontInterStandardStyles}
    font-size: 0.75rem;
`

export const BodyText = styled.div`
    h1 {
        ${bodyTextStyles1}
    }
    h2 {
        ${bodyTextStyles2}
    }
    p {
        ${bodyTextStyles3}
    }
    margin-bottom: ${THEME.spacers.regular}rem;
`

export const FormLabel = styled.label`
    display: block;
    width: 100%;
    ${fontInterStandardStyles}
    ${bodyTextStyles3}
    ${noSelection}
`
