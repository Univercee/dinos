import { GameObject } from '../GameObject'
import { Sprite } from '../../interfaces/Sprite'
import { blue_dino_sprite, green_dino_sprite, red_dino_sprite, yellow_dino_sprite } from '../../sprites'
import Colors from '../../types/Colors'
import Classes from '../../types/Classes'
import Actions from '../../types/Actions'
import { input } from '../../keyListener'
import Keys from '../../types/Keys'
import { Cristall } from '../Cristall'

export class Dino extends GameObject{
    protected classname = Classes.Dino
    private static SPRITE_SETS: Map<Colors, Sprite> = new Map([
        [Colors.Blue, blue_dino_sprite],
        [Colors.Red, red_dino_sprite],
        [Colors.Green, green_dino_sprite],
        [Colors.Yellow, yellow_dino_sprite],
    ])
    private color: Colors
    constructor(color: Colors){
        super(Dino.SPRITE_SETS.get(color)!, 1, 2, 9, 0.5)
        this.getStatic().setFrameWidth(8)
        this.color = color
    }
    getColor(){
        return this.color
    }
    onKeyDown(){
        if(input.get(Keys.E)){
            this.getOverlapListener().getTargets().forEach(el => {
                switch(el.getClassname()){
                    case Classes.Cristall:
                        this.getStatic().setSprite(Dino.SPRITE_SETS.get((el as Cristall).getColor())!)
                }
            })
        }
        if(this.getJumpable().is_jump()){
            return
        }
        else if(this.hasAction(Actions._3_Jump)){
            this.removeAction(Actions._3_Jump)
        }
        if(input.get(Keys.A) && !input.get(Keys.D)){
            this.getStatic().setFlip(-1)
            if(input.get(Keys.Shift)){
                this.addAction(Actions._2_Run)
                this.getRunnable().setDirection(-1)
            }
            else{
                this.addAction(Actions._1_Walk)
                this.getWalkable().setDirection(-1)
            }
            if(input.get(Keys.Space)){
                this.getJumpable().jump()
                this.addAction(Actions._3_Jump)
            }
        }
        else if(input.get(Keys.D) && !input.get(Keys.A)){
            this.getStatic().setFlip(1)
            if(input.get(Keys.Shift)){
                this.addAction(Actions._2_Run)
                this.getRunnable().setDirection(1)
            }
            else{
                this.addAction(Actions._1_Walk)
                this.getWalkable().setDirection(1)
            }
            if(input.get(Keys.Space)){
                this.getJumpable().jump()
                this.addAction(Actions._3_Jump)
            }
        }
        else if(input.get(Keys.Space)){
            this.getJumpable().jump()
            this.addAction(Actions._3_Jump)
            this.getJumpable().jump()
        }
        else{
            this.clearActions()
            this.addAction(Actions._0_Idle)
        }
        this.getStatic().getSprite().setAction(Array.from(this.getActions()).sort().reverse()[0])
    }
}