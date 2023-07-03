import { GameObject } from '../../core/Objects/GameObject'
import { Hud } from '../HUD'
import { blue_cristall_sprite } from '../../sprites'
import Keys from '../../types/Keys'
import Classes from '../../types/Classes'
import { LevelLoared } from '../../core/logic/levelLoader'
import { Vector2d } from '../../core/tools/Vector2d'

export class CristallLevelLoader extends GameObject{
    readonly classname: Classes = Classes.CristallLevelLoader
    private level_loader: LevelLoared
    private hud: GameObject
    constructor(level: Function){
        super(blue_cristall_sprite)
        this.hud = new Hud(Keys.E)
        this.getStatic().setWidth(50)
        this.getStatic().setHeight(50)
        this.hud.getStatic().setWidth(30)
        this.hud.getStatic().setHeight(30)
        this.hud.getStatic().setPosition(new Vector2d(this.getStatic().getWidth()/2-this.hud.getStatic().getWidth()/2, 100))
        this.hud.getStatic().setVisibility(false)
        this.addChild(this.hud)
        this.level_loader = new LevelLoared(level)
    }
    load(){
        this.level_loader.load()
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