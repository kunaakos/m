import { HexColor } from '@m/type'

type ThemeType = {
    colors: {
        [key: string]: HexColor
    }
    spacers: {
        [key: string]: number
    }
}

export const THEME: ThemeType = {
    colors: {
        background: '#000000',
        primary_1: '#EDF115',
        secondary_1: '#1FFFD7',
        warning_1: '#FD2C5B',
        neutral_1: '#101010',
        neutral_3: '#8B8B8B',
        neutral_6: '#F6F6F6',
    },
    spacers: {
        smaller: 1,
        regular: 2.2,
        larger: 3.6,
    },
}
