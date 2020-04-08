namespace Kouky {
    export interface EnginePipelineComponent {
        start(): void;
        end(): void;
        updateReady(): void;
        update(time: Timestamp): void;
        render(): void;
    }
}