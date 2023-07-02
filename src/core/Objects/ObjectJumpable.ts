import { IAction } from "../../interfaces/IAction"
import { IJumpable } from "../../interfaces/IJumpable"
import Actions from "../../types/Actions"
import { GameObject } from "./GameObject"

export class Jumpable implements IJumpable, IAction {
    private readonly ACTION: Actions = Actions._3_Jump
    private duration: number
    private speed: number
    private time: number = 0
    constructor(duration: number, speed: number){
        this.duration = duration
        this.speed = speed
    }
    getDuration(): number { return this.duration }
    getTime(): number { return this.time }

    setDuration(d: number): void { this.duration = d }

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
            o.getStatic().setPosition([position[0], position[1]+shift])
            this.time--
        }
    }
    get_action(): Actions {
        return this.ACTION
    }
    rollback(o: GameObject): void {}
}