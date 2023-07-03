import ActionName from "../../types/ActionNames";
import { Sprite } from "./Sprite";

export class NoSprite extends Sprite {
    constructor(){
        super('',new Map<ActionName, [number, number]>([[ActionName._0_Idle, [0, 0]]]),0)
    }
}