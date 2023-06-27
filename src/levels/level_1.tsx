import { Dino } from '../components/Dino'
import { Background } from '../components/Background';
import Colors from '../types/Colors';
import { GameObject } from '../core/Objects/GameObject';
import { github_sprite } from '../sprites';


export default function(){
    let github = new GameObject(github_sprite)
    github.getStatic().setPosition([15, 7])
    github.getStatic().setFrameWidth(5)

    let dino = new Dino(Colors.Blue)
    dino.getStatic().setPosition([5, 5.5])
    dino.getStatic().setFrameWidth(5)

    new Background().addChild(github)
    new Background().addChild(dino)
    dino.addOverlapListener(new Background())
    new Background().addOverlapListener(dino)
}