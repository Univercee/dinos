import { IOverlapListener } from "../interfaces/IOverlapListener"
import { GameObject } from "./GameObject"

export class OverlapListener implements IOverlapListener {
    private listeners: Array<GameObject> = []
    private targets: Array<GameObject> = []
    private prev_targets: Array<GameObject> = []
    addListener(o: GameObject): void{ this.listeners.push(o) }
    removeListener(o: GameObject): void { this.listeners = this.listeners.filter((el)=>{return el !== o})}
    isOverlap(o_this: GameObject, o: GameObject): boolean {
        let x = o_this.getStatic().getPosition()[0] + o_this.getStatic().getFrameWidth()/2
        let x_min = o.getStatic().getPosition()[0] - o_this.getStatic().getFrameWidth()/2
        let x_max = x_min + o.getStatic().getFrameWidth() + o_this.getStatic().getFrameWidth()

        let y = o_this.getStatic().getPosition()[1] + o_this.getStatic().getFrameWidth()/2
        let y_min = o.getStatic().getPosition()[1] - o_this.getStatic().getFrameWidth()/2
        let y_max = y_min + o.getStatic().getFrameWidth() + o_this.getStatic().getFrameWidth()
        return ((x-x_min)*(x-x_max) <= 0 && (y-y_min)*(y-y_max) <= 0)
    }
    getTargets(){ return this.targets }
    getPrevTargets(){ return this.prev_targets }
    
    listen(target: GameObject): void {
        this.listeners.forEach((o)=>{
            if(this.isOverlap(o, target)){
                if(!this.prev_targets.includes(o)){
                    o.onBeginOverlap(target)
                }
                this.targets.push(o)
                o.onOverlap(target)
            }
            else{
                if(this.prev_targets.includes(o)){
                    o.onEndOverlap(target)
                }
                this.targets = this.targets.filter((el)=>{return el !== o})
            }
        }) 
        this.prev_targets = this.targets
    }
}