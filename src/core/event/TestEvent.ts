/// <reference path="Event.ts" />

namespace Kouky {
    export class TestEvent extends Event {
        public static get type(): string { return "TestEvent"; }
        public get type(): string { return "TestEvent"; }

        public constructor(sender: any) {
            super(sender);
        }
    }

    export class NochEinEvent extends Event {
        public static get type(): string { return "NochEinEvent"; }
        public get type(): string { return "NochEinEvent"; }

        public constructor(sender: any) {
            super(sender);
        }
    }
}