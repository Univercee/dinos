import { GameObject } from "../components/GameObject"
import Actions from "../types/Actions"
import { Sprite } from "./Sprite"

export interface IAction{
    update_action(): Actions
    update(o: GameObject): void
}
export interface IStatic{
    getSprite(): Sprite
    getPosition():[number,number]
    getVisibility(): boolean
    getChilds(): Array<IStatic>
    getFrameWidth(): number
    getFlip(): 1|-1
    
    setSprite(s: Sprite): void
    setPosition(p: [number, number]): void
    setFrameWidth(w: number): void
    setVisibility(v: boolean): void
    setFlip(f: 1|-1): void

}
// tick(t: number): void
// render(): JSX.Element
export class Static implements IStatic, IAction {
    private readonly UPDATE_ACTION: Actions = Actions._0_Idle
    private sprite: Sprite
    private position: [number, number] = [0, 0]
    private visibility: boolean = true
    private flip: 1|-1 = 1
    private parent: IStatic|null = null
    private childs: Array<IStatic> = []
    private frame_width: number = 10
    constructor(sprite: Sprite, position: [number, number] = [0, 0]){
        this.sprite = sprite
        this.position = position
    }

    getSprite(): Sprite { return this.sprite }
    getPosition():[number,number] { return this.position}
    getVisibility(): boolean { return this.visibility }
    getFlip(): 1 | -1 { return this.flip}
    getParent(): IStatic|null { return this.parent }
    getChilds(): Array<IStatic> { return this.childs }
    getFrameWidth(): number { return this.frame_width }
    
    setSprite(s: Sprite): void { this.sprite = s }
    setPosition(p: [number, number]): void { this.position = p}
    setFrameWidth(w: number): void { this.frame_width = w }
    setVisibility(v: boolean): void { this.visibility = v }
    setFlip(f: 1 | -1): void { this.flip = f}
    
    update(o: GameObject): void {
        this.sprite.tick()
    }
    update_action(): Actions {
        return this.UPDATE_ACTION
    }
}
export interface IMovable {
    getSpeed(): number
    getDirection(): number

    setSpeed(s: number): void
    setDirection(d: number): void
} 
export class Walkable implements IMovable, IAction {
    private readonly UPDATE_ACTION: Actions = Actions._1_Walk
    private speed: number 
    private direction: number = 0
    constructor(speed: number){
        this.speed = speed
    }
    getSpeed(): number { return this.speed }
    getDirection(): number { return this.direction }

    setSpeed(s: number): void { this.speed = s }
    setDirection(d: number): void { this.direction = d }

    update(o: GameObject): void {
        let position = o.getStatic().getPosition()
        o.getStatic().setPosition([position[0]+this.speed*this.direction, position[1]])
    }
    update_action(): Actions {
        return this.UPDATE_ACTION
    }
}
export class Runnable implements IMovable, IAction {
    private readonly UPDATE_ACTION: Actions = Actions._2_Run
    private speed: number 
    private direction: number = 0
    constructor(speed: number){
        this.speed = speed
    }
    getSpeed(): number { return this.speed }
    getDirection(): number { return this.direction }

    setSpeed(s: number): void { this.speed = s }
    setDirection(d: number): void { this.direction = d }

    update(o: GameObject): void {
        let position = o.getStatic().getPosition()
        o.getStatic().setPosition([position[0]+this.speed*this.direction, position[1]])
    }
    update_action(): Actions {
        return this.UPDATE_ACTION
    }
}
export interface IJumpable {
    getDuration(): number
    getTime(): number

    setDuration(d: number): void

    jump(): void 
    is_jump(): number
}
export class Jumpable implements IJumpable, IAction {
    private readonly UPDATE_ACTION: Actions = Actions._3_Jump
    private duration: number
    private speed: number
    private time: number = 0
    constructor(duration: number, speed: number){
        this.duration = duration
        this.speed = speed
    }
    getDuration(): number { return this.duration }
    getTime(): number { return this.time }

    setDuration(d: number): void { this.duration = d }

    jump(): void {
        this.time = this.duration-1
    }
    is_jump(): number{
        return this.time
    }
    update(o: GameObject): void {
        if(this.is_jump()){
            let position = o.getStatic().getPosition()
            let shift = this.speed * (this.is_jump()-this.duration/2)
            o.getStatic().setPosition([position[0], position[1]+shift])
            this.time--
        }
    }
    update_action(): Actions {
        return this.UPDATE_ACTION
    }
}
export interface IOverlapListener {
    addListener(o: GameObject): void
    removeListener(o: GameObject): void
    isOverlap(o_this: GameObject, o: GameObject): boolean
    listen(target: GameObject): void
    getTargets(): Array<GameObject>
    getPrevTargets(): Array<GameObject>
}
export interface IOverlapSubscriber {
    onBeginOverlap(o_this: GameObject, o: GameObject): void
    onEndOverlap(o_this: GameObject, o: GameObject): void
    onOverlap(o_this: GameObject, o: GameObject): void
}
export class OverlapListener implements IOverlapListener {
    private listeners: Array<GameObject> = []
    private targets: Array<GameObject> = []
    private prev_targets: Array<GameObject> = []
    addListener(o: GameObject): void{ this.listeners.push(o) }
    removeListener(o: GameObject): void { this.listeners = this.listeners.filter((el)=>{return el !== o})}
    isOverlap(o_this: GameObject, o: GameObject): boolean {
        let x = o_this.getStatic().getPosition()[0] + o_this.getStatic().getFrameWidth()/2
        let x_min = o.getStatic().getPosition()[0] - o_this.getStatic().getFrameWidth()/2
        let x_max = x_min + o.getStatic().getFrameWidth() + o_this.getStatic().getFrameWidth()

        let y = o_this.getStatic().getPosition()[1] + o_this.getStatic().getFrameWidth()/2
        let y_min = o.getStatic().getPosition()[1] - o_this.getStatic().getFrameWidth()/2
        let y_max = y_min + o.getStatic().getFrameWidth() + o_this.getStatic().getFrameWidth()
        return ((x-x_min)*(x-x_max) <= 0 && (y-y_min)*(y-y_max) <= 0)
    }
    getTargets(){ return this.targets }
    getPrevTargets(){ return this.prev_targets }
    
    listen(target: GameObject): void {
        this.listeners.forEach((o)=>{
            if(this.isOverlap(o, target)){
                if(!this.prev_targets.includes(o)){
                    o.onBeginOverlap(target)
                }
                this.targets.push(o)
                o.onOverlap(target)
            }
            else{
                if(this.prev_targets.includes(o)){
                    o.onEndOverlap(target)
                }
                this.targets = this.targets.filter((el)=>{return el !== o})
            }
        }) 
        this.prev_targets = this.targets
    }
}