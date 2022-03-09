import Actions from "./Actions";

interface SpriteSetData
{
    name: string;
    src: string;
    sprite_breakpoints: Map<Actions, Array<number>>;
    length: number;
}

export default SpriteSetData

