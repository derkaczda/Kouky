namespace Kouky {
    export class Timestamp {
        currentTime: number = 0;
        lastTime: number = 0;
        frameDelta: number = 0;
        frameCount: number = 0;
    }

    export class Timer {
        private static _timestamp: Timestamp = new Timestamp();

        public static startTime(): Timestamp {
            Timer._timestamp.currentTime = performance.now();
            return Timer._timestamp;
        }

        public static stopTime(): void {
            Timer._timestamp.lastTime = Timer._timestamp.currentTime;
            Timer._timestamp.frameDelta = performance.now() - Timer._timestamp.lastTime;
            Timer._timestamp.frameCount++;
        }
    }
}