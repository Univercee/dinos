import GameObjects from "./GameObjects"
import Keys from "./types/Keys"

export const input = new Map<Keys, boolean>([
    [Keys.A, false],
    [Keys.D, false],
    [Keys.E, false],
    [Keys.Shift, false],
    [Keys.Space, false],
    [Keys.default, false],
])

function toKey(key: string): Keys
{
  switch(key){
    case 'a':
    case 'ф':
      return Keys.A
    case 'd':
    case 'в':
      return Keys.D
    case 'e':
    case 'у':
      return Keys.E
    case 'shift':
      return Keys.Shift
    case ' ':
      return Keys.Space
    default:
      return Keys.default
  }
}
  window.onkeydown = function(event){
    let key = toKey(event.key.toLowerCase())
    if(input.has(key)){
      input.set(key, true)
    }
    GameObjects.forEach(el => el.onKeyDown(input))
  }
  window.onkeyup = function(event){
    let key = toKey(event.key.toLowerCase())
    if(input.has(key)){
      input.set(key, false)
    }
    GameObjects.forEach(el => el.onKeyDown(input))
  }