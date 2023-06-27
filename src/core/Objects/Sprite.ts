import { ISprite } from "../interfaces/ISprite"
import Actions from "../types/Actions"
var id = 0;
export class Sprite implements ISprite{
    private id: number
    private src: string
    private breakpoints: Map<Actions, [number, number]>
    private length: number
    private action: Actions = Actions._0_Idle
    private actions: Array<Actions>
    private index: number = 0
    constructor(src: string, breakpoints: Map<Actions, [number, number]>, length: number){
        if(!breakpoints.has(Actions._0_Idle)){
            throw new Error("Sprite must have _0_Idle action")
        }
        this.id = id++
        this.src = src
        this.breakpoints = breakpoints
        this.length = length
        this.actions = Array.from(breakpoints.keys())
        this.setAction(Actions._0_Idle)
    }
    tick(){
        let indexes = this.breakpoints.get(this.action)||[0, 0]
        this.index = this.index >= indexes[1]-1 ? indexes[0] : ++this.index; 
    }

    getId(){return this.id}
    getSrc(){return this.src}
    getBreakpoints(){return this.breakpoints}
    getLength(){return this.length}
    getIndex(){return this.index}
    getAction(){return this.action}

    setAction(action: Actions){
        if(!this.actions.includes(action)){
            this.action = Actions._0_Idle
            throw new Error("SPRITE#"+this.id+": no such action")
        }
        if(this.action !== action){
            this.action = action
            let indexes = this.breakpoints.get(this.action)||[0, 0]
            this.index = indexes[0]
        }
    }
}