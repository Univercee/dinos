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
export default window