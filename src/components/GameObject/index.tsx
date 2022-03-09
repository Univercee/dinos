import React from 'react';
import Actions from '../../types/Actions';
import SpriteSet from '../SpriteSet';
import ObjectState from '../../types/ObjectState';

class GameObject extends React.Component<{} ,ObjectState>
{
    private id: number;
    private temp_state: ObjectState

    constructor(data: ObjectState){
        super({})
        this.id = Date.now()
        this.state = data
        this.temp_state = data
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
        this.temp_state = this.state.onKeyDown(this.state)
        this.updateState()
        this.updatePosition()  
        this.setState(this.temp_state)  
        this.temp_state = this.state    
    }

    setSpriteSet(sprite_set: SpriteSet){
        this.temp_state.sprite_set = sprite_set
    }
    private updatePosition(){
        this.temp_state.position.x += this.temp_state.moment_speed.x * this.temp_state.direction.x
        this.temp_state.position.y += this.temp_state.moment_speed.y * this.temp_state.direction.y
    }    
    private updateState() {
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
        }
    }
}
export default GameObject;