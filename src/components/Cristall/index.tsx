import GameObject from '../GameObject'
import { SpriteSet } from '../../interfaces/SpriteSet'
import { Hud } from '../HUD'
import { blue_cristall_sprite, green_cristall_sprite, red_cristall_sprite, yellow_cristall_sprite } from '../../sprites'
import Colors from '../../types/Colors'
import Keys from '../../types/Keys'
import Classes from '../../types/Classes'
import { input } from '../../keyListener'

export class Cristall extends GameObject{
    readonly classname: Classes = Classes.Cristall
    private static SPRITE_SETS: Map<Colors, SpriteSet> = new Map([
        [Colors.Blue, blue_cristall_sprite],
        [Colors.Red, red_cristall_sprite],
        [Colors.Green, green_cristall_sprite],
        [Colors.Yellow, yellow_cristall_sprite],
    ])
    private color: Colors
    private hud: GameObject
    constructor(color: Colors){
        super("Cristall", 4, Cristall.SPRITE_SETS.get(color)!, {x:0, y:0}, {x:0, y:0})
        this.color = color
        this.hud = new Hud(Keys.E)
        this.hud.setPosition(this.getFrameWidth()/2-this.hud.getFrameWidth()/2, 100)
        this.hud.setVisibility(false)
        this.addChild(this.hud)
    }
    getColor(){
        return this.color
    }
    onTouch(){
        input.set(Keys.D, true)
    }
    onOverlap(obj: GameObject): void {
        
    }
    onBeginOverlap(obj: GameObject): void {   
        switch(obj.getClassname()){
            case Classes.Dino:
                this.hud.setVisibility(true)
        }
    }
    onEndOverlap(obj: GameObject): void {
        switch(obj.getClassname()){
            case Classes.Dino:
                this.hud.setVisibility(false)
        }
    }
}