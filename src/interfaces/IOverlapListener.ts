import { GameObject } from "../core/Objects/GameObject"

export interface IOverlapListener {
    addListener(o: GameObject): void
    removeListener(o: GameObject): void
    isOverlap(o_this: GameObject, o: GameObject): boolean
    listen(target: GameObject): void
    getTargets(): Array<GameObject>
    getPrevTargets(): Array<GameObject>
}