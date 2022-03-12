import GameObject from '../GameObject'
import SpriteSet from '../SpriteSet'
import Actions from '../../types/Actions'
import ObjectState from '../../types/ObjectState'
import { blue_dino_sprite, green_dino_sprite, red_dino_sprite, yellow_dino_sprite } from '../../sprites'
import Colors from '../../types/Colors'
import { Cristall } from '../Cristall'

export const data: ObjectState = {
    name: "Dino",
    frame_width: 50,
    action: Actions.Idle,
    sprite_set: new SpriteSet(blue_dino_sprite),
    direction: {x: 0, y: 0},
    position: {x: 200, y: 0},
    speed: {x: 4, y: 4},
    run_speed: {x: 8, y: 0},
    moment_speed: {x: 0, y: 0},
    flip: 1,
    jump_time: 10,
    visability: true
}
export class Dino extends GameObject{
    private SPRITE_SETS: Map<Colors, SpriteSet> = new Map([
        [Colors.Blue, new SpriteSet(blue_dino_sprite)],
        [Colors.Red, new SpriteSet(red_dino_sprite)],
        [Colors.Green, new SpriteSet(green_dino_sprite)],
        [Colors.Yellow, new SpriteSet(yellow_dino_sprite)],
    ])
    private color: Colors
    constructor(color: Colors){
        super(JSON.parse(JSON.stringify(data)))
        this.color = color
        this.setSpriteSet(this.SPRITE_SETS.get(color)!)
    }
    getColor(){
        return this.color
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
                    this.setSpriteSet(this.SPRITE_SETS.get((obj as Cristall).getColor())!)
                }
        }
    }
    onBeginOverlap(obj: GameObject): void {
          
    }
    onEndOverlap(obj: GameObject): void {
        
    }
}