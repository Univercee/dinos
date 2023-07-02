import Actions from "../../types/Actions";
import { Sprite } from "./Sprite";

export class NoSprite extends Sprite {
    constructor(){
        super('',new Map<Actions, [number, number]>([[Actions._0_Idle, [0, 0]]]),0)
    }
}