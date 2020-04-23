namespace Kouky {
    export class TestEvent implements Event {

        public handled: boolean;
        public get name(): string { return "TestEvent" };
        public get sender(): any { return this._sender; };

        private _sender: any;

        public constructor(sender: any) {
            this._sender = sender;
        }

        public toString(): string {
            return this.name;
        }
        
    }
}