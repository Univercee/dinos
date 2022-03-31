import { GameObject } from '../GameObject'
import { Sprite } from '../../interfaces/Sprite'
import { hud_a_sprite, hud_d_sprite, hud_e_sprite, hud_shift_sprite, hud_space_sprite } from '../../sprites'
import Keys from '../../types/Keys'
import Classes from '../../types/Classes'

export class Hud extends GameObject{
    protected classname = Classes.Hud
    private static SPRITE_SETS: Map<Keys, Sprite> = new Map([
        [Keys.A, hud_a_sprite],
        [Keys.D, hud_d_sprite],
        [Keys.E, hud_e_sprite],
        [Keys.Shift, hud_shift_sprite],
        [Keys.Space, hud_space_sprite]
        //[Keys.Space, new SpriteSet(yellow_dino_sprite)],
    ])
    constructor(key: Keys){
        super(Hud.SPRITE_SETS.get(key)!)
    }
}