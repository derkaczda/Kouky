namespace Kouky {
    export class KoukyEngine {

        private static _debugMode: boolean;

        public constructor(canvasElementId?: string, parentElementId?: string, debug: boolean = false) {
            KoukyEngine._debugMode = debug;
            if(debug) {
                Logger.loggingLevel = LoggingLevel.ALL;
            } else {
                Logger.loggingLevel = LoggingLevel.ERROR;
            }
            WebGLContext.init(canvasElementId, parentElementId);
        }
        
        public static get debug(): boolean { return KoukyEngine._debugMode; }
        
        public start(): void {
            WebGLContext.clearColor = Color.blue();
            WebGLContext.clear();

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
    }
}