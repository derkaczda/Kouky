namespace Kouky {

    export class AssetManager {

        private static _loaders: AssetLoader[] = [];
        private static _loadedAssets: { [name: string]: Asset } = {};

        private constructor() {

        }

        public static initialize(): void {
            // AssetManager._loaders.push(new mageAssetLoader());
            // AssetManager._loaders.push(new JsonAssetLoader());
            AssetManager._loaders.push(new AudioAssetLoader());
        }

        public static registerLoader(loader: AssetLoader): void {
            AssetManager._loaders.push(loader);
        }

        public static onAssetLoaded(asset: Asset): void {
            AssetManager._loadedAssets[asset.name] = asset;
            EventSystem.dispatch(new AssetLoadEvent(this, asset));
        }

        public static loadAsset(assetName: string): void {
            let extension = assetName.split('.').pop().toLowerCase();
            for (let l of AssetManager._loaders) {
                if (l.supportedExtension.indexOf(extension) !== -1) {
                    l.loadAsset(assetName);
                    return;
                }
            }

            console.warn("Unable to load asset with extension " + extension + " because there is no loader associated with it");
        }

        public static isAssetLoaded(assetName: string): boolean {
            return AssetManager._loadedAssets[assetName] !== undefined;
        }

        public static getAsset(assetName: string): Asset {
            if (AssetManager.isAssetLoaded(assetName))
                return AssetManager._loadedAssets[assetName];
            else
                AssetManager.loadAsset(assetName);

            return undefined;
        }
    }
}