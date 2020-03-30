namespace Kouky {
    export enum LoggingLevel {
        ALL, WARNING, ERROR
    }

    export class Logger {

        private static _loggingLevel: LoggingLevel = LoggingLevel.ERROR;
        private constructor() {}

        public static get loggingLevel(): LoggingLevel { return Logger._loggingLevel; }
        public static set loggingLevel(value: LoggingLevel) { Logger._loggingLevel = value; }

        public static info(msg: string, loggingLevel: LoggingLevel = LoggingLevel.ALL) {
            if(Logger._loggingLevel === loggingLevel || Logger._loggingLevel === LoggingLevel.ALL) {
                console.log(msg);
            }
        }

        public static warning(msg: string, loggingLevel: LoggingLevel = LoggingLevel.WARNING) {
            if(Logger._loggingLevel === loggingLevel || Logger._loggingLevel === LoggingLevel.ALL) {
                console.warn(msg);
            }
        }

        public static error(msg: string) {
            console.error(msg);
        }
    }
}