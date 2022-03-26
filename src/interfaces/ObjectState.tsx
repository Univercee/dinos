import React from "react"
import {SpriteSet} from "../interfaces/SpriteSet"
import Actions from "../types/Actions"
import Classes from "../types/Classes"



export interface IObjectState{
    addChild(obj: IObjectState): void
    removeChild(obj: IObjectState): void
    getId(): number
    getName(): string
    getFrameWidth(): number
    getSpriteSet(): SpriteSet
    getSpeed(): {x: number, y: number}
    getRunSpeed(): {x: number, y: number}
    getAction(): Actions
    getDirection(): {x: number, y: number}
    getPosition(): {x: number, y: number}
    getMomentSpeed(): {x: number, y: number}
    getFlip(): 1|-1
    getVisibility(): boolean
    getChilds(): Array<IObjectState>
    getParent(): IObjectState|null
    getClassname(): Classes
    setName(name: string): void
    setFrameWidth(frame_width: number): void
    setSpriteSet(sprite_set: SpriteSet): void
    setSpeed(speed: {x: number, y: number}): void
    setRunSpeed(run_speed: {x: number, y: number}): void
    setAction(action: Actions): void
    setDirection(direction: {x: number, y: number}): void
    setPosition(x: number, y: number): void
    setMomentSpeed(moment_speed: {x: number, y: number}): void
    setFlip(flip: 1|-1): void
    setVisibility(visibility: boolean): void
    setParent(parent: IObjectState|null): void
    render(): React.ReactNode
}