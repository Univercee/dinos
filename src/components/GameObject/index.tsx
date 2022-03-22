import Actions from '../../types/Actions';
import { ObjectState } from '../../interfaces/ObjectState';
import GameObjects from '../../GameObjects';
import { SpriteSet } from '../../interfaces/SpriteSet';
import { IJumpable } from '../../interfaces/Jumpable';

abstract class GameObject extends ObjectState implements IJumpable
{
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
        super(name, frame_width, sprite_set, speed, run_speed)
        this.jump_duration = jump_duration
        this.prev_position = {x:0, y:0}
        GameObjects.push(this)
    }
    onKeyDown(){}
    onTouch(){}
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

    //getters
    getJumpStartTime(): number { return this.jump_start_time}
    getJumpTime(): number { return this.jump_duration}
    getPrevPosition() { return this.prev_position}

    //setters
    setJumpStartTime(jump_start_time: number): void {this.jump_start_time = jump_start_time}
    setJumpTime(jump_duration: number): void {this.jump_duration = jump_duration}
}
export default GameObject;