namespace Kouky {
    export interface IBuffer {
        bind(): void;
        unbind(): void;
        addData(data: IBufferData): void;
        deleteData(): void;
        toString(): string;
    }
}