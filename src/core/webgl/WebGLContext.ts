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

        public static clear(): void {
            WebGLContext._glContext.clearColor(WebGLContext._clearColor.r, WebGLContext._clearColor.g, 
                WebGLContext._clearColor.b, WebGLContext._clearColor.a);
            WebGLContext._glContext.clear(WebGLContext._glContext.COLOR_BUFFER_BIT);
        }
    }
}