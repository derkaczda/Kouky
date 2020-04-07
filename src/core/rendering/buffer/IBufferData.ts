namespace Kouky {
    export interface IBufferDataElement {
        toArray(): number[];
        toFloat32Array(): Float32Array;
    }

    export interface IBufferData {
        addElement(element: IBufferDataElement): void;
        addElements(elements: IBufferDataElement[]): void;
        toArray(): number[];
        toFloat32Array(): Float32Array;
    }
}