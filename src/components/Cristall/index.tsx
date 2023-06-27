import { GameObject } from '../../core/Objects/GameObject'
import { Hud } from '../HUD'
import { blue_cristall_sprite, green_cristall_sprite, red_cristall_sprite, yellow_cristall_sprite } from '../../sprites'
import Colors from '../../types/Colors'
import Keys from '../../types/Keys'
import Classes from '../../types/Classes'
import { Sprite } from '../../core/Objects/Sprite'

export class Cristall extends GameObject{
    readonly classname: Classes = Classes.Cristall
    private static SPRITE_SETS: Map<Colors, Sprite> = new Map([
        [Colors.Blue, blue_cristall_sprite],
        [Colors.Red, red_cristall_sprite],
        [Colors.Green, green_cristall_sprite],
        [Colors.Yellow, yellow_cristall_sprite],
    ])
    private color: Colors
    private hud: GameObject
    constructor(color: Colors){
        super(Cristall.SPRITE_SETS.get(color)!)
        this.color = color
        this.hud = new Hud(Keys.E)
        this.getStatic().setFrameWidth(5)
        this.hud.getStatic().setFrameWidth(4)
        this.hud.getStatic().setPosition([this.getStatic().getFrameWidth()/2-this.hud.getStatic().getFrameWidth()/2, 100])
        this.hud.getStatic().setVisibility(false)
        this.addChild(this.hud)
    }
    getColor(){
        return this.color
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