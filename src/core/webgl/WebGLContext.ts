/// <reference path="../math/Vector3.ts" />
/// <reference path="../graphics/Color.ts" />

namespace Kouky {
    export class WebGLContext {

        private static _glContext: WebGLRenderingContext;
        private static _canvasElement: HTMLCanvasElement;
        private static _clearColor: Color = Color.black();

        private constructor() {}

        /*
         * Getters / Setters
         */

        public static get gl(): WebGLRenderingContext { return WebGLContext._glContext; }
        public static get canvas(): HTMLCanvasElement { return WebGLContext._canvasElement; }
        public static get clearColor(): Color { return WebGLContext._clearColor; }

        public static set clearColor(value: Color) { WebGLContext._clearColor.copyFrom(value); }

        /*
         * Static methods
         */

        public static init(elementId?: string, parentElementId?: string): void {
            let canvas: HTMLCanvasElement;
            
            Logger.info("Kouky.WebGLContext: initializing webgl context");

            if(elementId !== undefined) {
                canvas = document.getElementById(elementId) as HTMLCanvasElement;
                if (canvas === undefined) {
                    throw new Error("Kouky.WebGLContext: Cannot find a canvas element named: " + elementId);
                }
            } else {
                canvas = document.createElement("canvas") as HTMLCanvasElement;
                if(parentElementId !== undefined) {
                    let parent = document.getElementById(parentElementId) as HTMLElement;
                    parent.appendChild(canvas);
                } else {
                    document.append(canvas);
                }
            }

            WebGLContext._canvasElement = canvas;
            WebGLContext._glContext = canvas.getContext("webgl");
            if(WebGLContext._glContext === undefined) {
                throw new Error("Kouky.WebGLContext: unable to initialize WebGL!");
            }
        }

        public static viewport(x: number, y: number, width: number, height: number): void {
            WebGLContext._glContext.viewport(x, y, width, height);
        }

        public static clear(): void {
            WebGLContext._glContext.clearColor(WebGLContext._clearColor.r, WebGLContext._clearColor.g, 
                WebGLContext._clearColor.b, WebGLContext._clearColor.a);
            WebGLContext._glContext.clear(WebGLContext._glContext.COLOR_BUFFER_BIT | WebGLContext._glContext.DEPTH_BUFFER_BIT);
        }

        public static createBuffer(): WebGLBuffer {
            return WebGLContext._glContext.createBuffer();
        }

        public static bindArrayBuffer(arrayBuffer: WebGLBuffer): void {
            WebGLContext._glContext.bindBuffer(WebGLContext._glContext.ARRAY_BUFFER, arrayBuffer);
        }

        public static uploadArrayData(data: Float32Array): void {
            WebGLContext._glContext.bufferData(WebGLContext._glContext.ARRAY_BUFFER, data, WebGLContext._glContext.STATIC_DRAW);
        }

        public static bindElementArrayBuffer(elementBuffer: WebGLBuffer): void {
            WebGLContext._glContext.bindBuffer(WebGLContext._glContext.ELEMENT_ARRAY_BUFFER, elementBuffer);
        }

        public static uploadElementArrayData(data: Uint16Array): void {
            WebGLContext._glContext.bufferData(WebGLContext._glContext.ELEMENT_ARRAY_BUFFER, data, WebGLContext._glContext.STATIC_DRAW);
        }

        public static createShader(type: number): WebGLShader {
            return WebGLContext._glContext.createShader(type);
        }

        public static shaderSource(shader: WebGLShader, source: string): void {
            WebGLContext._glContext.shaderSource(shader, source);
        }

        public static compileShader(shader: WebGLShader): void {
            WebGLContext._glContext.compileShader(shader);
        }

        public static createShaderProgram(): WebGLProgram {
            return WebGLContext._glContext.createProgram();
        }

        public static attachShader(program: WebGLProgram, shader: WebGLShader): void {
            WebGLContext._glContext.attachShader(program, shader);
        }

        public static linkProgram(program: WebGLProgram): void {
            WebGLContext._glContext.linkProgram(program);
        }

        public static useProgram(program: WebGLProgram): void {
            WebGLContext._glContext.useProgram(program);
        }

        public static getAttributLocation(program: WebGLProgram, name: string): number {
            return WebGLContext._glContext.getAttribLocation(program, name);
        }

        public static enableVertexAttribArray(location: number): void {
            WebGLContext._glContext.enableVertexAttribArray(location);
        }

        public static vertexAttribPointer(location: number,size: number, type: number, normalized: boolean,
            stride: number, offset: number): void {
            
            WebGLContext._glContext.vertexAttribPointer(location, size, type, normalized, stride, offset);
        }

        public static getUniformLocation(program: WebGLProgram, name: string): WebGLUniformLocation {
            return WebGLContext._glContext.getUniformLocation(program, name);
        }

        public static uploadUniform(location:WebGLUniformLocation, value: Float32Array): void {
            WebGLContext._glContext.uniformMatrix4fv(location, false, value);
        }

        public static uploadUniformVec4(location: WebGLUniformLocation, value: Float32Array): void {
            WebGLContext._glContext.uniform4fv(location, value);
        }
    }
}