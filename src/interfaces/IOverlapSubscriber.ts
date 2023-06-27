import { GameObject } from "../core/Objects/GameObject"

export interface IOverlapSubscriber {
    onBeginOverlap(o_this: GameObject, o: GameObject): void
    onEndOverlap(o_this: GameObject, o: GameObject): void
    onOverlap(o_this: GameObject, o: GameObject): void
}