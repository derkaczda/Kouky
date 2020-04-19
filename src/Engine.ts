namespace Kouky {
    export class KoukyEngine {

        private static _debugMode: boolean;
        private _canvas: Canvas;

        public constructor(canvasElementId?: string, parentElementId?: string, debug: boolean = false) {
            KoukyEngine._debugMode = debug;
            if(debug) {
                Logger.loggingLevel = LoggingLevel.ALL;
            } else {
                Logger.loggingLevel = LoggingLevel.ERROR;
            }
            WebGLContext.init(canvasElementId, parentElementId);
            this._canvas = new Canvas(800, 600);
            EnginePipeline.canvas = this._canvas;

            this.resize();
        }
        
        public static get debug(): boolean { return KoukyEngine._debugMode; }
        
        public get display(): Canvas { return this._canvas; }

        public start(): void {
            Input.intialize();
            EnginePipeline.startComponents();
        }
        
        public end(): void {
            EnginePipeline.endComponents();
        }
        
        public loop(): void {
            let time: Timestamp = Timer.startTime();
            EnginePipeline.frame(time);
            Timer.stopTime();
            requestAnimationFrame(this.loop.bind(this));
        }

        public resize(): void {
            this._canvas.resize();
        }

        public fullscreen(): void {
            this._canvas.width = window.innerWidth;
            this._canvas.height = window.innerHeight;
            this.resize();
        }
    }
}