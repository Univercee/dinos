import SpriteSet from "../components/SpriteSet"
import Actions from "./Actions"

interface ObjectState{
    name: string
    frame_width: number
    action: Actions
    sprite_set: SpriteSet
    direction: {x: number, y: number}
    position: {x: number, y: number}
    speed: {x: number, y: number}
    moment_speed: {x: number, y: number} 
    run_speed: {x: number, y: number}
    flip: 1|-1
    jump_time: number
    visibility: boolean
}

// class ObjectState{
//         name: string
//         frame_width: number
//         action: Actions
//         sprite_set: SpriteSet
//         direction: {x: number, y: number}
//         position: {x: number, y: number}
//         speed: {x: number, y: number}
//         moment_speed: {x: number, y: number} 
//         run_speed: {x: number, y: number}
//         flip: 1|-1
//         jump_time: number
//         visability: boolean
//     constructor(name: string, 
//         frame_width: number, 
//         sprite_set: SpriteSet,
//         action: Actions = Actions.Idle,
//         direction: {x: number, y: number} = {x:0, y:0},
//         position: {x: number, y: number} = {x:0, y:0},
//         speed: {x: number, y: number} = {x:0, y:0},
//         moment_speed: {x: number, y: number} = {x:0, y:0},
//         run_speed: {x: number, y: number} = {x:0, y:0},
//         flip: 1|-1 = 1,
//         jump_time: number = 0,
//         visability: boolean = false){
//             this.name = name
//             this.frame_width = frame_width
//             this.action = action
//             this.sprite_set = sprite_set
//             this.direction = direction
//             this.position = position
//             this.speed = speed
//             this.moment_speed = moment_speed
//             this.run_speed = run_speed
//             this.flip = flip
//             this.jump_time = jump_time
//             this.visability = visability
//         }
// }

export default ObjectState