import GameObject from '../GameObject'
import SpriteSet from '../SpriteSet'
import SpriteSetData from '../../types/SpriteSetData'
import Actions from '../../types/Actions'
import ObjectState from '../../types/ObjectState'

import blue_dino_image from '../../sprites/BlueDino.png'
import red_dino_image from '../../sprites/RedDino.png'

const red_dino_sprite_data: SpriteSetData = {
    name: "RedDino",
    src: red_dino_image,
    sprite_breakpoints: new Map<Actions, Array<number>>([
        [Actions.Idle, [0, 4]], 
        [Actions.Walk, [4, 10]],
        [Actions.Jump, [11, 11]], 
        [Actions.Cry, [14, 17]], 
        [Actions.Run, [18, 24]]
    ]),
    length: 24
}
const blue_dino_sprite_data: SpriteSetData = {
    name: "BlueDino",
    src: blue_dino_image,
    sprite_breakpoints: new Map<Actions, Array<number>>([
        [Actions.Idle, [0, 4]], 
        [Actions.Walk, [4, 10]], 
        [Actions.Jump, [11, 11]], 
        [Actions.Cry, [14, 17]],
        [Actions.Run, [18, 24]]
    ]),
    length: 24
}
const data: ObjectState = {
    name: "Dino",
    frame_width: 50,
    action: Actions.Idle,
    sprite_set: new SpriteSet(red_dino_sprite_data),
    direction: {x: 0, y: 0},
    position: {x: 0, y: 0},
    speed: {x: 4, y: 4},
    run_speed: {x: 8, y: 0},
    moment_speed: {x: 0, y: 0},
    flip: 1,
    jump_time: 10
}

class Dino extends GameObject{
    private SPRITE_SETS: Map<string, SpriteSet> = new Map([
        ["blue", new SpriteSet(blue_dino_sprite_data)],
        ["red", new SpriteSet(red_dino_sprite_data)]
    ])
    constructor(){
        super(data)
    }
    onKeyDown(){
        let keys = (window as any).keys
        if(this.temp_state.action === Actions.Jump){
            if(this.is_jump()){
                return
            }
        }
        if(keys.a && !keys.d){
            this.temp_state.flip = -1
            this.temp_state.direction = {x:-1, y:0}
            this.temp_state.action = Actions.Walk
            if(keys.shift){
                this.temp_state.action = Actions.Run
            }
            if(keys[' ']){
                this.temp_state.direction = {x:-1, y:-1}
                this.temp_state.action = Actions.Jump
                this.jump_start = this.time
            }
        }
        else if(keys.d && !keys.a){
            this.temp_state.flip = 1
            this.temp_state.direction = {x:1, y:0}
            this.temp_state.action = Actions.Walk
            if(keys.shift){
                this.temp_state.action = Actions.Run
            }
            if(keys[' ']){
                this.temp_state.direction = {x:1, y:-1}
                this.temp_state.action = Actions.Jump
                this.jump_start = this.time
            }
        }
        else if(keys.d && !keys.a){
            this.temp_state.flip = 1
            this.temp_state.direction = {x:1, y:0}
            this.temp_state.action = Actions.Walk
            if(keys.shift){
                this.temp_state.action = Actions.Run
            }
        }
        else if(keys[' ']){
            this.temp_state.flip = 1
            this.temp_state.direction = {x:0, y:-1}
            this.temp_state.action = Actions.Jump
            this.jump_start = this.time
        }
        else{
            this.temp_state.direction = {x:0, y:0};
            this.temp_state.action = Actions.Idle
        }
        this.temp_state.sprite_set.setAction(this.temp_state.action)
    }
    onOverlap(obj: GameObject): void {
        let keys = (window as any).keys
        switch(obj.constructor.name){
            case "Cristall":
            if(keys.e){
                this.setSpriteSet(this.SPRITE_SETS.get("blue")!)
            }
        }
    }
}

export default Dino;