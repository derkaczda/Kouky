namespace Kouky {
    export interface EventHandler {
        onEvent(event: Event): boolean;
    }
}