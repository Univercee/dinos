export interface IKeyboardListener{
    onKeyDown(e: KeyboardEvent): void
    onKeyUp(e: KeyboardEvent): void
    onKeyPress(e: KeyboardEvent): void
}