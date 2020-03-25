namespace Kouky {
    export class Logger {

        private constructor() {}

        public static info(msg: string, onlyDebug: boolean = true) {
            if((KoukyEngine.debug && onlyDebug) || !onlyDebug) {
                console.log(msg);
            }
        }

        public static warning(msg: string, onlyDebug: boolean = true) {
            if((KoukyEngine.debug  && onlyDebug) || !onlyDebug) {
                console.warn(msg);
            }
        }

        public static error(msg: string) {
            console.error(msg);
        }
    }
}