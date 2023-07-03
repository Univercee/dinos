export class Vector2d {
    public x: number
    public y: number
    constructor(x: number = 0, y: number = 0){
        this.x = x
        this.y = y
    }
    add(v: Vector2d){
        this.x += v.x
        this.y += v.y
    }
    substract(v: Vector2d){
        this.x -= v.x
        this.y -= v.y
    }
    multiply(v: Vector2d){
        this.x *= v.x
        this.y *= v.y
    }
    divide(v: Vector2d){
        this.x /= v.x
        this.y /= v.y
    }

}