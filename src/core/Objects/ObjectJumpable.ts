import { IAction } from "../../interfaces/IAction"
import { IJumpable } from "../../interfaces/IJumpable"
import ActionName from "../../types/ActionNames"
import { Vector2d } from "../tools/Vector2d"
import { GameObject } from "./GameObject"

export class Jumpable implements IJumpable, IAction {
    private readonly ACTION: ActionName = ActionName._3_Jump
    private duration: number
    private speed: number
    private time: number = 0
    constructor(duration: number, speed: number){
        this.duration = duration
        this.speed = speed
    }
    getDuration(): number { return this.duration }
    getSpeed(): number {
        return this.speed
    }
    getTime(): number { return this.time }

    setDuration(d: number): void { this.duration = d }
    setSpeed(s: number): void { this.speed = s }

    jump(): void {
        this.time = this.duration-1
    }
    is_jump(): number{
        return this.time
    }
    update(o: GameObject): void {
        if(this.is_jump()){
            let position = o.getStatic().getPosition()
            let shift = this.speed * (this.is_jump()-this.duration/2)
            position.add(new Vector2d(0, shift))
            o.getStatic().setPosition(position)
            this.time--
        }
    }
    name(): ActionName {
        return this.ACTION
    }
    rollback(o: GameObject): void {}
}