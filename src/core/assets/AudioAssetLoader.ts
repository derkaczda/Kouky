namespace Kouky {

    export class AudioAsset implements Asset {
        public readonly name: string;
        public readonly data: HTMLAudioElement;

        public constructor(name: string, data: HTMLAudioElement) {
            this.name = name;
            this.data = data;
        }

        public play(): void {
            if(!this.data.paused) {
                this.stop();
            }
            this.data.play();
        }

        public pause(): void {
            this.data.pause();
        }

        public stop(): void {
            this.data.pause();
            this.data.currentTime = 0;
        }
    }

    export class AudioAssetLoader implements AssetLoader {
        public get supportedExtension(): string[] {
            return ["mp3"];
        };
        
        public loadAsset(assetName: string): void {
            let audio: HTMLAudioElement = new Audio(assetName);
            AssetManager.onAssetLoaded(new AudioAsset(assetName, audio));
        }
        
    }
}