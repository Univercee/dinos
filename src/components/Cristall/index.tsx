import GameObject from '../GameObject'
import SpriteSet from '../SpriteSet'
import SpriteSetData from '../../types/SpriteSetData'
import Actions from '../../types/Actions'
import ObjectState from '../../types/ObjectState'

import blue_cristall_image from '../../sprites/BlueCristall.png'

let sprite_set_data: SpriteSetData = {
    name: "BlueCristall",
    src: blue_cristall_image,
    sprite_breakpoints: new Map<Actions, Array<number>>([
        [Actions.Idle, [0, 6]]
    ]),
    length: 6
}
const data: ObjectState = {
    name: "Cristall",
    frame_width: 50,
    action: Actions.Idle,
    sprite_set: new SpriteSet(sprite_set_data),
    direction: {x: 0, y: 0},
    position: {x: 200, y: 0},
    speed: {x: 0, y: 0},
    run_speed: {x: 0, y: 0},
    moment_speed: {x: 0, y: 0},
    flip: 1,
    jump_time: 0
}

class Cristall extends GameObject{
    constructor(){
        super(data)
    }
    onKeyDown(): void {
        
    }
    onOverlap(obj: GameObject): void {
        
    }
}
export default Cristall;