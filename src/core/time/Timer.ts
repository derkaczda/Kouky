namespace Kouky {
    export class Timestamp {
        time: number;
        lastTime: number;
        delta: number;

        public constructor(time: number, lastTime: number) {
            this.time = time;
            this.lastTime = lastTime;
            this.delta = this.time - this.lastTime;
        }
    }

    export class Timer {
        private static _lastTime: number = 0;
        private static _current: number = 0;

        public static startTime(): Timestamp {
            Timer._current = performance.now();
            return new Timestamp(Timer._current, Timer._lastTime);
        }

        public static stopTime(): void {
            Timer._lastTime = performance.now();
        }
    }
}