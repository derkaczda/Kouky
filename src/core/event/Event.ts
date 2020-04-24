namespace Kouky {
    export class EventArguments {
        public type: string;
    }

    export class Event {
        public static get type(): string { return "Event"; }
        public get type(): string { return "Event"; }

        public get arguments(): EventArguments { return this._arguments; }

        private _sender: any;
        protected _arguments: EventArguments;

        public get sender(): any { return this._sender; }

        public constructor(sender: any) {
            this._sender = sender;
            this.createArguments();
            this.fillArguments();
        }

        protected createArguments() { this._arguments = new EventArguments(); }

        protected fillArguments(): void {
            this._arguments.type = this.type;
        }

    }
}