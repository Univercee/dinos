import GameObject from '../GameObject'
import SpriteSet from '../SpriteSet'
import Actions from '../../types/Actions'
import ObjectState from '../../types/ObjectState'
import { blue_dino_sprite, green_dino_sprite, red_dino_sprite, yellow_dino_sprite } from '../../sprites'
import Colors from '../../types/Colors'
import { Cristall } from '../Cristall'
import { input } from '../../keyListener'
import Keys from '../../types/Keys'

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
    visibility: true
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
        if(this.temp_state.action === Actions.Jump){
            if(this.is_jump()){
                return
            }
        }
        if(input.get(Keys.A) && !input.get(Keys.D)){
            this.temp_state.flip = -1
            this.temp_state.direction = {x:-1, y:0}
            this.temp_state.action = Actions.Walk
            if(input.get(Keys.Shift)){
                this.temp_state.action = Actions.Run
            }
            if(input.get(Keys.Space)){
                this.temp_state.direction = {x:-1, y:-1}
                this.temp_state.action = Actions.Jump
                this.jump_start = this.time
            }
        }
        else if(input.get(Keys.D) && !input.get(Keys.A)){
            this.temp_state.flip = 1
            this.temp_state.direction = {x:1, y:0}
            this.temp_state.action = Actions.Walk
            if(input.get(Keys.Shift)){
                this.temp_state.action = Actions.Run
            }
            if(input.get(Keys.Space)){
                this.temp_state.direction = {x:1, y:-1}
                this.temp_state.action = Actions.Jump
                this.jump_start = this.time
            }
        }
        else if(input.get(Keys.Space)){
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
        switch(obj.constructor.name){
            case "Cristall":
                if(input.get(Keys.E)){
                    this.setSpriteSet(this.SPRITE_SETS.get((obj as Cristall).getColor())!)
                }
        }
    }
    onBeginOverlap(obj: GameObject): void {
          
    }
    onEndOverlap(obj: GameObject): void {
        
    }
}