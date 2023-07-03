export interface IMouseSubscriber {
    onMouseMove(e: MouseEvent): void
    onMouseDown(e: MouseEvent): void
    onMouseUp(e: MouseEvent): void
    onMouseEnter(e: MouseEvent): void
    onMouseLeave(e: MouseEvent): void
    onMouseOut(e: MouseEvent): void
    onMouseOver(e: MouseEvent): void
}