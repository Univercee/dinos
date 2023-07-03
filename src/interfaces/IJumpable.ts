export interface IJumpable {
    getDuration(): number
    getSpeed(): number
    getTime(): number

    setDuration(d: number): void
    setSpeed(s: number): void

    jump(): void 
    is_jump(): number
}