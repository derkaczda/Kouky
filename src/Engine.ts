namespace Kouky {
    export class KoukyEngine {

        private static _debugMode: boolean;

        public constructor(canvasElementId?: string, parentElementId?: string, debug: boolean = false) {
            KoukyEngine._debugMode = debug;


            WebGLContext.init(canvasElementId, parentElementId);
        }

        public static get debug(): boolean { return KoukyEngine._debugMode; }

    }
}