import { Vector2d } from "../core/tools/Vector2d"

export interface IMoveable {
    getSpeed(): number
    getDirection(): number
    getPrevPosition(): Vector2d
    setSpeed(s: number): void
    setDirection(d: number): void
} 