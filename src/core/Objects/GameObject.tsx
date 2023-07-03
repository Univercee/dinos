import React from "react"
import Classes from "../../types/Classes"
import { IOverlapSubscriber } from "../../interfaces/IOverlapSubscriber"
import { Static } from "./ObjectStatic"
import { OverlapListener } from "./OverlapListener"
import { IStatic } from "../../interfaces/IStatic"
import { IOverlapListener } from "../../interfaces/IOverlapListener"
import { IAction } from "../../interfaces/IAction"
import { ISprite } from "../../interfaces/ISprite"
import { Vector2d } from "../tools/Vector2d"
import { NoSprite } from "./NoSprite"

var id = 0
export class GameObject extends React.Component implements IOverlapSubscriber{
    protected classname = Classes.GameObject
    protected id: number
    protected parent: GameObject|null = null
    protected childs: Array<GameObject> = []
    protected static: IStatic & IAction
    protected overlap_listener: OverlapListener = new OverlapListener()
    protected style: React.CSSProperties = {}
    constructor(sprite: ISprite = new NoSprite(), position: Vector2d = new Vector2d()){
        super({})
        this.id = id++
        this.static = new Static(sprite, position)
    }
    render(){
        let coords = this.getStatic().getSprite().getIndex() * 100
        let childs = this.childs.map((el) => {
            return el.render()
        })
        return <div
        className="sprite" 
        style={{visibility: this.static.getVisibility() ? "visible" : "hidden", bottom: this.static.getPosition().y+"px", left: this.static.getPosition().x+"px", height: "max-content", width:"100%"}}
        key={this.id}
        id={this.id.toString()}>
        <div 
        style={Object.assign({overflow:"hidden", height: this.static.getHeight(), width: this.static.getWidth()+"px", transform: "scaleX("+this.static.getFlip()+")"}, this.style)}
        >
            <img 
                src={this.static.getSprite().getSrc()} 
                alt={this.constructor.name} 
                style={{height: "100%", margin: "0 0 0 -"+coords+"%", width: this.static.getSprite().getLength() * 100+"%"}}
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
        this.update()
        this.overlap_listener.listen(this)
        this.childs.forEach(el => {el.tick()})
    }
    update(){
        this.static.update(this)
    }
    
    addOverlapListener(o: GameObject): void{ this.overlap_listener.addListener(o) }
    removeOverlapListener(o: GameObject): void { this.overlap_listener.removeListener(o) }
    onBeginOverlap(o: GameObject): void {}
    onEndOverlap(o: GameObject): void {}
    onOverlap(o: GameObject): void {}

    getId(){ return this.id }
    getParent(): GameObject|null { return this.parent }
    getChilds(): Array<GameObject> { return this.childs }
    getClassname(): Classes { return this.classname }
    getStatic(): IStatic&IAction { return this.static }
    getOverlapListener(): IOverlapListener { return this.overlap_listener}

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