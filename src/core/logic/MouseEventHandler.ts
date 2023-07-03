import { IMouseSubscriber } from "../../interfaces/IMouseSubscriber";
import { GameObject } from "../Objects/GameObject";
import { NoSprite } from "../Objects/NoSprite";
import { Vector2d } from "../tools/Vector2d";

export class MouseEventHandler extends GameObject implements IMouseSubscriber{
    private static instance: MouseEventHandler
    private target: GameObject|null
    private mouse_down: boolean
    private event_start_delta: [number, number]
    constructor(){
        if(!MouseEventHandler.instance){
            super(new NoSprite())
            this.getStatic().setWidth(0)
            this.getStatic().setHeight(0)
            this.getStatic().setVisibility(false)
            MouseEventHandler.instance = this
            this.target = null
            this.mouse_down = false
            this.event_start_delta = [0, 0]
        }
        else{
            return MouseEventHandler.instance
        }
    }
    onBeginOverlap(o: GameObject): void {
        if(this.mouse_down || this.target) return
        this.target = o
        o.select()
    }
    onEndOverlap(o: GameObject): void {
        if(this.mouse_down) return
        this.target = null
        o.unselect()
    }
    onMouseMove(event: MouseEvent){
        this.getStatic().setPosition(new Vector2d(event.x, window.innerHeight-event.y))
        if(this.mouse_down && this.target){
            let delta: Vector2d = new Vector2d(this.getStatic().getPosition().x+this.event_start_delta[0], this.getStatic().getPosition().y+this.event_start_delta[1])
            this.target.getStatic().setPosition(delta)
        }
    }
    onMouseDown(event: MouseEvent){
        this.mouse_down = true
        if(this.target){
            this.event_start_delta = [this.target.getStatic().getPosition().x - event.x, this.target.getStatic().getPosition().y - (window.innerHeight - event.y)]
        }
    }
    onMouseUp(event: MouseEvent){
        this.mouse_down = false
        this.event_start_delta = [0, 0]
    }
    onMouseEnter(e: MouseEvent): void {
        
    }
    onMouseLeave(e: MouseEvent): void {
        
    }
    onMouseOut(e: MouseEvent): void {
        
    }
    onMouseOver(e: MouseEvent): void {
        
    }
}
window.addEventListener('mousemove', (event)=>{ 
    new MouseEventHandler().onMouseMove(event)
})
window.addEventListener('mousedown', (event)=>{ 
    new MouseEventHandler().onMouseDown(event)
})
window.addEventListener('mouseup', (event)=>{ 
    new MouseEventHandler().onMouseUp(event)
})