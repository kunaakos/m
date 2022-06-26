import { RgbColor, HexColor } from '@m/type'

export const hexToRgb = (hexColor: HexColor): RgbColor => [
    parseInt(hexColor.slice(1, 3), 16),
    parseInt(hexColor.slice(3, 5), 16),
    parseInt(hexColor.slice(5, 7), 16),
]

const toPaddedHex = (rgbComponent: number) => Math.round(rgbComponent).toString(16).padStart(2, '0')

export const rgbToHex = (rgbColor: RgbColor): HexColor => `#${rgbColor.map(toPaddedHex).join('')}`

export const hexToCssRgba = (hexColor: HexColor, alpha: number) => `rgba(${[...hexToRgb(hexColor), alpha].join(',')})`

export const blendHexColors = (firstColor: HexColor, secondColor: HexColor, percentage: number) => {
    const firstColorRgb = hexToRgb(firstColor)
    const secondColorRgb = hexToRgb(secondColor)
    const p = percentage / 100
    return rgbToHex([
        (1 - p) * firstColorRgb[0] + p * secondColorRgb[0],
        (1 - p) * firstColorRgb[1] + p * secondColorRgb[1],
        (1 - p) * firstColorRgb[2] + p * secondColorRgb[2],
    ])
}
