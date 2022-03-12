import ReactDOM from 'react-dom';
import './index.css';
import { Dino } from './components/Dino'
import { Cristall } from './components/Cristall';
import GameObjects from './GameObjects';
import Colors from './types/Colors';
// import reportWebVitals from './reportWebVitals';

const FPS = 8;
let blue_cristall = new Cristall(Colors.Blue)
blue_cristall.setPosition(200, 0)
let green_cristall = new Cristall(Colors.Green)
green_cristall.setPosition(300, 0)
let red_cristall = new Cristall(Colors.Red)
red_cristall.setPosition(400, 0)
let yellow_cristall = new Cristall(Colors.Yellow)
yellow_cristall.setPosition(500, 0)


let dino = new Dino(Colors.Blue)
dino.setPosition(400, 0)
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
}
setInterval(tick, 1/FPS * 1000)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
