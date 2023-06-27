export interface IJumpable {
    getDuration(): number
    getTime(): number

    setDuration(d: number): void

    jump(): void 
    is_jump(): number
}