export interface IJumpable{
    is_jump():number
    jump(jump_start_time: number): void
    getJumpTime(): number
    getJumpStartTime(): number
    setJumpTime(jump_time: number): void
    setJumpStartTime(jump_start_time: number): void
}