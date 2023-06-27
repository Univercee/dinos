import React from "react";
import { background_sprite } from "../../sprites";
import { GameObject } from "../../core/Objects/GameObject"

export class Background extends GameObject{
    private static instance: Background
    constructor(){
        if(!Background.instance){
            super(background_sprite)
            this.getStatic().setFrameWidth(100)
            Background.instance = this
        }
        else{
            return Background.instance
        }
    }
    render(){
        let coords = this.getStatic().getSprite().getIndex() * 100
        let childs   = this.getChilds().map(el => {
            return el.render()
        })
        return <div 
        className="sprite" 
        style={{visibility: this.getStatic().getVisibility() ? "visible" : "hidden", bottom: 0, left: 0, height: "100%", width: this.getStatic().getFrameWidth()+"%", overflow: "hidden", transform: "scaleX("+this.getStatic().getFlip()+")"}}
        key={this.getId()}
        id={this.getId().toString()}
        >
        <img 
            src={this.getStatic().getSprite().getSrc()} 
            alt={this.constructor.name} 
            style={{objectFit:"cover", objectPosition: "0 100%", margin: "0 0 0 -"+coords+"%", width: this.getStatic().getSprite().getLength() * 100+"%", height:"100%"}}
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
    onEndOverlap(o: GameObject){
        let position = o.getStatic().getPosition()
        let width = o.getStatic().getFrameWidth()
        let shift = position[0]>0 ? -width : 100
        o.getStatic().setPosition([shift, position[1]])
    }
}