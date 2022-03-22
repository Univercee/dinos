import { background_sprite } from "../../sprites";
import GameObject from "../GameObject";

export class Background extends GameObject{
    private static instance: Background
    constructor(){
        if(!Background.instance){
            super("Background", 100, background_sprite, {x:0, y:0}, {x:0, y:0})
            this.setPosition(0, -1)
            Background.instance = this
        }
        else{
            return Background.instance
        }
    }
    onBeginOverlap(obj: GameObject): void {
        
    }
    onEndOverlap(obj: GameObject): void {

    }
    onOverlap(obj: GameObject): void {
    }
}