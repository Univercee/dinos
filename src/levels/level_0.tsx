import { Dino } from '../components/Dino'
import { Cristall } from '../components/Cristall';
import { Hud } from '../components/HUD';
import { Background } from '../components/Background';
import Colors from '../types/Colors';
import Keys from '../types/Keys';
import level_1 from './level_1';
import { CristallLevelLoader } from '../components/CristallLevelLoader.ts';

export default function(){
    let level_switcher = new CristallLevelLoader(level_1)
    level_switcher.getStatic().setPosition([20, 7])

    let hud_a = new Hud(Keys.A)
    let hud_d = new Hud(Keys.D)
    let hud_shift = new Hud(Keys.Shift)
    let hud_space = new Hud(Keys.Space)
    hud_a.getStatic().setPosition([13,40])
    hud_a.getStatic().setFrameWidth(2.5)
    hud_d.getStatic().setPosition([17,40])
    hud_d.getStatic().setFrameWidth(2.5)
    hud_shift.getStatic().setPosition([1.5,40])
    hud_shift.getStatic().setFrameWidth(6.25)
    hud_space.getStatic().setPosition([1.5,30])
    hud_space.getStatic().setFrameWidth(18)

    let dino = new Dino(Colors.Blue)
    dino.getStatic().setPosition([5, 5.5])
    dino.getStatic().setFrameWidth(5)

    dino.addOverlapListener(level_switcher)
    level_switcher.addOverlapListener(dino)

    new Background().addChild(hud_a)
    new Background().addChild(hud_d)
    new Background().addChild(hud_shift)
    new Background().addChild(hud_space)
    new Background().addChild(level_switcher)
    new Background().addChild(dino)
    dino.addOverlapListener(new Background())
    new Background().addOverlapListener(dino)
}