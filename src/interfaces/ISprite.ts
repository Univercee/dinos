import Actions from "../types/Actions";
export interface ISprite
{
    tick(): void

    getId(): number
    getSrc(): string
    getAction(): Actions
    getLength(): number
    getBreakpoints(): Map<Actions, [number, number]>
    getIndex(): number

    setAction(action: Actions): void   
}



