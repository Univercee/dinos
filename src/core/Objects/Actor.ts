import { IAction } from "../../interfaces/IAction";
import { ISprite } from "../../interfaces/ISprite";
import ActionName from "../../types/ActionNames";
import { Vector2d } from "../tools/Vector2d";
import { GameObject } from "./GameObject";
import { NoSprite } from "./NoSprite";
import { Static } from "./ObjectStatic";

export class Actor extends GameObject {
    private active_action: Set<ActionName> = new Set()
    private abilities: Array<IAction>
    private static_action: IAction
    private last_action: ActionName
    constructor(sprite: ISprite = new NoSprite(), position: Vector2d = new Vector2d()){
        super(sprite, position)
        this.static_action = <Static>this.static
        this.abilities = []
    }
    tick(): void {
        this.onKeyDown()
        this.update()
        this.static.getSprite().setAction(this.getLastAction())
        this.overlap_listener.listen(this)
        this.childs.forEach(el => {el.tick()})
    }
    update(): void{
        let abilities = this.abilities.filter((el)=>{return this.active_action.has(el.name())})
        abilities.push(this.static_action)
        abilities
        .sort((a, b) => Object.values(ActionName).indexOf(a.name()) - Object.values(ActionName).indexOf(b.name()))
        .forEach((el)=>{
            el.update(this)
            this.last_action = el.name()
        })     
    }
    getActiveActionName(): Set<ActionName>{ return this.active_action }
    getLastAction(): ActionName { return this.last_action }
    abilityByAction(action: ActionName): IAction {
        return this.abilities.filter((el)=>{return el.name() === action})[0]
    }
    hasActiveAction(action: ActionName): boolean { return this.active_action.has(action) }
    addActiveAction(action: ActionName): void { 
        if(action === ActionName._1_Walk) this.active_action.delete(ActionName._2_Run)
        if(action === ActionName._2_Run) this.active_action.delete(ActionName._1_Walk)
        this.active_action.add(action)
    }
    removeAction(action: ActionName){ this.active_action.delete(action) }
    clearActionName(){ this.active_action.clear() }

    addAbility(action: IAction){
        this.abilities.forEach(ability => {
            if(ability.name() == action.name()){
                throw new Error(`Actor${this.getId()}: ability with action ${action.name()} already exist`)
            }
        });
        this.abilities.push(action)
    }
    getAbility(action_name: ActionName): IAction{
        let ability = this.abilities.find((el)=>{ return el.name() == action_name })
        if(!ability){
            throw new Error(`Actor${this.getId()}: ability with action ${action_name} does not exist`)
        }
        return ability
    }
    onKeyDown(){

    }
}