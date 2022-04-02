import { Dino } from '../components/Dino'
import { Cristall } from '../components/Cristall';
import { Hud } from '../components/HUD';
import { Background } from '../components/Background';
import Colors from '../types/Colors';
import Keys from '../types/Keys';

new Background().removeAllChilds()

let hud_a = new Hud(Keys.A)
let hud_d = new Hud(Keys.D)
let hud_shift = new Hud(Keys.Shift)
let hud_space = new Hud(Keys.Space)
hud_a.getStatic().setPosition([20,40])
hud_a.getStatic().setFrameWidth(5)
hud_d.getStatic().setPosition([25,40])
hud_d.getStatic().setFrameWidth(5)
hud_shift.getStatic().setPosition([5,40])
hud_shift.getStatic().setFrameWidth(12.5)
hud_space.getStatic().setPosition([1.5,30])
hud_space.getStatic().setFrameWidth(35)

let green_cristall = new Cristall(Colors.Green)
let red_cristall = new Cristall(Colors.Red)
let yellow_cristall = new Cristall(Colors.Yellow)
let blue_cristall = new Cristall(Colors.Blue)
green_cristall.getStatic().setPosition([15, 7])
red_cristall.getStatic().setPosition([35, 7])
yellow_cristall.getStatic().setPosition([55, 7])
blue_cristall.getStatic().setPosition([75, 7])

let dino = new Dino(Colors.Blue)
dino.getStatic().setPosition([5, 5.5])

dino.addOverlapListener(green_cristall)
dino.addOverlapListener(red_cristall)
dino.addOverlapListener(yellow_cristall)
dino.addOverlapListener(blue_cristall)
green_cristall.addOverlapListener(dino)
red_cristall.addOverlapListener(dino)
yellow_cristall.addOverlapListener(dino)
blue_cristall.addOverlapListener(dino)

new Background().addChild(blue_cristall)
new Background().addChild(green_cristall)
new Background().addChild(red_cristall)
new Background().addChild(yellow_cristall)
new Background().addChild(hud_a)
new Background().addChild(hud_d)
new Background().addChild(hud_shift)
new Background().addChild(hud_space)
new Background().addChild(dino)
dino.addOverlapListener(new Background())
new Background().addOverlapListener(dino)