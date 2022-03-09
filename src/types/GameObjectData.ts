import SpriteSet from "../components/SpriteSet";
import KeyHundler from "./KeyHundler";

interface GameObjectData
{
    name: string;
    frame_width: number;
    speed: {x: number, y: number};
    run_speed: {x: number, y: number};
    sprite_set: SpriteSet;
    onKeyDown: KeyHundler
}
export default GameObjectData

