import React from "react";
import { background_sprite } from "../../sprites";
import GameObject from "../GameObject";

export class Background extends GameObject{
    private static instance: Background
    constructor(){
        if(!Background.instance){
            super("Background", 100, background_sprite, {x:0, y:0}, {x:0, y:0})
            Background.instance = this
        }
        else{
            return Background.instance
        }
    }
    render(){
        let coords = this.getSpriteSet().getIndex() * 100
        let childs   = this.getChilds().map(el => {
            return el.render()
        })
        return <div 
        className="sprite" 
        style={{visibility: this.getVisibility() ? "visible" : "hidden", bottom: 0, left: 0, height: "100%", width: this.getFrameWidth()+"%", overflow: "hidden", transform: "scaleX("+this.getFlip()+")"}}
        key={this.getId()}
        id={this.getId().toString()}
        >
        <img 
            src={this.getSpriteSet().getSrc()} 
            alt={this.constructor.name} 
            style={{objectFit:"cover", objectPosition: "0 100%", margin: "0 0 0 -"+coords+"%", width: this.getSpriteSet().getLength() * 100+"%", height:"100%"}}
        />
        {childs.length > 0 &&
        <div className="childs">
            <React.Fragment>
            {childs}
            </React.Fragment>
        </div>
        }
        </div>
    }
    onBeginOverlap(obj: GameObject): void {
        
    }
    onEndOverlap(obj: GameObject): void {

    }
    onOverlap(obj: GameObject): void {
    }
}