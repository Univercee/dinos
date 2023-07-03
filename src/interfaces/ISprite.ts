import ActionName from "../types/ActionNames";
export interface ISprite
{
    tick(): void

    getId(): number
    getSrc(): string
    getAction(): ActionName
    getLength(): number
    getBreakpoints(): Map<ActionName, [number, number]>
    getIndex(): number

    setAction(action: ActionName): void   
}



