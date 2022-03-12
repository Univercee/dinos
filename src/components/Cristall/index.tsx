import GameObject from '../GameObject'
import SpriteSet from '../SpriteSet'
import Actions from '../../types/Actions'
import ObjectState from '../../types/ObjectState'
import { Hud } from '../HUD'
import { blue_cristall_sprite, green_cristall_sprite, red_cristall_sprite, yellow_cristall_sprite } from '../../sprites'
import Colors from '../../types/Colors'
import Keys from '../../types/Keys'

export const data: ObjectState = {
    name: "Cristall",
    frame_width: 30,
    action: Actions.Idle,
    sprite_set: new SpriteSet(blue_cristall_sprite),
    direction: {x: 0, y: 0},
    position: {x: 200, y: 0},
    speed: {x: 0, y: 0},
    run_speed: {x: 0, y: 0},
    moment_speed: {x: 0, y: 0},
    flip: 1,
    jump_time: 0,
    visability: true
}
export class Cristall extends GameObject{
    private SPRITE_SETS: Map<Colors, SpriteSet> = new Map([
        [Colors.Blue, new SpriteSet(blue_cristall_sprite)],
        [Colors.Red, new SpriteSet(red_cristall_sprite)],
        [Colors.Green, new SpriteSet(green_cristall_sprite)],
        [Colors.Yellow, new SpriteSet(yellow_cristall_sprite)],
    ])
    private color: Colors
    private hud: GameObject
    constructor(color: Colors){
        super(JSON.parse(JSON.stringify(data)))
        this.color = color
        this.setSpriteSet(this.SPRITE_SETS.get(color)!)
        this.hud = new Hud(Keys.E)
        this.hud.setPosition(this.temp_state.position.x+this.temp_state.frame_width/2-this.hud.getTempState().frame_width/2, this.temp_state.position.y+5+this.temp_state.frame_width)
        this.addChild(this.hud)
    }
    getColor(){
        return this.color
    }
    onKeyDown(): void {
        
    }
    onOverlap(obj: GameObject): void {
        
    }
    onBeginOverlap(obj: GameObject): void {
        switch(obj.constructor.name){
            case "Dino":
                this.hud.setVisability(true)
        }
    }
    onEndOverlap(obj: GameObject): void {
        switch(obj.constructor.name){
            case "Dino":
                this.hud.setVisability(false)
        }
    }
}