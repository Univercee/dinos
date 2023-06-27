import { GameObject } from '../../core/Objects/GameObject'
import { Hud } from '../HUD'
import { blue_cristall_sprite, green_cristall_sprite, red_cristall_sprite, yellow_cristall_sprite } from '../../sprites'
import Colors from '../../types/Colors'
import Keys from '../../types/Keys'
import Classes from '../../types/Classes'
import { Sprite } from '../../core/Objects/Sprite'
import { Background } from '../Background'

export class LevelSwitcher extends GameObject{
    readonly classname: Classes = Classes.LevelSwitcher
    private level: Function
    private hud: GameObject
    constructor(level: Function){
        super(blue_cristall_sprite)
        this.hud = new Hud(Keys.E)
        this.getStatic().setFrameWidth(3)
        this.hud.getStatic().setFrameWidth(2.5)
        this.hud.getStatic().setPosition([this.getStatic().getFrameWidth()/2-this.hud.getStatic().getFrameWidth()/2, 100])
        this.hud.getStatic().setVisibility(false)
        this.addChild(this.hud)
        this.level = level
    }
    load(){
        new Background().removeAllChilds()
        this.level()
    }
    onBeginOverlap(o: GameObject): void {
        switch(o.getClassname()){
            case Classes.Dino:
                this.hud.getStatic().setVisibility(true)
        }
    }
    onEndOverlap(o: GameObject): void {
        switch(o.getClassname()){
            case Classes.Dino:
                this.hud.getStatic().setVisibility(false)
        }
    }
}