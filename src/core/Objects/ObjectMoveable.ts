import { IAction } from "../../interfaces/IAction"
import { IMoveable } from "../../interfaces/IMoveable"
import ActionName from "../../types/ActionNames"
import { Vector2d } from "../tools/Vector2d"
import { GameObject } from "./GameObject"

export class Moveable implements IMoveable, IAction {
    private readonly ACTION: ActionName = ActionName._1_Walk
    private speed: number 
    private direction: number = 1
    private prev_position: Vector2d = new Vector2d()
    constructor(speed: number){
        this.speed = speed
    }
    getSpeed(): number { return this.speed }
    getDirection(): number { return this.direction }
    getPrevPosition(): Vector2d { return this.prev_position }

    setSpeed(s: number): void { this.speed = s }
    setDirection(d: number): void { this.direction = d }

    update(o: GameObject): void {
        let position = o.getStatic().getPosition()
        this.prev_position = position
        position.add(new Vector2d(this.speed*this.direction, 0))
        o.getStatic().setPosition(position)
    }
    name(): ActionName {
        return this.ACTION
    }
    rollback(o: GameObject): void {
        o.getStatic().setPosition(this.prev_position)
    }
}