import { GameObject } from "../core/Objects/GameObject"
import ActionName from "../types/ActionNames"

export interface IAction{
    name(): ActionName
    update(o: GameObject): void
    rollback(o: GameObject): void
}