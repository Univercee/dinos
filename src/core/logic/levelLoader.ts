import { Background } from "../../components/Background";
import { ILevelLoader } from "../../interfaces/ILevelLoader";

export class LevelLoared implements ILevelLoader{
    private level: Function
    constructor(level: Function){
        this.level = level
    }
    load(): void {
        new Background().removeAllChilds()
        this.level()
    }
}