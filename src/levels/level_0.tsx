import { Dino } from '../components/Dino'
import { Background } from '../components/Background';
import Colors from '../types/Colors';
import level_1 from './level_1';
import { CristallLevelLoader } from '../components/CristallLevelLoader.ts';
import { MouseEventHandler } from '../core/logic/mouseListener';

export default function(){
    let dino = new Dino(Colors.Blue)
    let cristall = new CristallLevelLoader(level_1)
    let mouseListener = new MouseEventHandler()
    dino.getStatic().setPosition([0, 0])
    dino.getStatic().setFrameWidth(50)
    cristall.getStatic().setPosition([50, 50])

    mouseListener.addOverlapListener(dino)
    dino.addOverlapListener(mouseListener)
    cristall.addOverlapListener(mouseListener)
    dino.addOverlapListener(cristall)
    new Background().addChild(cristall)
    new Background().addChild(dino)
    new Background().addChild(mouseListener)
    dino.addOverlapListener(new Background())
    new Background().addOverlapListener(dino)
}