import ReactDOM from 'react-dom';
import './index.css';
import Dino from './components/Dino'
import Cristall from './components/Cristall';
import './keyListener';
// import reportWebVitals from './reportWebVitals';

const FPS = 8;
let dino = new Dino()
let cristall = new Cristall()
dino.addOverlapListener(cristall)
function tick(){
  dino.tick()
  cristall.tick()
  ReactDOM.render(
    [cristall.render(),dino.render()],
    document.getElementById('root') 
  );
}
setInterval(tick, 1/FPS * 1000)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
