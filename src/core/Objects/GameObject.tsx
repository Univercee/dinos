import React from "react"
import { Sprite } from "./Sprite"
import Actions from "../../types/Actions"
import Classes from "../../types/Classes"
import { IAction } from "../../interfaces/IAction"
import { IOverlapSubscriber } from "../../interfaces/IOverlapSubscriber"
import { Static } from "./ObjectStatic"
import { Moveable } from "./ObjectMoveable"
import { Jumpable } from "./ObjectJumpable"
import { OverlapListener } from "./OverlapListener"
import { IStatic } from "../../interfaces/IStatic"
import { IMovable } from "../../interfaces/IMoveable"
import { IJumpable } from "../../interfaces/IJumpable"
import { IOverlapListener } from "../../interfaces/IOverlapListener"
import { Runnable } from "./ObjectRunnable"
import { Background } from "../../components/Background"

var id = 0
export class GameObject extends React.Component implements IOverlapSubscriber{
    protected classname = Classes.GameObject
    private id: number
    private parent: GameObject|null = null
    private childs: Array<GameObject> = []
    private abilities: Array<IAction>
    private active_action: Set<Actions> = new Set()
    private last_action: Actions = Actions._0_Idle
    private static: Static
    private walkable: Moveable
    private runnable: Runnable
    private jumpable: Jumpable
    private overlap_listener: OverlapListener = new OverlapListener()
    private style: React.CSSProperties = {}
    constructor(sprite: Sprite, move_speed: number = 0, run_speed: number = 0, jump_duration: number = 0, jump_speed: number = 0){
        super({})
        this.id = id++
        this.static = new Static(sprite, [0, 0])
        this.walkable = new Moveable(move_speed)
        this.runnable = new Runnable(run_speed)
        this.jumpable = new Jumpable(jump_duration, jump_speed)
        this.abilities = [this.walkable, this.runnable, this.jumpable]
    }
    render(){
        let coords = this.static.getSprite().getIndex() * 100
        let childs = this.childs.map((el) => {
            return el.render()
        })
        return <div
        className="sprite" 
        style={{visibility: this.static.getVisibility() ? "visible" : "hidden", bottom: this.static.getPosition()[1]+"px", left: this.static.getPosition()[0]+"px", height: "max-content", width:"100%"}}
        key={this.id}
        id={this.id.toString()}>
        <div 
        style={Object.assign({overflow:"hidden", width: this.static.getFrameWidth()+"px", transform: "scaleX("+this.static.getFlip()+")"}, this.style)}
        >
            <img 
                src={this.static.getSprite().getSrc()} 
                alt={this.constructor.name} 
                style={{objectFit:"cover", margin: "0 0 0 -"+coords+"%", width: this.static.getSprite().getLength() * 100+"%"}}
            />
        </div>
        {childs.length > 0 &&
        <div
        className="childs">
            <React.Fragment>
            {childs}
            </React.Fragment>
        </div>
        }
        </div>
    }
    tick(){
        this.onKeyDown()
        this.update()
        this.static.getSprite().setAction(this.getLastAction())
        this.overlap_listener.listen(this)
        this.childs.forEach(el => {el.tick()})
    }
    update(): void{
        let abilities = this.abilities.filter((el)=>{return this.active_action.has(el.get_action())})
        abilities.push(this.static)
        abilities
        .sort((a, b) => Object.values(Actions).indexOf(a.get_action()) - Object.values(Actions).indexOf(b.get_action()))
        .forEach((el)=>{
            el.update(this)
            this.last_action = el.get_action()
        })     
    }
    
    addOverlapListener(o: GameObject): void{ this.overlap_listener.addListener(o) }
    removeOverlapListener(o: GameObject): void { this.overlap_listener.removeListener(o) }
    onBeginOverlap(o: GameObject): void {}
    onEndOverlap(o: GameObject): void {}
    onOverlap(o: GameObject): void {}
    onKeyDown(): void {}

    getId(){ return this.id }
    getParent(): GameObject|null { return this.parent }
    getChilds(): Array<GameObject> { return this.childs }
    getClassname(): Classes { return this.classname }
    getStatic(): IStatic { return this.static }
    getWalkable(): IMovable { return this.walkable }
    getRunnable(): IMovable { return this.runnable }
    getJumpable(): IJumpable { return this.jumpable }
    getOverlapListener(): IOverlapListener { return this.overlap_listener}
    getActions(): Set<Actions>{ return this.active_action }
    getLastAction(): Actions { return this.last_action }
    abilityByAction(action: Actions): IAction {
        return this.abilities.filter((el)=>{return el.get_action() === action})[0]
    }

    hasAction(action: Actions): boolean { return this.active_action.has(action) }
    addAction(action: Actions){ 
        if(action === Actions._1_Walk) this.active_action.delete(Actions._2_Run)
        if(action === Actions._2_Run) this.active_action.delete(Actions._1_Walk)
        this.active_action.add(action)
     }
    removeAction(action: Actions){ this.active_action.delete(action) }
    clearActions(){ this.active_action.clear() }

    addChild(o: GameObject): void { if(!this.childs.includes(o)){ this.childs.push(o); o.parent = this}}
    removeChild(o: GameObject): void { this.childs = this.childs.filter((el)=>{return el !== o})}
    removeAllChilds(){
        this.childs.forEach((el)=>{ el.parent = null })
        this.childs = []
    }

    select(){
        this.style.background = "red"
        this.style.cursor = "pointer"
    }
    unselect(){
        this.style.background = ""
        this.style.cursor = ""
    }
}