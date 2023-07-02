import { GameObject } from "../core/Objects/GameObject"
import Actions from "../types/Actions"

export interface IAction{
    get_action(): Actions
    update(o: GameObject): void
    rollback(o: GameObject): void
}