namespace Kouky {
    export interface Event {
        toString(): string;
        handled: boolean
        readonly name: string;
        sender: any;
    }
}