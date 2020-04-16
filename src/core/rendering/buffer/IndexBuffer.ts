namespace Kouky {
    export class Index implements IBufferDataElement {
        public index: number;

        public constructor(index: number) {
            this.index = index;
        }

        public toArray(): number[] {
            return [this.index];
        }

        public toFloat32Array(): Float32Array {
            return new Float32Array(this.toArray());
        }

        public toUint26Array(): Uint16Array {
            return new Uint16Array(this.toArray());
        }
    }

    export class IndexBufferData  implements IBufferData {
        private _elements: Index[] = [];

        public addElement(element: Index): void {
            this._elements.push(element);
        }

        public addElements(elements: Index[]): void {
            for(let e of elements) {
                this._elements.push(e);
            }
        }

        public toArray(): number[] {
            let array: number[] = [];
            for(let index of this._elements) {
                array = array.concat(index.toArray());
            }
            return array;
        }
        
        public toFloat32Array(): Float32Array {
            return new Float32Array(this.toArray());
        }

        public toUint16Array(): Uint16Array {
            return new Uint16Array(this.toArray());
        }
    }

    export class IndexBuffer implements IBuffer {
        private _buffer: WebGLBuffer;
        private _bufferData: IndexBufferData;

        public constructor() {
            this._buffer = WebGLContext.createBuffer();
        }

        public bind(): void {
            WebGLContext.bindElementArrayBuffer(this._buffer);
        }
        
        public unbind(): void {
            WebGLContext.bindElementArrayBuffer(undefined);
        }
        
        public addData(data: IndexBufferData): void {
            this._bufferData = data;
        }
        
        public deleteData(): void {
            this._bufferData = undefined;
        }
        
        public loadData(): void {
            if(this._bufferData !== undefined) {
                this.bind();
                WebGLContext.uploadElementArrayData(this._bufferData.toUint16Array());
                this.unbind();
            }
        }

        public addDataAndLoad(data: IndexBufferData): void {
            this.addData(data);
            this.loadData();
        }

        public toString(): string {
            return "IndexBuffer";
        }
        
    }
}