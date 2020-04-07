namespace Kouky {
    export class Vertex implements IBufferDataElement {
        public position: Vector3 = Vector3.zero;
        public color: Color;
        public texCoords: Vector2;

        public constructor(position: Vector3, color?: Color, texCoordinates?: Vector2) {
            this.position = position;
            this.color = color;
            this.texCoords = texCoordinates;
        }

        public toArray(): number[] {
            let array: number[] = [];
            array = array.concat(this.position.toArray());
            if(this.color !== undefined)
                array = array.concat(this.color.toArray());
            if(this.texCoords !== undefined)
                array = array.concat(this.texCoords.toArray());
            return array;
        }

        public toFloat32Array(): Float32Array {
            return new Float32Array(this.toArray());
        }
    }

    export class VertexBufferData implements IBufferData {
        private _elements: Vertex[] = [];

        public get data(): Vertex[] { return this._elements; }

        public addElement(element: Vertex): void {
            this._elements.push(element);
        }

        public addElements(elements: Vertex[]): void {
            for(let e of elements) {
                this._elements.push(e);
            }
        }

        public toArray(): number[] {
            let array: number[] = [];
            for(let vertex of this._elements) {
                array = array.concat(vertex.toArray());
            }
            return array;
        }

        public toFloat32Array(): Float32Array {
            return new Float32Array(this.toArray());
        }
        
    }

    export class VertexBuffer implements IBuffer {
        private _buffer: WebGLBuffer;
        private _bufferData: VertexBufferData;

        public constructor() {
            this._buffer = WebGLContext.createBuffer();
        }

        public bind(): void {
            WebGLContext.bindArrayBuffer(this._buffer);
        }

        public unbind(): void {
            WebGLContext.bindArrayBuffer(undefined);
        }

        public addData(data: VertexBufferData): void {
            this._bufferData = data;
        }

        public addDataAndLoad(data: VertexBufferData): void {
            this.addData(data);
            this.loadData();
        }

        public loadData(): void {
            if(this._bufferData !== undefined) {
                this.bind();
                WebGLContext.uploadArrayData(this._bufferData.toFloat32Array());
                this.unbind();
            }
        }

        public deleteData(): void {
            this._bufferData = undefined;
        }
        
        public toString(): string {
            return "VertexBuffer";
        }
    }
}