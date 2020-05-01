namespace Kouky {
    export enum KeyState {
        DOWN, UP, REPEAT
    }

    export class KeyEventArguments extends EventArguments {
        public key: Keys;
        public status: KeyState;
    }

    export class KeyDownEvent extends Event {
        public static get type(): string { return "KeyDownEvent"; }
        public get type(): string { return "KeyDownEvent"; }

        protected _arguments: KeyEventArguments;

        private key: Keys;
        private state: KeyState;

        public constructor(sender: any, key: Keys) {
            super(sender);
            this._arguments.key = key;
            this._arguments.status = KeyState.DOWN;
        }

        protected createArguments(): void { this._arguments = new KeyEventArguments(); }

        protected fillArguments(): void {
            super.fillArguments();
        }
    }

    export class KeyUpEvent extends Event {
        public static get type(): string { return "KeyUpEvent"; }
        public get type(): string { return "KeyUpEvent"; }

        protected _arguments: KeyEventArguments;

        private key: Keys;
        private state: KeyState;

        public constructor(sender: any, key: Keys) {
            super(sender);
            this.key = key;
            this._arguments.key = this.key;
            this._arguments.status = KeyState.UP;
        }

        protected createArguments(): void { this._arguments = new KeyEventArguments(); }

        protected fillArguments(): void {
            super.fillArguments();
            this._arguments.key = this.key;
            this._arguments.status = this.state;
        }
    }

    export class KeyRepeatEvent extends Event {
        public static get type(): string { return "KeyRepeatEvent"; }
        public get type(): string { return "KeyRepeatEvent"; }

        protected _arguments: KeyEventArguments;

        private key: Keys;
        private state: KeyState;

        public constructor(sender: any, key: Keys) {
            super(sender);
            this._arguments.key = key;
            this._arguments.status = KeyState.REPEAT;
        }

        protected createArguments(): void { this._arguments = new KeyEventArguments(); }

        protected fillArguments(): void {
            super.fillArguments();
        }
    }
}