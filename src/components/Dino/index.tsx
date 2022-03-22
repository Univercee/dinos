import GameObject from '../GameObject'
import { SpriteSet } from '../../interfaces/SpriteSet'
import Actions from '../../types/Actions'
import { blue_dino_sprite, green_dino_sprite, red_dino_sprite, yellow_dino_sprite } from '../../sprites'
import Colors from '../../types/Colors'
import { Cristall } from '../Cristall'
import Keys from '../../types/Keys'
import Classes from '../../types/Classes'
import { input } from '../../keyListener';

export class Dino extends GameObject{
    readonly classname: Classes = Classes.Dino
    protected jump_duration: number
    protected jump_start_time: number = -1
    private static SPRITE_SETS: Map<Colors, SpriteSet> = new Map([
        [Colors.Blue, blue_dino_sprite],
        [Colors.Red, red_dino_sprite],
        [Colors.Green, green_dino_sprite],
        [Colors.Yellow, yellow_dino_sprite],
    ])
    private color: Colors
    constructor(color: Colors){
        super("Dino", 6, Dino.SPRITE_SETS.get(color)!, {x:0.6, y:0.6}, {x:1.2, y:0})
        this.jump_duration = 10
        this.color = color
    }
    getColor(){
        return this.color
    }
    onKeyDown(){
        if(input.get(Keys.E)){
            this.overlap.forEach(el => {
                switch(el.getClassname()){
                    case Classes.Cristall:
                        if(input.get(Keys.E)){
                            this.setSpriteSet(Dino.SPRITE_SETS.get((el as Cristall).getColor())!)
                        }
                }
            })
        }
        if(this.getAction() === Actions.Jump){
            if(this.is_jump()){
                return
            }
        }
        if(input.get(Keys.A) && !input.get(Keys.D)){
            this.setFlip(-1)
            this.setDirection({x:-1, y:0})
            this.setAction(Actions.Walk)
            if(input.get(Keys.Shift)){
                this.setAction(Actions.Run)
            }
            if(input.get(Keys.Space)){
                this.setDirection({x:-1, y:-1})
                this.setAction(Actions.Jump)
                this.setJumpStartTime(this.time)
            }
        }
        else if(input.get(Keys.D) && !input.get(Keys.A)){
            this.setFlip(1)
            this.setDirection({x:1, y:0})
            this.setAction(Actions.Walk)
            if(input.get(Keys.Shift)){
                this.setAction(Actions.Run)
            }
            if(input.get(Keys.Space)){
                this.setDirection({x:1, y:-1})
                this.setAction(Actions.Jump)
                this.setJumpStartTime(this.time)
            }
        }
        else if(input.get(Keys.Space)){
            this.setDirection({x:0, y:-1})
            this.setAction(Actions.Jump)
            this.setJumpStartTime(this.time)
        }
        else{
            this.setDirection({x:0, y:0})
            this.setAction(Actions.Idle)
        }
        this.getSpriteSet().setAction(this.getAction())
    }
    onOverlap(obj: GameObject): void {
        
    }
    onBeginOverlap(obj: GameObject): void {
          
    }
    onEndOverlap(obj: GameObject): void {
        
    }
}