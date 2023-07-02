import { GameObject } from "../Objects/GameObject";
import { NoSprite } from "../Objects/NoSprite";

export class MouseEventHandler extends GameObject{
    private static instance: MouseEventHandler
    private target: GameObject|null
    private mouse_down: boolean
    private event_start_delta: [number, number]
    constructor(){
        if(!MouseEventHandler.instance){
            super(new NoSprite())
            this.getStatic().setFrameWidth(0)
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
        this.getStatic().setPosition([event.x, window.innerHeight-event.y])
        if(this.mouse_down && this.target){
            let delta: [number, number] = [this.getStatic().getPosition()[0]+this.event_start_delta[0], this.getStatic().getPosition()[1]+this.event_start_delta[1]]
            this.target.getStatic().setPosition(delta)
        }
    }
    onMouseDown(event: MouseEvent){
        this.mouse_down = true
        if(this.target){
            this.event_start_delta = [this.target.getStatic().getPosition()[0] - event.x, this.target.getStatic().getPosition()[1] - (window.innerHeight - event.y)]
        }
    }
    onMouseUp(event: MouseEvent){
        this.mouse_down = false
        this.event_start_delta = [0, 0]
        
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