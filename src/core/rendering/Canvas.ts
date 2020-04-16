namespace Kouky {
    export class Canvas {
        private _width: number;
        private _height: number;
        private _canvas: HTMLCanvasElement;
        private _clearColor: Color;
        private _projectionMatrix: Matrix4x4 = Matrix4x4.identity();

        public constructor(width: number, height: number) {
            this._width = width;
            this._height = height;
            this._canvas = WebGLContext.canvas;
        }

        public get width(): number { return this._width };
        public get height(): number { return this._height };
        public get projectionMatrix(): Matrix4x4 { return this._projectionMatrix; }
        public get clearColor(): Color { return this._clearColor; }

        public set width(value: number) { this._width = value; this.resize(); }
        public set height(value: number) { this._height = value; this.resize(); }
        public set clearColor(value: Color) { 
            this._clearColor = value;
            WebGLContext.clearColor = value;
        }

        public resize(): void {
            WebGLContext.gl.canvas.width = this._width;
            WebGLContext.gl.canvas.height = this._height;
            this.updateViewport();
            this._projectionMatrix = Matrix4x4.perspective(0 , this._canvas.width, this._canvas.height,0,  0.5, 8.0);
            console.log(this._projectionMatrix.toString());
        }

        public clear(color?: Color): void {
            if(color !== undefined) {
                this.clearColor = color;
            }
            WebGLContext.clear();
        }

        public updateViewport(): void {
            WebGLContext.viewport(0, 0, WebGLContext.gl.canvas.width, WebGLContext.gl.canvas.height);
        }
    }
}