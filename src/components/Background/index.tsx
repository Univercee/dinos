import React from "react";
import { background_sprite } from "../../sprites";
import { GameObject } from "../../core/Objects/GameObject"
import Classes from "../../types/Classes";
import { relative } from "path";

export class Background extends GameObject{
    private static instance: Background
    constructor(){
        if(!Background.instance){
            super(background_sprite)
            this.classname = Classes.Background
            this.getStatic().setFrameWidth(window.innerWidth)
            Background.instance = this
        }
        else{
            return Background.instance
        }
    }
    render(){
        let coords = this.getStatic().getSprite().getIndex() * 100
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
        let width = o.getStatic().getFrameWidth()
        let shift = position[0]>0 ? -width : window.innerWidth
        o.getStatic().setPosition([shift, position[1]])
    }
}