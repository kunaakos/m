// UUIDs are used for all entities, so a single Id type can be shared.
export type Id = string

// It's useful for hooks to report their status in a consistent manner.
export type ServiceHookStatus = 'init' | 'ok' | 'error'

// All color formats used throughout the apps
export type HexColor = `#${string}`
export type RgbColor = [number, number, number]
export type RgbaColor = [number, number, number, number]
