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
            WebGLContext.clearColor = Color.blue();
            WebGLContext.clear();
        }

        public static get debug(): boolean { return KoukyEngine._debugMode; }

    }
}