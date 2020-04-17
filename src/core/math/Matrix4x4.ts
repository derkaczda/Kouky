namespace Kouky {
    export class Matrix4x4 {
        private _data: number[] = [];

        public constructor() {
            this._data = [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ];
        }

        public get data(): number[] { return this._data; }

        public static identity(): Matrix4x4 { return new Matrix4x4(); }

        public toFloat32Array(): Float32Array {
            return new Float32Array(this._data);
        }

        public toString(): string {
            let returnval = "";
            for(let i = 1; i <= 16; i++) {
                returnval += this._data[i - 1].toString() + " ";
                if(i % 4 === 0) {
                    returnval += "\n";
                }
            }
            return returnval;
        }

        public copyFrom(matrix: Matrix4x4): void {
            for (let i = 0; i < 16; i++) {
                this._data[i] = matrix.data[i];
            }
        }

        public copyFromList(list: number[]): void {
            if(list.length !== 16) {
                throw new Error("Matrix4x4::copyFromList: list has not the length 16!");
            }
            for (let i = 0; i < 16; i++) {
                this._data[i] = list[i];
            }
        }

        public setData(rowId: number, columnId: number, value: number): void {
            if(rowId > 4 || columnId > 4 || rowId < 1 || columnId < 1) {
                throw new Error("Matrix4x4::setData: rowId or columnId are greater 4 or smaller 1. Please keep ids between 1 and 4");
            }

            this._data[(rowId-1) * 4 + (columnId-1)] = value;
        }

        public getData(rowId: number, columnId: number): number {
            if(rowId > 4 || columnId > 4 || rowId < 1 || columnId < 1) {
                throw new Error("Matrix4x4::getData: rowId or columnId are greater 4 or smaller 1. Please keep ids between 1 and 4");
            }
            return this._data[(rowId-1) * 4 + (columnId-1)];
        }

        public setRow(rowId: number, values: number[]): void {
            if(rowId > 4 || rowId < 1) {
                throw new Error("Matrix4x4::setRow: rowId is greater 4 or smaller 1. Please keep ids between 1 and 4");
            }
            if(values.length != 4) {
                throw new Error("Matrix4x4::setRow: supplied values are not of length 4");
            }
            this.setData(rowId, 1, values[0]);
            this.setData(rowId, 2, values[1]);
            this.setData(rowId, 3, values[2]);
            this.setData(rowId, 4, values[3]);
        }

        public getRow(rowId: number): number[] {
            if(rowId > 4 || rowId < 1) {
                throw new Error("Matrix4x4::getRow: rowId is greater 4 or smaller 1. Please keep ids between 1 and 4");
            }
            return [
                this.getData(rowId,1), 
                this.getData(rowId, 2),
                this.getData(rowId, 3),
                this.getData(rowId, 4),
            ]
        }

        public getColumn(colId: number): number[] {
            if(colId > 4 || colId < 1) {
                throw new Error("Matrix4x4::getColumn: colId is greater 4 or smaller 1. Please keep ids between 1 and 4");
            }
            return [
                this.getData(1, colId),
                this.getData(2, colId),
                this.getData(3, colId),
                this.getData(4, colId),
            ];
        }

        public static orthographic(left: number, right: number, bottom: number,
            top: number, nearClip: number, farClip: number): Matrix4x4 {
            let m = new Matrix4x4();

            /*
             *  2.0 / right-left       ,       0            ,           0              , -(right+left)/(right-left),
             *       0          ,    2.0/(top - bottom)       ,           0              ,-(top+bottom)/(top-bottom),
             *       0          ,       0            ,       -2.0/(far-near)          , -(far+near)/(far-near),
             * 0, 0, 0, 1
             * 
             * */
            
            m.setData(1, 1, 2.0/(right - left));
            m.setData(1, 4, -((right + left)/(right - left)));
            m.setData(2, 2, 2.0/(top-bottom));
            m.setData(2, 4, -((top+bottom)/(top-bottom)));
            m.setData(3, 3, 2.0/(top-bottom));
            m.setData(3, 4, -((farClip+nearClip)/(farClip-nearClip)));
            return m;
        }

        public static translate(x: number, y: number, z:number): Matrix4x4 {
            let m = new Matrix4x4();
            m.setData(1,4,x);
            m.setData(2,4,y);
            m.setData(3,4,z);
            return m;
        }

        public static translateVec3(vector: Vector3): Matrix4x4 {
            return Matrix4x4.translate(vector.x, vector.y, vector.z);
        } 

        public static rotateX(angle: number): Matrix4x4 {
            let s = Math.sin(Math.degToRad(angle));
            let c = Math.cos(Math.degToRad(angle));
            let m = new Matrix4x4();
            m.setData(2,2,c);
            m.setData(2,3,-s);
            m.setData(3,2,s);
            m.setData(3,3,c);
            return m;
        }

        public static rotateY(angle: number): Matrix4x4 {
            let s = Math.sin(Math.degToRad(angle));
            let c = Math.cos(Math.degToRad(angle));
            let m = new Matrix4x4();
            m.setData(1,1,c);
            m.setData(1,3,s);
            m.setData(3,1,-s);
            m.setData(3,3,c);
            return m;
        }

        public static rotateZ(angle: number): Matrix4x4 {
            let s = Math.sin(Math.degToRad(angle));
            let c = Math.cos(Math.degToRad(angle));
            let m = new Matrix4x4();
            m.setData(1,1,c);
            m.setData(1,2,-s);
            m.setData(2,1,s);
            m.setData(2,2,c);
            return m;
        }

        public static scale(x: number, y: number, z:number): Matrix4x4 {
            let m = new Matrix4x4();
            m.setData(1,1,x);
            m.setData(2,2,y);
            m.setData(3,3,z);
            return m;
        }

        public static scaleVec3(vector: Vector3): Matrix4x4 {
            return Matrix4x4.scale(vector.x, vector.y, vector.z);
        }

        public transpose(): Matrix4x4 {
            let m = new Matrix4x4();
            m._data[0] = this._data[0];
            m._data[1] = this._data[4];
            m._data[2] = this._data[8];
            m._data[3] = this._data[12];

            m._data[4] = this._data[1];
            m._data[5] = this._data[5];
            m._data[6] = this._data[9];
            m._data[7] = this._data[13];

            m._data[8] = this._data[2];
            m._data[9] = this._data[6];
            m._data[10] = this._data[10];
            m._data[11] = this._data[14];

            m._data[12] = this._data[3];
            m._data[13] = this._data[7];
            m._data[14] = this._data[11];
            m._data[15] = this._data[15];
            return m;
        }

        public static multiply(a: Matrix4x4, b: Matrix4x4): Matrix4x4 {
            let a0 = a.getRow(1);
            let a1 = a.getRow(2);
            let a2 = a.getRow(3);
            let a3 = a.getRow(4);
            let b0 = b.getColumn(1);
            let b1 = b.getColumn(2);
            let b2 = b.getColumn(3);
            let b3 = b.getColumn(4);

            let m = new Matrix4x4();
            m.setData(1, 1, Matrix4x4.multiplyRowColumn(a0, b0));
            m.setData(1, 2, Matrix4x4.multiplyRowColumn(a0, b1));
            m.setData(1, 3, Matrix4x4.multiplyRowColumn(a0, b2));
            m.setData(1, 4, Matrix4x4.multiplyRowColumn(a0, b3));

            m.setData(2, 1, Matrix4x4.multiplyRowColumn(a1, b0));
            m.setData(2, 2, Matrix4x4.multiplyRowColumn(a1, b1));
            m.setData(2, 3, Matrix4x4.multiplyRowColumn(a1, b2));
            m.setData(2, 4, Matrix4x4.multiplyRowColumn(a1, b3));

            m.setData(3, 1, Matrix4x4.multiplyRowColumn(a2, b0));
            m.setData(3, 2, Matrix4x4.multiplyRowColumn(a2, b1));
            m.setData(3, 3, Matrix4x4.multiplyRowColumn(a2, b2));
            m.setData(3, 4, Matrix4x4.multiplyRowColumn(a2, b3));

            m.setData(4, 1, Matrix4x4.multiplyRowColumn(a3, b0));
            m.setData(4, 2, Matrix4x4.multiplyRowColumn(a3, b1));
            m.setData(4, 3, Matrix4x4.multiplyRowColumn(a3, b2));
            m.setData(4, 4, Matrix4x4.multiplyRowColumn(a3, b3));
            return m;
        }

        private static multiplyRowColumn(row: number[], column: number[]): number {
            return row[0] * column[0] + row[1] * column[1] + row[2] * column[2] + row[3] * column[3];
        }
    }
}