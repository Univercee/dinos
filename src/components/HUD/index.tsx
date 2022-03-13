import GameObject from '../GameObject'
import { SpriteSet } from '../../interfaces/SpriteSet'
import { hud_a_sprite, hud_d_sprite, hud_e_sprite, hud_shift_sprite } from '../../sprites'
import Keys from '../../types/Keys'
import Classes from '../../types/Classes'

export class Hud extends GameObject{
    readonly classname: Classes = Classes.Hud
    private static SPRITE_SETS: Map<Keys, SpriteSet> = new Map([
        [Keys.A, hud_a_sprite],
        [Keys.D, hud_d_sprite],
        [Keys.E, hud_e_sprite],
        [Keys.Shift, hud_shift_sprite],
        //[Keys.Space, new SpriteSet(yellow_dino_sprite)],
    ])
    constructor(key: Keys){
        super("Cristall", 30, Hud.SPRITE_SETS.get(key)!, {x:0, y:0}, {x:0, y:0})
        this.setVisibility(false)
    }
    onTouch(): void {
        
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