import React from "react"
import {SpriteSet} from "../interfaces/SpriteSet"
import Actions from "../types/Actions"
import Classes from "../types/Classes"

var id = 0

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

export class ObjectState extends React.Component<{}, IObjectState> implements IObjectState{
    protected readonly classname: Classes = Classes.GameObject
    private id: number = id++
    private name: string
    private frame_width: number
    private sprite_set: SpriteSet
    private speed: {x: number, y: number}
    private run_speed: {x: number, y: number}
    private action = Actions.Idle
    private direction = {x: 0, y: 0}
    private position = {x: 0, y: 0}
    private moment_speed = {x: 0, y: 0}
    private flip: 1|-1 = 1
    private visibility: boolean = true
    private childs: Array<IObjectState> = []
    private parent: IObjectState|null = null

    constructor(name: string, frame_width: number, sprite_set: SpriteSet, speed: {x: number, y: number}, run_speed: {x: number, y: number}){
        super({})
        this.name = name 
        this.frame_width = frame_width 
        this.sprite_set = sprite_set 
        this.speed = speed 
        this.run_speed = run_speed 
    }
    render(){
        let coords = this.sprite_set.getIndex() * this.frame_width
        return <div 
        className="sprite" 
        style={{visibility: this.visibility ? "visible" : "hidden", bottom: this.position.y, left: this.position.x, width: this.frame_width+"px", overflow: "hidden", transform: "scaleX("+this.flip+")"}}
        key={this.id}
        id={this.id.toString()}
        >
        <img 
            src={this.sprite_set.getSrc()} 
            alt={this.constructor.name} 
            style={{ objectFit: "cover", margin: "0 0 0 -"+coords+"px", width: this.sprite_set.getLength() * this.frame_width+"px"}}
        />
        {this.childs.forEach(el => {
            el.render()
        })}
        </div>
    }
    addChild(obj: IObjectState){
        this.childs.push(obj)
        obj.setParent(this)
    }
    removeChild(obj: IObjectState){
        this.childs.filter(el => {return el !== obj})
        obj.setParent(null)
    }
    //getters
    getId(){return this.id}
    getName(){return this.name}
    getFrameWidth(){return this.frame_width}
    getSpriteSet(){return this.sprite_set}
    getSpeed(){return this.speed}
    getRunSpeed(){return this.run_speed}
    getAction(){return this.action}
    getDirection(){return this.direction}
    getPosition(){return this.position}
    getMomentSpeed(){return this.moment_speed}
    getFlip(){return this.flip}
    getVisibility(){return this.visibility}
    getChilds(){return this.childs}
    getParent(){return this.parent}
    getClassname(): Classes {
        return this.classname
    }

    //setters
    setName(name: string){this.name = name}
    setFrameWidth(frame_width: number){this.frame_width = frame_width}
    setSpriteSet(sprite_set: SpriteSet){this.sprite_set = sprite_set}
    setSpeed(speed: {x: number, y: number}){this.speed = speed}
    setRunSpeed(run_speed: {x: number, y: number}){this.run_speed = run_speed}
    setAction(action: Actions){this.action = action}
    setDirection(direction: {x: number, y: number}){this.direction = direction}
    setPosition(x: number, y: number){
        let delta = {x:this.getPosition().x-x, y:this.getPosition().y-y}
        this.position = {x, y}
        this.childs.forEach((el)=>{
            el.setPosition(el.getPosition().x-delta.x, el.getPosition().y-delta.y)
        }, this)
    }
    setMomentSpeed(moment_speed: {x: number, y: number}){this.moment_speed = moment_speed}
    setFlip(flip: 1|-1){this.flip = flip}
    setVisibility(visibility: boolean){this.visibility = visibility}
    setParent(parent: IObjectState){this.parent = parent}
}