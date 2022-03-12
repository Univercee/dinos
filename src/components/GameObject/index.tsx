import React from 'react';
import Actions from '../../types/Actions';
import SpriteSet from '../SpriteSet';
import ObjectState from '../../types/ObjectState';
import GameObjects from '../../GameObjects';

var id = 0
abstract class GameObject extends React.Component<{}, ObjectState>
{
    protected id: number = id++
    public temp_state: ObjectState
    protected overlapListeners: Map<number, GameObject> = new Map()
    protected overlap: Map<number, GameObject> = new Map()
    protected prev_overlap: Map<number, GameObject> = new Map()
    protected jump_start: number = -1
    protected time: number = 0
    protected childs: Map<number, GameObject> = new Map()
    abstract onKeyDown(): void
    abstract onOverlap(obj: GameObject): void
    abstract onBeginOverlap(obj: GameObject): void
    abstract onEndOverlap(obj: GameObject): void
    constructor(data: ObjectState){
        super({})
        this.temp_state = data
        this.state = data
        GameObjects.push(this)
    }
    componentDidMount(){
        this.setState(this.temp_state) 
    }
    addChild(obj: GameObject){
        this.childs.set(obj.getId(), obj)
    }
    removeChild(obj: GameObject){
        this.childs.delete(obj.getId())
    }
    getId(){
        return this.id
    }
    getTempState(){
        return this.temp_state
    }
    setPosition(x: number, y: number){
        let delta = {x:this.temp_state.position.x-x, y:this.temp_state.position.y-y}
        this.temp_state.position = {x, y}
        this.childs.forEach((el)=>{
            el.setPosition(el.temp_state.position.x-delta.x, el.temp_state.position.y-delta.y)
        }, this)
    }
    setVisability(is_visible: boolean){
        this.temp_state.visibility = is_visible
    }
    render(){
        let coords = this.state.sprite_set.getIndex() * this.state.frame_width
        return <div 
        className="sprite" 
        style={{visibility: this.state.visibility ? "visible" : "hidden", bottom: this.state.position.y, left: this.state.position.x, width: this.state.frame_width+"px", overflow: "hidden", transform: "scaleX("+this.state.flip+")"}}
        key={this.getId()}
        id={this.getId().toString()}
        >
        <img 
            src={this.state.sprite_set.getSrc()} 
            alt={this.constructor.name} 
            style={{ objectFit: "cover", margin: "0 0 0 -"+coords+"px", width: this.state.sprite_set.getLength() * this.state.frame_width+"px"}}
        />
        {this.childs.forEach(el => {
            el.render()
        })}
        </div>
    }
    tick(){
        this.temp_state.sprite_set.tick();
        this.onKeyDown()
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
        
        this.time++ 
        this.prev_overlap = this.overlap
    }
    setSpriteSet(sprite_set: SpriteSet){
        this.temp_state.sprite_set = sprite_set
    }
    is_overlap(obj: GameObject){
        let x = this.temp_state.position.x + this.temp_state.frame_width/2
        let x_min = obj.temp_state.position.x - this.temp_state.frame_width/2
        let x_max = x_min + obj.temp_state.frame_width + this.temp_state.frame_width

        let y = this.temp_state.position.y + this.temp_state.frame_width/2
        let y_min = obj.temp_state.position.y - this.temp_state.frame_width/2
        let y_max = y_min + obj.temp_state.frame_width + this.temp_state.frame_width
        return ((x-x_min)*(x-x_max) <= 0 && (y-y_min)*(y-y_max) <= 0)
    }
    addOverlapListener(obj: GameObject){
        this.overlapListeners.set(obj.getId(), obj)
    }
    removeOverlapListener(obj: GameObject){
        this.overlapListeners.delete(obj.getId())
    }
    is_jump(){
        let time = this.time-this.jump_start
        return time <= this.temp_state.jump_time ? time : 0
    }
    private updatePosition(){
        let x = this.temp_state.position.x + this.temp_state.moment_speed.x * this.temp_state.direction.x
        let y = this.temp_state.position.y + this.temp_state.moment_speed.y * this.temp_state.direction.y
        this.setPosition(x, y)
    }    
    private updateAction() {
        switch(this.temp_state.action){
            case Actions.Idle:
                this.temp_state.moment_speed = {x: 0, y: 0}
                break
            case Actions.Walk:
                this.temp_state.moment_speed = {x: this.temp_state.speed.x, y: 0}
                break
            case Actions.Run:
                this.temp_state.moment_speed = {x: this.temp_state.run_speed.x, y: 0}
                break
            case Actions.Cry:
                this.temp_state.moment_speed = {x: 0, y: 0}
                break
            case Actions.Jump:
                this.temp_state.moment_speed.y = this.temp_state.speed.y * (this.is_jump()-this.temp_state.jump_time/2)
                break
        }
    }
}
export default GameObject;