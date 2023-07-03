import { blue_dino_sprite, green_dino_sprite, red_dino_sprite, yellow_dino_sprite } from '../../sprites'
import Colors from '../../types/Colors'
import Classes from '../../types/Classes'
import ActionName from '../../types/ActionNames'
import { input } from '../../core/logic/keyListener'
import Keys from '../../types/Keys'
import { Cristall } from '../Cristall'
import { Sprite } from '../../core/Objects/Sprite'
import { CristallLevelLoader } from '../CristallLevelLoader.ts'
import { Actor } from '../../core/Objects/Actor'
import { Jumpable } from '../../core/Objects/ObjectJumpable'
import { Runnable } from '../../core/Objects/ObjectRunnable'
import { Moveable } from '../../core/Objects/ObjectMoveable'

export class Dino extends Actor{
    protected classname = Classes.Dino
    private static SPRITE_SETS: Map<Colors, Sprite> = new Map([
        [Colors.Blue, blue_dino_sprite],
        [Colors.Red, red_dino_sprite],
        [Colors.Green, green_dino_sprite],
        [Colors.Yellow, yellow_dino_sprite],
    ])
    private color: Colors
    constructor(color: Colors){
        super(Dino.SPRITE_SETS.get(color)!)
        this.addAbility(new Jumpable(10, 10))
        this.addAbility(new Moveable(10))
        this.addAbility(new Runnable(10))
        this.getStatic().setWidth(50)
        this.getStatic().setHeight(50)
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
                        break
                    case Classes.CristallLevelLoader:
                        (el as CristallLevelLoader).load()
                        break
                }
            })
        }
        if((this.getAbility(ActionName._3_Jump) as Jumpable).is_jump()){
            return
        }
        else if(this.hasActiveAction(ActionName._3_Jump)){
            this.removeAction(ActionName._3_Jump)
        }
        if(input.get(Keys.A) && !input.get(Keys.D)){
            this.getStatic().setFlip(-1)
            if(input.get(Keys.Shift)){
                this.addActiveAction(ActionName._2_Run);
                (this.getAbility(ActionName._2_Run) as Runnable).setDirection(-1)
            }
            else{
                this.addActiveAction(ActionName._1_Walk);
                (this.getAbility(ActionName._1_Walk) as Moveable).setDirection(-1)
            }
            if(input.get(Keys.Space)){
                (this.getAbility(ActionName._3_Jump) as Jumpable).jump()
                this.addActiveAction(ActionName._3_Jump)
            }
        }
        else if(input.get(Keys.D) && !input.get(Keys.A)){
            this.getStatic().setFlip(1)
            if(input.get(Keys.Shift)){
                this.addActiveAction(ActionName._2_Run);
                (this.getAbility(ActionName._2_Run) as Runnable).setDirection(1)
            }
            else{
                this.addActiveAction(ActionName._1_Walk);
                (this.getAbility(ActionName._1_Walk) as Moveable).setDirection(1)
            }
            if(input.get(Keys.Space)){
                (this.getAbility(ActionName._3_Jump) as Jumpable).jump()
                this.addActiveAction(ActionName._3_Jump)
            }
        }
        else if(input.get(Keys.Space)){
            (this.getAbility(ActionName._3_Jump) as Jumpable).jump()
            this.addActiveAction(ActionName._3_Jump);
            (this.getAbility(ActionName._3_Jump) as Jumpable).jump()
        }
        else{
            this.clearActionName()
            this.addActiveAction(ActionName._0_Idle)
        }
    }
}