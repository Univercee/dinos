import { Vector2d } from "../core/tools/Vector2d"
import { ISprite } from "./ISprite"

export interface IStatic{
    getSprite(): ISprite
    getPosition(): Vector2d
    getVisibility(): boolean
    getChilds(): Array<IStatic>
    getWidth(): number
    getHeight(): number
    getFlip(): 1|-1
    
    setSprite(s: ISprite): void
    setPosition(p: Vector2d): void
    setWidth(w: number): void
    setHeight(h: number): void
    setVisibility(v: boolean): void
    setFlip(f: 1|-1): void

}
// tick(t: number): void
// render(): JSX.Element