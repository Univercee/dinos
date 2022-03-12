import SpriteSetData from '../types/SpriteSetData'
import Actions from '../types/Actions'

import hud_a from './hud_a.png'
import hud_d from './hud_d.png'
import hud_e from './hud_e.png'
import hud_shift from './hud_shift.png'

import blue_dino from './BlueDino.png'
import red_dino from './RedDino.png'
import green_dino from './GreenDino.png'
import yellow_dino from './YellowDino.png'

import blue_cristall from './BlueCristall.png'
import red_cristall from './RedCristall.png'
import green_cristall from './GreenCristall.png'
import yellow_cristall from './YellowCristall.png'

export const red_dino_sprite: SpriteSetData = {
    name: "RedDino",
    src: red_dino,
    sprite_breakpoints: new Map<Actions, Array<number>>([
        [Actions.Idle, [0, 4]], 
        [Actions.Walk, [4, 10]],
        [Actions.Jump, [11, 11]], 
        [Actions.Cry, [14, 17]], 
        [Actions.Run, [18, 24]]
    ]),
    length: 24
}
export const blue_dino_sprite: SpriteSetData = {
    name: "BlueDino",
    src: blue_dino,
    sprite_breakpoints: new Map<Actions, Array<number>>([
        [Actions.Idle, [0, 4]], 
        [Actions.Walk, [4, 10]], 
        [Actions.Jump, [11, 11]], 
        [Actions.Cry, [14, 17]],
        [Actions.Run, [18, 24]]
    ]),
    length: 24
}
export const green_dino_sprite: SpriteSetData = {
    name: "GreenDino",
    src: green_dino,
    sprite_breakpoints: new Map<Actions, Array<number>>([
        [Actions.Idle, [0, 4]], 
        [Actions.Walk, [4, 10]], 
        [Actions.Jump, [11, 11]], 
        [Actions.Cry, [14, 17]],
        [Actions.Run, [18, 24]]
    ]),
    length: 24
}
export const yellow_dino_sprite: SpriteSetData = {
    name: "YellowDino",
    src: yellow_dino,
    sprite_breakpoints: new Map<Actions, Array<number>>([
        [Actions.Idle, [0, 4]], 
        [Actions.Walk, [4, 10]], 
        [Actions.Jump, [11, 11]], 
        [Actions.Cry, [14, 17]],
        [Actions.Run, [18, 24]]
    ]),
    length: 24
}
export const blue_cristall_sprite: SpriteSetData = {
    name: "BlueCristall",
    src: blue_cristall,
    sprite_breakpoints: new Map<Actions, Array<number>>([
        [Actions.Idle, [0, 6]]
    ]),
    length: 6
}
export const red_cristall_sprite: SpriteSetData = {
    name: "RedCristall",
    src: red_cristall,
    sprite_breakpoints: new Map<Actions, Array<number>>([
        [Actions.Idle, [0, 6]]
    ]),
    length: 6
}
export const green_cristall_sprite: SpriteSetData = {
    name: "GreenCristall",
    src: green_cristall,
    sprite_breakpoints: new Map<Actions, Array<number>>([
        [Actions.Idle, [0, 6]]
    ]),
    length: 6
}
export const yellow_cristall_sprite: SpriteSetData = {
    name: "YellowCristall",
    src: yellow_cristall,
    sprite_breakpoints: new Map<Actions, Array<number>>([
        [Actions.Idle, [0, 6]]
    ]),
    length: 6
}
export const hud_a_sprite: SpriteSetData = {
    name: "hud_a",
    src: hud_a,
    sprite_breakpoints: new Map<Actions, Array<number>>([
        [Actions.Idle, [0, 1]]
    ]),
    length: 1
}
export const hud_d_sprite: SpriteSetData = {
    name: "hud_d",
    src: hud_d,
    sprite_breakpoints: new Map<Actions, Array<number>>([
        [Actions.Idle, [0, 1]]
    ]),
    length: 1
}
export const hud_e_sprite: SpriteSetData = {
    name: "hud_e",
    src: hud_e,
    sprite_breakpoints: new Map<Actions, Array<number>>([
        [Actions.Idle, [0, 1]]
    ]),
    length: 1
}
export const hud_shift_sprite: SpriteSetData = {
    name: "hud_shift",
    src: hud_shift,
    sprite_breakpoints: new Map<Actions, Array<number>>([
        [Actions.Idle, [0, 1]]
    ]),
    length: 1
}