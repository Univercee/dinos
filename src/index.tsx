import ReactDOM from 'react-dom';
import './index.css';
import './keyListener'
import GameObjects from './GameObjects';
import { Dino } from './components/Dino'
import { Cristall } from './components/Cristall';
import Colors from './types/Colors';
import { Hud } from './components/HUD';
import Keys from './types/Keys';
import { Background } from './components/Background';

// import reportWebVitals from './reportWebVitals';

const FPS = 8;
new Background()

let hud_a = new Hud(Keys.A)
let hud_d = new Hud(Keys.D)
let hud_shift = new Hud(Keys.Shift)
let hud_space = new Hud(Keys.Space)
hud_a.setPosition(15,20)
hud_d.setPosition(20,20)
hud_shift.setPosition(4,20)
hud_shift.setFrameWidth(7.4)
hud_space.setPosition(3,15)
hud_space.setFrameWidth(22)

let blue_cristall = new Cristall(Colors.Blue)
let green_cristall = new Cristall(Colors.Green)
let red_cristall = new Cristall(Colors.Red)
let yellow_cristall = new Cristall(Colors.Yellow)
blue_cristall.setPosition(15, 3)
green_cristall.setPosition(35, 3)
red_cristall.setPosition(55, 3)
yellow_cristall.setPosition(75, 3)

let dino = new Dino(Colors.Blue)
dino.setPosition(4, 2.2)

dino.addOverlapListener(blue_cristall)
dino.addOverlapListener(green_cristall)
dino.addOverlapListener(red_cristall)
dino.addOverlapListener(yellow_cristall)
blue_cristall.addOverlapListener(dino)
green_cristall.addOverlapListener(dino)
red_cristall.addOverlapListener(dino)
yellow_cristall.addOverlapListener(dino)
function tick(){
  GameObjects.map(el => el.tick())
  ReactDOM.render(
    GameObjects.map(el => el.render()),
    document.getElementById('root') 
  );
  console.log(dino.getPosition);
  
}
setInterval(tick, 1/FPS * 1000)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
