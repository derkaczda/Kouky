/// <reference path="Event.ts" />

namespace Kouky {
    export class AssetLoadEventArguments extends EventArguments {
        public asset: Asset;
    }

    export class AssetLoadEvent extends Event {
        public static get type(): string { return "AssetLoadEvent"; }
        public get type(): string { return "AssetLoadEvent"; }

        protected _arguments: AssetLoadEventArguments;

        public constructor(sender: any, asset: Asset) {
            super(sender);
            this._arguments.asset = asset;
        }

        protected createArguments(): void { this._arguments = new AssetLoadEventArguments(); }

        protected fillArguments(): void {
            super.fillArguments();
        }
    }
}