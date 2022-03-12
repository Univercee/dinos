import GameObject from '../GameObject'
import SpriteSet from '../SpriteSet'
import Actions from '../../types/Actions'
import ObjectState from '../../types/ObjectState'
import { hud_a_sprite, hud_d_sprite, hud_e_sprite, hud_shift_sprite } from '../../sprites'
import Keys from '../../types/Keys'


export const data: ObjectState = {
    name: "hud",
    frame_width: 30,
    action: Actions.Idle,
    sprite_set: new SpriteSet(hud_e_sprite),
    direction: {x: 0, y: 0},
    position: {x: 0, y: 0},
    speed: {x: 0, y: 0},
    run_speed: {x: 0, y: 0},
    moment_speed: {x: 0, y: 0},
    flip: 1,
    jump_time: 0,
    visibility: false
}

export class Hud extends GameObject{
    private SPRITE_SETS: Map<Keys, SpriteSet> = new Map([
        [Keys.A, new SpriteSet(hud_a_sprite)],
        [Keys.D, new SpriteSet(hud_d_sprite)],
        [Keys.E, new SpriteSet(hud_e_sprite)],
        [Keys.Shift, new SpriteSet(hud_shift_sprite)],
        //[Keys.Space, new SpriteSet(yellow_dino_sprite)],
    ])
    constructor(key: Keys){
        super(JSON.parse(JSON.stringify(data)))
        this.setSpriteSet(this.SPRITE_SETS.get(key)!)
        this.name = "Hud"
    }
    onKeyDown(): void {
        
    }
    onOverlap(obj: GameObject): void {
        
    }
    onBeginOverlap(obj: GameObject): void {
        
    }
    onEndOverlap(obj: GameObject): void {
        
    }
}