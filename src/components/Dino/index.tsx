import GameObject from '../GameObject'
import SpriteSet from '../SpriteSet'
import SpriteSetData from '../../types/SpriteSetData'
import blue_dino_image from '../../sprites/BlueDido.png'
import Actions from '../../types/Actions'
import ObjectState from '../../types/ObjectState'
import KeyHundler from '../../types/KeyHundler'

let sprite_set_data: SpriteSetData = {
    name: "BlueDino",
    src: blue_dino_image,
    sprite_breakpoints: new Map<Actions, Array<number>>([
        [Actions.Idle, [0, 4]], 
        [Actions.Walk, [4, 10]], 
        [Actions.Cry, [14, 17]], 
        [Actions.Run, [18, 24]]
    ]),
    length: 24
}
let onKeyDown: KeyHundler = function(state: ObjectState)
{
    let keys = (window as any).keys
    if(keys.a && !keys.d){
        state.flip = -1
        state.direction = {x:-1, y:0}
        state.action = Actions.Walk
        if(keys.shift){
            state.action = Actions.Run
        }
    }
    else if(keys.d && !keys.a){
        state.flip = 1
        state.direction = {x:1, y:0}
        state.action = Actions.Walk
        if(keys.shift){
            state.action = Actions.Run
        }
    }
    else if(!keys.d && !keys.a && keys.e){
        state.action = Actions.Cry
    }
    else{
        state.direction = {x:0, y:0};
        state.action = Actions.Idle
    }
    state.sprite_set.setAction(state.action)
    return state
}
const data: ObjectState = {
    name: "Dino",
    frame_width: 100,
    action: Actions.Idle,
    sprite_set: new SpriteSet(sprite_set_data),
    direction: {x: 0, y: 0},
    position: {x: 0, y: 0},
    speed: {x: 4, y: 0},
    run_speed: {x: 8, y: 0},
    moment_speed: {x: 0, y: 0},
    flip: 1,
    onKeyDown: onKeyDown
}



let dino = new GameObject(data);

export default dino;