import { Sprite } from '../interfaces/Sprite'
import Actions from '../types/Actions'

import background from './background.png'

import hud_a from './hud_a.png'
import hud_d from './hud_d.png'
import hud_e from './hud_e.png'
import hud_shift from './hud_shift.png'
import hud_space from './hud_space.png'

import blue_dino from './BlueDino.png'
import red_dino from './RedDino.png'
import green_dino from './GreenDino.png'
import yellow_dino from './YellowDino.png'

import blue_cristall from './BlueCristall.png'
import red_cristall from './RedCristall.png'
import green_cristall from './GreenCristall.png'
import yellow_cristall from './YellowCristall.png'

export const red_dino_sprite: Sprite = new Sprite(
    red_dino,
    new Map<Actions, Array<number>>([
        [Actions._0_Idle, [0, 4]], 
        [Actions._1_Walk, [4, 10]],
        [Actions._3_Jump, [11, 11]], 
        [Actions._2_Run, [18, 24]]
    ]),
    24
)
export const blue_dino_sprite: Sprite = new Sprite(
    blue_dino,
    new Map<Actions, Array<number>>([
        [Actions._0_Idle, [0, 4]], 
        [Actions._1_Walk, [4, 10]], 
        [Actions._3_Jump, [11, 11]], 
        [Actions._2_Run, [18, 24]]
    ]),
    24
)
export const green_dino_sprite: Sprite = new Sprite(
    green_dino,
    new Map<Actions, Array<number>>([
        [Actions._0_Idle, [0, 4]], 
        [Actions._1_Walk, [4, 10]], 
        [Actions._3_Jump, [11, 11]], 
        [Actions._2_Run, [18, 24]]
    ]),
    24
)
export const yellow_dino_sprite: Sprite = new Sprite(
    yellow_dino,
    new Map<Actions, Array<number>>([
        [Actions._0_Idle, [0, 4]], 
        [Actions._1_Walk, [4, 10]], 
        [Actions._3_Jump, [11, 11]], 
        [Actions._2_Run, [18, 24]]
    ]),
    24
)
export const blue_cristall_sprite: Sprite = new Sprite(
    blue_cristall,
    new Map<Actions, Array<number>>([
        [Actions._0_Idle, [0, 6]]
    ]),
    6
)
export const red_cristall_sprite: Sprite = new Sprite(
    red_cristall,
    new Map<Actions, Array<number>>([
        [Actions._0_Idle, [0, 6]]
    ]),
    6
)
export const green_cristall_sprite: Sprite = new Sprite(
    green_cristall,
    new Map<Actions, Array<number>>([
        [Actions._0_Idle, [0, 6]]
    ]),
    6
)
export const yellow_cristall_sprite: Sprite = new Sprite(
    yellow_cristall,
    new Map<Actions, Array<number>>([
        [Actions._0_Idle, [0, 6]]
    ]),
    6
)
export const hud_a_sprite: Sprite = new Sprite(
    hud_a,
    new Map<Actions, Array<number>>([
        [Actions._0_Idle, [0, 1]]
    ]),
    1
)
export const hud_d_sprite: Sprite = new Sprite(
    hud_d,
    new Map<Actions, Array<number>>([
        [Actions._0_Idle, [0, 1]]
    ]),
    1
)
export const hud_e_sprite: Sprite = new Sprite(
    hud_e,
    new Map<Actions, Array<number>>([
        [Actions._0_Idle, [0, 1]]
    ]),
    1
)
export const hud_shift_sprite: Sprite = new Sprite(
    hud_shift,
    new Map<Actions, Array<number>>([
        [Actions._0_Idle, [0, 1]]
    ]),
    1
)
export const hud_space_sprite: Sprite = new Sprite(
    hud_space,
    new Map<Actions, Array<number>>([
        [Actions._0_Idle, [0, 1]]
    ]),
    1
)
export const background_sprite: Sprite = new Sprite(
    background,
    new Map<Actions, Array<number>>([
        [Actions._0_Idle, [0, 1]]
    ]),
    1
)