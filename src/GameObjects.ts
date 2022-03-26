import GameObject from "./components/GameObject"
const GameObjects: Map<number, GameObject> = new Map()
export default GameObjects
export function addObject(obj: GameObject){
    GameObjects.set(obj.getId(), obj)
}
export function removeObject(obj: GameObject){
    GameObjects.delete(obj.getId())
}