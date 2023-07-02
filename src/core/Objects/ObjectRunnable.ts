import { IAction } from "../../interfaces/IAction"
import { IMovable } from "../../interfaces/IMoveable"
import Actions from "../../types/Actions"
import { GameObject } from "./GameObject"

export class Runnable implements IMovable, IAction {
    private readonly ACTION: Actions = Actions._2_Run
    private speed: number 
    private direction: number = 0
    private prev_position: [number, number] = [0, 0]
    constructor(speed: number){
        this.speed = speed
    }
    getSpeed(): number { return this.speed }
    getDirection(): number { return this.direction }
    getPrevPosition(): [number, number] { return this.prev_position }

    setSpeed(s: number): void { this.speed = s }
    setDirection(d: number): void { this.direction = d }

    update(o: GameObject): void {
        let position = o.getStatic().getPosition()
        this.prev_position = position
        o.getStatic().setPosition([position[0]+this.speed*this.direction, position[1]])
    }
    get_action(): Actions {
        return this.ACTION
    }
    rollback(o: GameObject): void {
        o.getStatic().setPosition(this.prev_position)
    }
}