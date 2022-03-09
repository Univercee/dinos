import Actions from "../../types/Actions";
import SpriteSetData from "../../types/SpriteSetData";

class SpriteSet
{
    private data: SpriteSetData
    private action: Actions
    private current_index: number
    constructor(data: SpriteSetData){
        this.data = data
        this.action = Actions.Idle
        this.current_index = 0
    }
    tick(){
        let indexes = this.data.sprite_breakpoints.get(this.action)||[0, 0]
        this.current_index = this.current_index >= indexes[1]-1 ? indexes[0] : ++this.current_index; 
    }
    getIndex(){
        return this.current_index
    }

    getSrc(){
        return this.data.src
    }

    getLength(){
        return this.data.length
    }
    setAction(action: Actions){
        if(this.action !== action){
            this.action = action
            let indexes = this.data.sprite_breakpoints.get(this.action)||[0, 0]
            this.current_index = indexes[0]
        }
    }
}

export default SpriteSet