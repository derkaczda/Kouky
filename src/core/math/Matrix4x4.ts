﻿namespace Kouky {

    export class Matrix4x4 {

        private _data: number[] = [];

        private constructor() {
            this._data = [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ];
        }

        public get data(): number[] {
            return this._data;
        }

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

        public static identity(): Matrix4x4 {
            return new Matrix4x4();
        }

        public copyFrom(matrix: Matrix4x4): void {
            for (let i = 0; i < 16; i++) {
                this._data[i] = matrix._data[i];
            }
        }

        public static orthographic(left: number, right: number, bottom: number,
            top: number, nearClip: number, farClip: number): Matrix4x4 {
            let m = new Matrix4x4();

            let lr: number = 1.0 / (left - right);
            let bt: number = 1.0 / (bottom - top);
            let nf: number = 1.0 / (nearClip - farClip);

            /*
             *  -2.0 * lr       ,       0            ,           0              , 0,
             *       0          ,    -2.0 * bt       ,           0              , 0,
             *       0          ,       0            ,       2.0 * nf           , 0,
             * (left + top) * lr, (top + bottom) * bt, (farClip + nearClip) * nf, 1
             * 
             * */

            m._data[0] = -2.0 * lr;
            m._data[5] = -2.0 * bt;
            m._data[10] = 2.0 * nf;
            m._data[12] = (left + right) * lr;
            m._data[13] = (top + bottom) * bt;
            m._data[14] = (farClip + nearClip) * nf; 

            return m;
        }
        
        public static perspective(left: number, right: number, bottom: number,
            top: number, nearClip: number, farClip: number): Matrix4x4 {

            /*
             *   2n / (r-l)     ,       0            ,      (r+l)/(r-l)         , 0,
             *       0          ,    2n / (t-b)      ,      (t+b)/(t-b)         , 0,
             *       0          ,       0            ,     -(f+n)/(f-n)         , -2fn/(f-n),
             *       0          ,       0            ,          -1              , 0
             * 
             * */

            let m = new Matrix4x4();
            m._data[0] = 2.0 / (right - left);
            m._data[2] = (1.0/nearClip) * ((right + left) / (right - left));
            m._data[5] = 2.0 / (top - bottom);
            m._data[6] = (1/ nearClip) * ((top + bottom) / (top - bottom));
            m._data[10] = -(1/ nearClip) * ((farClip + nearClip)/ (farClip - nearClip));
            m._data[11] = -2*farClip / (farClip - nearClip);
            m._data[14] = -1/nearClip;
            m._data[15] = 0;
            return m;
        }

        public static translation(position: Vector3): Matrix4x4 {
            let m = new Matrix4x4();

            /*
             *       1          ,       0            ,           0              , 0,
             *       0          ,       1            ,           0              , 0,
             *       0          ,       0            ,           1              , 0,
             *       x          ,       y            ,           z              , 1
             *
             * */

            m._data[12] = position.x;
            m._data[13] = position.y;
            m._data[14] = position.z;

            return m;
        }

        public static rotationX(angleInRadians: number): Matrix4x4 {
            let m = new Matrix4x4();

            /*
             *       1          ,       0            ,           0              , 0,
             *       0          ,  cos(angleRadians) ,  sin(angleRadians)       , 0,
             *       0          , -sin(angleRadians) ,  cos(angleRadians)       , 0,
             *       0          ,       0            ,           0              , 1
             *
             * */

            let c = Math.cos(angleInRadians);
            let s = Math.sin(angleInRadians);

            m._data[5] = c;
            m._data[6] = s;
            m._data[9] = -s;
            m._data[10] = c;

            return m;
        }

        public static rotationY(angleInRadians: number): Matrix4x4 {
            let m = new Matrix4x4();

            /*
             * cos(angleRadians),       0            , -sin(angleRadians)       , 0,
             *       0          ,       1            ,           0              , 0,
             *       0          ,  sin(angleRadians) ,  cos(angleRadians)       , 0,
             *       0          ,       0            ,           0              , 1
             *
             * */

            let c = Math.cos(angleInRadians);
            let s = Math.sin(angleInRadians);

            m._data[0] = c;
            m._data[2] = -s;
            m._data[8] = s;
            m._data[10] = c;

            return m;
        }

        public static rotationZ(angleInRadians: number): Matrix4x4 {
            let m = new Matrix4x4();

            /*
             * cos(angleRadians),  sin(angleRadians) ,           0              , 0,
             *-sin(angleRadians),  cos(angleRadians) ,           0              , 0,
             *       0          ,       0            ,           1              , 0,
             *       0          ,       0            ,           0              , 1
             *
             * */

            let c = Math.cos(angleInRadians);
            let s = Math.sin(angleInRadians);

            m._data[0] = c;
            m._data[1] = s;
            m._data[4] = -s;
            m._data[5] = c;
            
            return m;
        }

        public static rotationXYZ(x: number, y: number, z: number): Matrix4x4 {
            let rx = Matrix4x4.rotationX(x);
            let ry = Matrix4x4.rotationY(y);
            let rz = Matrix4x4.rotationZ(z);

            // ZYX
            return Matrix4x4.multiply(Matrix4x4.multiply(rz, ry), rx);
        }

        public static scale(scale: Vector3): Matrix4x4 {
            let m = new Matrix4x4();

            /*
             *       x          ,       0            ,           0              , 0,
             *       0          ,       y            ,           0              , 0,
             *       0          ,       0            ,           z              , 0,
             *       0          ,       0            ,           0              , 1
             *
             * */
            m._data[0] = scale.x;
            m._data[5] = scale.y;
            m._data[10] = scale.z;

            return m;
        }

        public static multiply(a: Matrix4x4, b: Matrix4x4): Matrix4x4 {
            let m = new Matrix4x4();

            let b00 = b._data[0 * 4 + 0];
            let b01 = b._data[0 * 4 + 1];
            let b02 = b._data[0 * 4 + 2];
            let b03 = b._data[0 * 4 + 3];
            let b10 = b._data[1 * 4 + 0];
            let b11 = b._data[1 * 4 + 1];
            let b12 = b._data[1 * 4 + 2];
            let b13 = b._data[1 * 4 + 3];
            let b20 = b._data[2 * 4 + 0];
            let b21 = b._data[2 * 4 + 1];
            let b22 = b._data[2 * 4 + 2];
            let b23 = b._data[2 * 4 + 3];
            let b30 = b._data[3 * 4 + 0];
            let b31 = b._data[3 * 4 + 1];
            let b32 = b._data[3 * 4 + 2];
            let b33 = b._data[3 * 4 + 3];
            let a00 = a._data[0 * 4 + 0];
            let a01 = a._data[0 * 4 + 1];
            let a02 = a._data[0 * 4 + 2];
            let a03 = a._data[0 * 4 + 3];
            let a10 = a._data[1 * 4 + 0];
            let a11 = a._data[1 * 4 + 1];
            let a12 = a._data[1 * 4 + 2];
            let a13 = a._data[1 * 4 + 3];
            let a20 = a._data[2 * 4 + 0];
            let a21 = a._data[2 * 4 + 1];
            let a22 = a._data[2 * 4 + 2];
            let a23 = a._data[2 * 4 + 3];
            let a30 = a._data[3 * 4 + 0];
            let a31 = a._data[3 * 4 + 1];
            let a32 = a._data[3 * 4 + 2];
            let a33 = a._data[3 * 4 + 3];

            m._data[0] = b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30;
            m._data[1] = b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31;
            m._data[2] = b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32;
            m._data[3] = b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33;
            m._data[4] = b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30;
            m._data[5] = b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31;
            m._data[6] = b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32;
            m._data[7] = b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33;
            m._data[8] = b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30;
            m._data[9] = b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31;
            m._data[10] = b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32;
            m._data[11] = b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33;
            m._data[12] = b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30;
            m._data[13] = b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31;
            m._data[14] = b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32;
            m._data[15] = b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33;

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