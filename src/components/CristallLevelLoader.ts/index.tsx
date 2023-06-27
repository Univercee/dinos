import { GameObject } from '../../core/Objects/GameObject'
import { Hud } from '../HUD'
import { blue_cristall_sprite } from '../../sprites'
import Keys from '../../types/Keys'
import Classes from '../../types/Classes'
import { LevelLoared } from '../../core/logic/levelLoader'

export class CristallLevelLoader extends GameObject{
    readonly classname: Classes = Classes.CristallLevelLoader
    private level_loader: LevelLoared
    private hud: GameObject
    constructor(level: Function){
        super(blue_cristall_sprite)
        this.hud = new Hud(Keys.E)
        this.getStatic().setFrameWidth(3)
        this.hud.getStatic().setFrameWidth(2.5)
        this.hud.getStatic().setPosition([this.getStatic().getFrameWidth()/2-this.hud.getStatic().getFrameWidth()/2, 100])
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