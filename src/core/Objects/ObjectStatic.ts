import { IAction } from "../../interfaces/IAction"
import { ISprite } from "../../interfaces/ISprite"
import { IStatic } from "../../interfaces/IStatic"
import ActionName from "../../types/ActionNames"
import { Vector2d } from "../tools/Vector2d"
import { GameObject } from "./GameObject"

export class Static implements IStatic, IAction {
    private readonly ACTION: ActionName = ActionName._0_Idle
    private sprite: ISprite
    private position: Vector2d = new Vector2d()
    private visibility: boolean = true
    private flip: 1|-1 = 1
    private parent: IStatic|null = null
    private childs: Array<IStatic> = []
    private width: number = 0
    private height: number = 0
    constructor(sprite: ISprite, position: Vector2d){
        this.sprite = sprite
        this.position = position
    }

    getSprite(): ISprite { return this.sprite }
    getPosition(): Vector2d { return this.position}
    getVisibility(): boolean { return this.visibility }
    getFlip(): 1 | -1 { return this.flip}
    getParent(): IStatic|null { return this.parent }
    getChilds(): Array<IStatic> { return this.childs }
    getWidth(): number { return this.width }
    getHeight(): number { return this.height }
    
    setSprite(s: ISprite): void { this.sprite = s }
    setPosition(p: Vector2d): void { this.position = p}
    setWidth(w: number): void { this.width = w }
    setHeight(h: number): void { this.height = h }
    setVisibility(v: boolean): void { this.visibility = v }
    setFlip(f: 1 | -1): void { this.flip = f}
    
    update(o: GameObject): void {
        this.sprite.tick()
    }
    name(): ActionName {
        return this.ACTION
    }
    rollback(o: GameObject): void {}
}