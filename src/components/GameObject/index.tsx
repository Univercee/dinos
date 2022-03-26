import Actions from '../../types/Actions';
import { IObjectState } from '../../interfaces/ObjectState';
import { SpriteSet } from '../../interfaces/SpriteSet';
import { IJumpable } from '../../interfaces/Jumpable';
import Classes from '../../types/Classes';
import React from 'react';
var id = 0

abstract class GameObject extends React.Component<{}, IObjectState> implements IObjectState, IJumpable{
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
    private childs: Array<GameObject> = []
    private parent: IObjectState|null = null
    protected overlapListeners: Map<number, GameObject> = new Map()
    protected overlap: Map<number, GameObject> = new Map()
    protected prev_overlap: Map<number, GameObject> = new Map()
    protected prev_position: {x:number, y:number}
    protected time: number = 0
    protected jump_duration: number
    protected jump_start_time: number = -1
    abstract onOverlap(obj: GameObject): void
    abstract onBeginOverlap(obj: GameObject): void
    abstract onEndOverlap(obj: GameObject): void
    constructor(name: string, frame_width: number, sprite_set: SpriteSet, speed: {x: number, y: number}, run_speed: {x: number, y: number}, jump_duration: number = 0){
        super({})
        this.name = name 
        this.frame_width = frame_width 
        this.sprite_set = sprite_set 
        this.speed = speed 
        this.run_speed = run_speed 
        this.jump_duration = jump_duration
        this.prev_position = {x:0, y:0}
    }
    onKeyDown(){}
    onTouch(){}
    render(){
        let coords = this.sprite_set.getIndex() * 100
        let childs = this.childs.map(el => {
            return el.render()
        })
        return <div
        className="sprite" 
        style={{visibility: this.visibility ? "visible" : "hidden", bottom: this.position.y+"%", left: this.position.x+"%", height: "max-content", width:"100%"}}
        key={this.id}
        id={this.id.toString()}>
        <div 
        style={{overflow:"hidden", width: this.frame_width+"%", transform: "scaleX("+this.flip+")"}}
        >
            <img 
                src={this.sprite_set.getSrc()} 
                alt={this.constructor.name} 
                style={{objectFit:"cover", margin: "0 0 0 -"+coords+"%", width: this.sprite_set.getLength() * 100+"%"}}
            />
        </div>
        {childs.length > 0 &&
        <div
        className="childs">
            <React.Fragment>
            {childs}
            </React.Fragment>
        </div>
        }
        </div>
    }
    is_jump(){
        let time = this.time - this.jump_start_time
        if(time <= this.jump_duration){
            return time
        }
        else{
            return 0
        }
    }
    jump(start_time: number){
        this.jump_start_time = start_time
    }
    tick(){
        this.onKeyDown()
        this.getSpriteSet().tick()  
        this.overlapListeners.forEach((obj)=>{
            if(this.is_overlap(obj)){
                if(!this.prev_overlap.has(obj.getId())){
                    this.onBeginOverlap(obj)
                }
                this.overlap.set(obj.getId(), obj)
                this.onOverlap(obj)
            }
            else{
                if(this.prev_overlap.has(obj.getId())){
                    this.onEndOverlap(obj)
                }
                this.overlap.delete(obj.getId())
            }
        }, this)
        this.updateAction()
        this.updatePosition()
        this.prev_overlap = this.overlap
        this.time++ 
        this.getChilds().forEach(el => {el.tick()})
    }
    is_overlap(obj: GameObject){
        let x = this.getPosition().x + this.getFrameWidth()/2
        let x_min = obj.getPosition().x - this.getFrameWidth()/2
        let x_max = x_min + obj.getFrameWidth() + this.getFrameWidth()

        let y = this.getPosition().y + this.getFrameWidth()/2
        let y_min = obj.getPosition().y - this.getFrameWidth()/2
        let y_max = y_min + obj.getFrameWidth() + this.getFrameWidth()
        return ((x-x_min)*(x-x_max) <= 0 && (y-y_min)*(y-y_max) <= 0)
    }
    addOverlapListener(obj: GameObject){
        this.overlapListeners.set(obj.getId(), obj)
    }
    removeOverlapListener(obj: GameObject){
        this.overlapListeners.delete(obj.getId())
    }
    private updatePosition(){
        this.prev_position.x = this.getPosition().x
        this.prev_position.y = this.getPosition().y
        let x = this.getPosition().x + this.getMomentSpeed().x * this.getDirection().x
        let y = this.getPosition().y + this.getMomentSpeed().y * this.getDirection().y
        this.setPosition(x, y)
    }
    private updateAction() {
        switch(this.getAction()){
            case Actions.Idle:
                this.setMomentSpeed({x: 0, y: 0})
                break
            case Actions.Walk:
                this.setMomentSpeed({x: this.getSpeed().x, y: 0})
                break
            case Actions.Run:
                this.setMomentSpeed({x: this.getRunSpeed().x, y: 0})
                break
            case Actions.Cry:
                this.setMomentSpeed({x: 0, y: 0})
                break
            case Actions.Jump:
                this.getMomentSpeed().y = this.getSpeed().y * (this.is_jump()-this.getJumpTime()/2)
                break
        }
    }
    addChild(obj: GameObject){
        this.childs.push(obj)
        obj.setParent(this)
    }
    removeChild(obj: GameObject){
        this.childs.filter(el => {return el !== obj})
        obj.setParent(null)
    }

    //getters
    getJumpStartTime(): number { return this.jump_start_time}
    getJumpTime(): number { return this.jump_duration}
    getPrevPosition() { return this.prev_position}
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
    getChilds(): GameObject[] {return this.childs}
    getParent(){return this.parent}
    getClassname(): Classes {
        return this.classname
    }

    //setters
    setJumpStartTime(jump_start_time: number): void {this.jump_start_time = jump_start_time}
    setJumpTime(jump_duration: number): void {this.jump_duration = jump_duration}
    setName(name: string){this.name = name}
    setFrameWidth(frame_width: number){this.frame_width = frame_width}
    setSpriteSet(sprite_set: SpriteSet){this.sprite_set = sprite_set}
    setSpeed(speed: {x: number, y: number}){this.speed = speed}
    setRunSpeed(run_speed: {x: number, y: number}){this.run_speed = run_speed}
    setAction(action: Actions){this.action = action}
    setDirection(direction: {x: number, y: number}){this.direction = direction}
    setPosition(x: number, y: number){this.position = {x, y}}
    setMomentSpeed(moment_speed: {x: number, y: number}){this.moment_speed = moment_speed}
    setFlip(flip: 1|-1){this.flip = flip}
    setVisibility(visibility: boolean){this.visibility = visibility}
    setParent(parent: GameObject|null){this.parent = parent}
}
export default GameObject;