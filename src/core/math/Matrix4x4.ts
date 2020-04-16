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

        public setData(rowId: number, columnId: number, value: number): void {
            if(rowId > 4 || columnId > 4 || rowId < 1 || columnId < 1) {
                throw new Error("Matrix4x4::setData: rowId or columnId are greater 3. Please keep ids between 1 and 4");
            }

            this._data[(rowId-1) * 4 + (columnId-1)] = value;
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
    }
}