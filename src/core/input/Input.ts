/// <reference path="../math/Vector2.ts"/>

namespace Kouky {
    export enum Keys {
        LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40,
        SPACE = 32
    }

    export class MouseContext {
        public leftDown: boolean;
        public rightDown: boolean;
        public position: Vector2 = Vector2.zero;

        public constructor(left: boolean, right: boolean, position: Vector2) {
            this.leftDown = left;
            this.rightDown = right;
            this.position.copyFrom(position);
        }
    }

    export class Input {
        private static _keys: boolean[] = [];
        private static _mousePosition: Vector2 = Vector2.zero;
        private static _previousMousePosition: Vector2 = Vector2.zero;
        private static _mouseLeftDown: boolean = false;
        private static _mouseRightDown: boolean = false;
        private static _mouseMiddleDown: boolean = false;
        
        public static intialize(): void {
            for(let i = 0; i < 255; i++) {
                Input._keys[i] = false;
            }
            window.addEventListener('keydown', Input.onKeyDown);
            window.addEventListener('keyup', Input.onKeyUp);
            window.addEventListener('mousemove', Input.onMouseMove);
            window.addEventListener('mousedown', Input.onMouseDown);
            window.addEventListener('mouseup', Input.onMouseUp);

        }
        
        public static isKeyDown(key: Keys): boolean {
            return Input._keys[key];
        }

        public static getMousePosition(): Vector2 {
            return Input._mousePosition;
        }

        private static onKeyDown(event: KeyboardEvent) : boolean {
            Input._keys[event.keyCode] = true;
            EventSystem.dispatch(new KeyDownEvent(this, event.keyCode as Keys), true);
            return true;
        }

        private static onKeyUp(event: KeyboardEvent) : boolean {
            Input._keys[event.keyCode] = false;
            console.log(event.keyCode);
            EventSystem.dispatch(new KeyUpEvent(this, event.keyCode as Keys), true);
            return true;
        }

        private static onMouseMove(event: MouseEvent): void {
            Input._previousMousePosition.copyFrom(Input._mousePosition);
            Input._mousePosition.x = event.clientX;
            Input._mousePosition.y = event.clientY;
        }

        private static onMouseDown(event: MouseEvent): void {
            if(event.button === 0) {
                this._mouseLeftDown = true;
            } else if (event.button === 2) {
                this._mouseRightDown = true;
            } else if (event.button === 1) {
                this._mouseMiddleDown = true;
            }

            //Message.send("MOUSE_DOWN", this, new MouseContext(Input._mouseLeftDown, Input._mouseRightDown, Input._mousePosition));
        }

        private static onMouseUp(event: MouseEvent): void {
            if(event.button === 0) {
                this._mouseLeftDown = false;
            } else if (event.button === 2) {
                this._mouseRightDown = false;
            } else if (event.button === 1) {
                this._mouseMiddleDown = false;
            }
            //Message.send("MOUSE_UP", this, new MouseContext(Input._mouseLeftDown, Input._mouseRightDown, Input._mousePosition));

        }
    }
}