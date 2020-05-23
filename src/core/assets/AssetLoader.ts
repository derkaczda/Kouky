namespace Kouky {

    export interface AssetLoader {
        readonly supportedExtension: string[];

        loadAsset(assetName: string): void;
    }
}