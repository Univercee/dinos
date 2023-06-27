export interface IMovable {
    getSpeed(): number
    getDirection(): number
    getPrevPosition(): [number, number]

    setSpeed(s: number): void
    setDirection(d: number): void
} 