import { ChangeEvent, useCallback, useState } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

import { THEME } from '../theme'
import { Id } from '@m/type'
import { blendHexColors, hexToCssRgba } from '@m/util'
import { bodyTextStyles4, FormLabel } from './typography'

// NOTE: this implementation is not great for performance, because each position
// of the slider will generate new CSS class in the head of the document (up to
// a point, because emotion does cache and optimize).
//
// Took this route because this is the design, and:
// 1. styling track and thumb elements inline is not possible
// 2. using extra elements would bloat the DOM
//
// Keep in mind that styling this component or using the values of more props
// for calculating styles will eventually put emotion and your browser
// to its knees.

const MIN_VALUE = -100
const MAX_VALUE = 100

const TRACK_HEIGHT = 0.5
const TRACK_COLOR = THEME.colors.neutral_1

const THUMB_SIZE = 2
const THUMB_DEFAULT_COLOR = THEME.colors.neutral_6
const THUMB_LEFT_COLOR = THEME.colors.warning_1
const THUMB_RIGHT_COLOR = THEME.colors.secondary_1

const percentageOnTrackOf = (value: number): number => (value + 100) / 2

const trackBackground = ({ value }: { value: number }): string => {
    if (value < 0) {
        const stops = [
            `${TRACK_COLOR} 0%`,
            `${TRACK_COLOR} ${percentageOnTrackOf(value)}%`,
            `${blendHexColors(THUMB_LEFT_COLOR, TRACK_COLOR, 100 - Math.abs(value))} ${percentageOnTrackOf(value)}%`,
            // `${hexToCssRgba(THUMB_LEFT_COLOR, Math.abs(value) / 100)} ${percentageOnTrackOf(value)}%`, // this is less accurate but faster
            `${TRACK_COLOR} 50%`,
            `${TRACK_COLOR} 100%`,
        ]
        return `linear-gradient(90deg, ${stops.join(', ')})`
    } else if (value > 0) {
        const stops = [
            `${TRACK_COLOR} 0%`,
            `${TRACK_COLOR} 50%`,
            `${blendHexColors(TRACK_COLOR, THUMB_RIGHT_COLOR, Math.abs(value))} ${percentageOnTrackOf(value)}%`,
            // `${hexToCssRgba(THUMB_RIGHT_COLOR, 100 - Math.abs(value) / 100)} ${percentageOnTrackOf(value)}%`, // this is less accurate but faster
            `${TRACK_COLOR} ${percentageOnTrackOf(value)}%`,
            `${TRACK_COLOR} 100%`,
        ]
        return `linear-gradient(90deg, ${stops.join(', ')})`
    } else {
        return `${TRACK_COLOR}`
    }
}

const thumbBackground = ({ value }: { value: number }): string => {
    if (value < 0) {
        return blendHexColors(THUMB_LEFT_COLOR, THUMB_DEFAULT_COLOR, 100 - Math.abs(value))
    } else if (value > 0) {
        return blendHexColors(THUMB_DEFAULT_COLOR, THUMB_RIGHT_COLOR, Math.abs(value))
    } else {
        return `${THUMB_DEFAULT_COLOR}`
    }
}

const thumbStyles = css`
    height: ${THUMB_SIZE}rem;
    width: ${THUMB_SIZE}rem;
    margin: -${THUMB_SIZE / 2 - TRACK_HEIGHT / 2}rem 0 0 0;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1); // TODO: theme
`

const RangeInput = styled.input`
    height: ${THUMB_SIZE}rem;
    background: transparent;
    -webkit-appearance: none;
    appearance: none;
    cursor: pointer;
    display: block;
    margin: 0;

    width: 100%;

    &::-webkit-slider-runnable-track {
        background: ${trackBackground};
        height: ${TRACK_HEIGHT}rem;
    }

    &::-moz-range-track {
        background: ${trackBackground};
        height: ${TRACK_HEIGHT}rem;
    }

    &::-webkit-slider-thumb {
        display: block;
        -webkit-appearance: none;
        appearance: none;

        background-color: ${thumbBackground};
        ${thumbStyles}
    }

    ::-moz-range-thumb {
        border: none;
        border-radius: 0;

        background-color: ${thumbBackground};
        ${thumbStyles}
    }

    &:focus {
        outline: none;
    }
`

const SliderContainer = styled.div`
    ${RangeInput} {
    }
    ${FormLabel} {
        margin-bottom: ${THEME.spacers.smaller}rem;
    }
    margin-bottom: ${THEME.spacers.regular}rem;
`

const ExtremeLabel = styled.div`
    ${bodyTextStyles4}
    color: ${THEME.colors.neutral_3};
`

const ExtremeLabelsContainer = styled.div`
    width: 100%;
    display: flex;
    margin-top: ${THEME.spacers.smaller}rem;
    justify-content: space-between;
`

export type SliderProps = {
    id: Id
    prompt?: string
    extremes?: [string, string]
    onChange: (value: number) => void
    value: number
}

export const Slider = ({ id, prompt, extremes, onChange, value }: SliderProps) => {
    const handleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            onChange(parseInt(e.target.value))
        },
        [onChange],
    )
    return (
        <SliderContainer>
            {prompt && <FormLabel htmlFor={id}>{prompt}</FormLabel>}
            <RangeInput id={id} type="range" min={MIN_VALUE} max={MAX_VALUE} value={value} onChange={handleChange} />
            {extremes && (
                <ExtremeLabelsContainer>
                    <ExtremeLabel>{extremes[0]}</ExtremeLabel>
                    <ExtremeLabel>{extremes[1]}</ExtremeLabel>
                </ExtremeLabelsContainer>
            )}
        </SliderContainer>
    )
}
