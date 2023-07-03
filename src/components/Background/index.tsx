import React from "react";
import { background_sprite } from "../../sprites";
import { GameObject } from "../../core/Objects/GameObject"
import Classes from "../../types/Classes";
import { Vector2d } from "../../core/tools/Vector2d";

export class Background extends GameObject{
    private static instance: Background
    constructor(){
        if(!Background.instance){
            super(background_sprite)
            this.classname = Classes.Background
            this.getStatic().setWidth(window.innerWidth)
            this.getStatic().setHeight(window.innerHeight)
            Background.instance = this
        }
        else{
            return Background.instance
        }
    }
    render(){
        let childs = this.getChilds().map(el => {
            return el.render()
        })
        return <div 
        className="sprite" 
        style={{visibility: this.getStatic().getVisibility() ? "visible" : "hidden", pointerEvents: "none", bottom: 0, left: 0, height: window.innerHeight, width: window.innerWidth, overflow: "hidden", transform: "scaleX("+this.getStatic().getFlip()+")"}}
        key={this.getId()}
        id={this.getId().toString()}
        >
        <img 
            src={this.getStatic().getSprite().getSrc()} 
            alt={this.constructor.name} 
            style={{width: this.getStatic().getSprite().getLength() * 100+"%", height:"100%"}}
        />
        {childs.length > 0 &&
        <div className="childs" style={{position: "relative"}}>
            <React.Fragment>
            {childs}
            </React.Fragment>
        </div>
        }
        </div>
    }
    onEndOverlap(o: GameObject){
        let position = o.getStatic().getPosition()
        let width = o.getStatic().getWidth()
        let shift = position.x>0 ? -width : window.innerWidth
        o.getStatic().setPosition(new Vector2d(shift, position.y))
    }
}