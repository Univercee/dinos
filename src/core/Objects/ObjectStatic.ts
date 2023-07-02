import { IAction } from "../../interfaces/IAction"
import { ISprite } from "../../interfaces/ISprite"
import { IStatic } from "../../interfaces/IStatic"
import Actions from "../../types/Actions"
import { GameObject } from "./GameObject"

export class Static implements IStatic, IAction {
    private readonly ACTION: Actions = Actions._0_Idle
    private sprite: ISprite
    private position: [number, number] = [0, 0]
    private visibility: boolean = true
    private flip: 1|-1 = 1
    private parent: IStatic|null = null
    private childs: Array<IStatic> = []
    private frame_width: number = 10
    constructor(sprite: ISprite, position: [number, number] = [0, 0]){
        this.sprite = sprite
        this.position = position
    }

    getSprite(): ISprite { return this.sprite }
    getPosition():[number,number] { return this.position}
    getVisibility(): boolean { return this.visibility }
    getFlip(): 1 | -1 { return this.flip}
    getParent(): IStatic|null { return this.parent }
    getChilds(): Array<IStatic> { return this.childs }
    getFrameWidth(): number { return this.frame_width }
    
    setSprite(s: ISprite): void { this.sprite = s }
    setPosition(p: [number, number]): void { this.position = p}
    setFrameWidth(w: number): void { this.frame_width = w }
    setVisibility(v: boolean): void { this.visibility = v }
    setFlip(f: 1 | -1): void { this.flip = f}
    
    update(o: GameObject): void {
        this.sprite.tick()
    }
    get_action(): Actions {
        return this.ACTION
    }
    rollback(o: GameObject): void {}
}