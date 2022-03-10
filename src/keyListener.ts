(window as any).keys = new Map([
    ['a', false],
    ['d', false],
    ['e', false],
    ['shift', false],
    [' ', false]
])
  window.onkeydown = function(event){
    let key = event.key.toLowerCase()
    if((window as any).keys.has(key)){
        (window as any).keys[key] = true
    }
  }
  window.onkeyup = function(event){
    let key = event.key.toLowerCase()
    if((window as any).keys.has(key)){
        (window as any).keys[key] = false
    }
  }
export default window