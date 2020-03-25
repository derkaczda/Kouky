namespace Kouky {
    export class WebGLContext {

        private static _glContext: WebGLRenderingContext;
        private static _canvasElement: HTMLCanvasElement;

        private constructor() {}

        /*
         * Getters
         */

        public static get gl(): WebGLRenderingContext { return WebGLContext._glContext; }
        public static get canvas(): HTMLCanvasElement { return WebGLContext._canvasElement; }

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
    }
}