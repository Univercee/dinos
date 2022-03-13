import Actions from "../types/Actions";

export interface ISpriteSet
{
    getName(): string
    getSrc(): string
    getBreakpoints(): Map<Actions, Array<number>>
    getLength(): number
    getAction(): Actions
    setName(name: string): void
    setSrc(src: string): void
    setBreakpoints(sprite_breakpoints: Map<Actions, Array<number>>): void
    setLength(length: number): void
    setAction(action: Actions): void
    
}

export class SpriteSet implements ISpriteSet{
    name: string
    src: string
    sprite_breakpoints: Map<Actions, Array<number>>
    length: number
    private action: Actions = Actions.Idle
    private current_index: number = 0
    constructor(name: string, src: string, sprite_breakpoints: Map<Actions, Array<number>>, length: number){
        this.name = name
        this.src = src
        this.sprite_breakpoints = sprite_breakpoints
        this.length = length
    }
    tick(){
        let indexes = this.sprite_breakpoints.get(this.action)||[0, 0]
        this.current_index = this.current_index >= indexes[1]-1 ? indexes[0] : ++this.current_index; 
    }

    getName(){return this.name}
    getSrc(){return this.src}
    getBreakpoints(){return this.sprite_breakpoints}
    getLength(){return this.length}
    getIndex(){return this.current_index}
    getAction(){return this.action}

    setName(name: string){this.name = name}
    setSrc(src: string){this.src = src}
    setBreakpoints(sprite_breakpoints: Map<Actions, Array<number>>){this.sprite_breakpoints = sprite_breakpoints}
    setLength(length: number){this.length = length}
    setAction(action: Actions){
        if(this.action !== action){
            this.action = action
            let indexes = this.sprite_breakpoints.get(this.action)||[0, 0]
            this.current_index = indexes[0]
        }
    }
}

