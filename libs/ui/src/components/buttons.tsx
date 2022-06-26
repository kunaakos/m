import styled from '@emotion/styled'
import { THEME } from '../theme'
import { fontInterStandardStyles } from './typography'

export const PrimaryButton = styled.button`
    display: block;
    border: none;
    padding: 0.5rem 1.5rem;
    margin: 0;
    text-decoration: none;
    background: ${THEME.colors.primary_1};
    color: ${THEME.colors.neutral_1};
    ${fontInterStandardStyles}
    font-size: 1.25rem;
    cursor: pointer;
`
