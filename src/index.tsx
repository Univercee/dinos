import ReactDOM from 'react-dom';
import './index.css';
import Dino from './components/Dino'
// import reportWebVitals from './reportWebVitals';

const FPS = 8;

(window as any).keys = {
  a: false,
  d: false,
  e: false,
  shift: false
}
window.onkeydown = function(event){
  let key = event.key.toLowerCase()
  if(key === "a" || key === "d" || key === "shift" || key === "e"){
      (window as any).keys[key] = true
  }
}
window.onkeyup = function(event){
  let key = event.key.toLowerCase()
  if(key === "a" || key === "d" || key === "shift" || key === "e"){
      (window as any).keys[key] = false
  }
}

function tick(){
  Dino.tick()
  ReactDOM.render(
    Dino.render(),
    document.getElementById('root')
  );
}
setInterval(tick, 1/FPS * 1000)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
