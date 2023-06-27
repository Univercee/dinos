import { ISprite } from "./ISprite"

export interface IStatic{
    getSprite(): ISprite
    getPosition():[number,number]
    getVisibility(): boolean
    getChilds(): Array<IStatic>
    getFrameWidth(): number
    getFlip(): 1|-1
    
    setSprite(s: ISprite): void
    setPosition(p: [number, number]): void
    setFrameWidth(w: number): void
    setVisibility(v: boolean): void
    setFlip(f: 1|-1): void

}
// tick(t: number): void
// render(): JSX.Element