import SpriteSet from "../components/SpriteSet"
import Actions from "./Actions"
import KeyHundler from "./KeyHundler"

interface ObjectState{
    name: string;
    frame_width: number;
    action: Actions
    sprite_set: SpriteSet
    direction: {x: number, y: number}
    position: {x: number, y: number}
    speed: {x: number, y: number}
    moment_speed: {x: number, y: number} 
    run_speed: {x: number, y: number};
    flip: 1|-1
    onKeyDown: KeyHundler
}

export default ObjectState