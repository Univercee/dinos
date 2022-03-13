import { SpriteSet } from '../interfaces/SpriteSet'
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

export const red_dino_sprite: SpriteSet = new SpriteSet(
    "RedDino",
    red_dino,
    new Map<Actions, Array<number>>([
        [Actions.Idle, [0, 4]], 
        [Actions.Walk, [4, 10]],
        [Actions.Jump, [11, 11]], 
        [Actions.Cry, [14, 17]], 
        [Actions.Run, [18, 24]]
    ]),
    24
)
export const blue_dino_sprite: SpriteSet = new SpriteSet(
    "BlueDino",
    blue_dino,
    new Map<Actions, Array<number>>([
        [Actions.Idle, [0, 4]], 
        [Actions.Walk, [4, 10]], 
        [Actions.Jump, [11, 11]], 
        [Actions.Cry, [14, 17]],
        [Actions.Run, [18, 24]]
    ]),
    24
)
export const green_dino_sprite: SpriteSet = new SpriteSet(
    "GreenDino",
    green_dino,
    new Map<Actions, Array<number>>([
        [Actions.Idle, [0, 4]], 
        [Actions.Walk, [4, 10]], 
        [Actions.Jump, [11, 11]], 
        [Actions.Cry, [14, 17]],
        [Actions.Run, [18, 24]]
    ]),
    24
)
export const yellow_dino_sprite: SpriteSet = new SpriteSet(
    "YellowDino",
    yellow_dino,
    new Map<Actions, Array<number>>([
        [Actions.Idle, [0, 4]], 
        [Actions.Walk, [4, 10]], 
        [Actions.Jump, [11, 11]], 
        [Actions.Cry, [14, 17]],
        [Actions.Run, [18, 24]]
    ]),
    24
)
export const blue_cristall_sprite: SpriteSet = new SpriteSet(
    "BlueCristall",
    blue_cristall,
    new Map<Actions, Array<number>>([
        [Actions.Idle, [0, 6]]
    ]),
    6
)
export const red_cristall_sprite: SpriteSet = new SpriteSet(
    "RedCristall",
    red_cristall,
    new Map<Actions, Array<number>>([
        [Actions.Idle, [0, 6]]
    ]),
    6
)
export const green_cristall_sprite: SpriteSet = new SpriteSet(
    "GreenCristall",
    green_cristall,
    new Map<Actions, Array<number>>([
        [Actions.Idle, [0, 6]]
    ]),
    6
)
export const yellow_cristall_sprite: SpriteSet = new SpriteSet(
    "YellowCristall",
    yellow_cristall,
    new Map<Actions, Array<number>>([
        [Actions.Idle, [0, 6]]
    ]),
    6
)
export const hud_a_sprite: SpriteSet = new SpriteSet(
    "hud_a",
    hud_a,
    new Map<Actions, Array<number>>([
        [Actions.Idle, [0, 1]]
    ]),
    1
)
export const hud_d_sprite: SpriteSet = new SpriteSet(
    "hud_d",
    hud_d,
    new Map<Actions, Array<number>>([
        [Actions.Idle, [0, 1]]
    ]),
    1
)
export const hud_e_sprite: SpriteSet = new SpriteSet(
    "hud_e",
    hud_e,
    new Map<Actions, Array<number>>([
        [Actions.Idle, [0, 1]]
    ]),
    1
)
export const hud_shift_sprite: SpriteSet = new SpriteSet(
    "hud_shift",
    hud_shift,
    new Map<Actions, Array<number>>([
        [Actions.Idle, [0, 1]]
    ]),
    1
)