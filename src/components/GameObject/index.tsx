import React from 'react';
import Actions from '../../types/Actions';
import SpriteSet from '../SpriteSet';
import ObjectState from '../../types/ObjectState';

abstract class GameObject extends React.Component<{}, ObjectState>
{
    protected id: number;
    protected temp_state: ObjectState
    protected overlapListeners: Map<number, GameObject>
    protected jump_start: number
    protected time: number
    abstract onKeyDown(): void
    abstract onOverlap(obj: GameObject): void
    constructor(data: ObjectState){
        super({})
        this.id = Date.now()
        this.state = data
        this.temp_state = data
        this.overlapListeners = new Map()
        this.jump_start = -1
        this.time = 0
    }
    getId(){
        return this.id
    }
    render(){
        let coords = this.state.sprite_set.getIndex() * this.state.frame_width
        return <div 
        className="sprite" 
        style={{bottom: this.state.position.y, left: this.state.position.x, width: this.state.frame_width+"px", overflow: "hidden", transform: "scaleX("+this.state.flip+")"}}
        id={this.id.toString()}
        >
        <img 
            src={this.state.sprite_set.getSrc()} 
            alt={this.state.name} 
            style={{ objectFit: "cover", margin: "0 0 0 -"+coords+"px", width: this.state.sprite_set.getLength() * this.state.frame_width+"px"}}
        />
        </div>
    }
    tick(){
        this.state.sprite_set.tick();
        this.onKeyDown()
        this.overlapListeners.forEach((obj)=>{
            if(this.overlap(obj))this.onOverlap(obj)
        }, this)
        this.updateAction()
        this.updatePosition()  
        this.setState(this.temp_state)  
        this.temp_state = this.state   
        this.time++ 
    }

    setSpriteSet(sprite_set: SpriteSet){
        this.temp_state.sprite_set = sprite_set
    }
    overlap(obj: GameObject){
        let x = this.state.position.x + this.state.frame_width/2
        let x_min = obj.state.position.x - this.state.frame_width/2
        let x_max = x_min + obj.state.frame_width + this.state.frame_width

        let y = this.state.position.y + this.state.frame_width/2
        let y_min = obj.state.position.y - this.state.frame_width/2
        let y_max = y_min + obj.state.frame_width + this.state.frame_width
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
        this.temp_state.position.x += this.temp_state.moment_speed.x * this.temp_state.direction.x
        this.temp_state.position.y += this.temp_state.moment_speed.y * this.temp_state.direction.y
    }    
    private updateAction() {
        switch(this.state.action){
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