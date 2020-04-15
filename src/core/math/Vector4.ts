namespace Kouky {

    export class Vector4 {

        private _x: number;
        private _y: number;
        private _z: number;
        private _w: number;

        public constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 0) {
            this._x = x; this._y = y;
            this._z = z; this._w = w;
        }

        public get x(): number { return this._x; }
        public get y(): number { return this._y; }
        public get z(): number { return this._z; }
        public get w(): number { return this._w; }

        public set x(value: number) { this._x = value; }
        public set y(value: number) { this._y = value; }
        public set z(value: number) { this._z = value; }
        public set w(value: number) { this._w = value; }

        public set(x?: number, y?: number, z?: number, w?: number): void {
            if(x !== undefined) { this._x = x; }
            if(y !== undefined) { this._y = y; }
            if(z !== undefined) { this._z = z; }
            if(w !== undefined) { this._w = w; }
        }

        public equals(v: Vector4): boolean {
            return(this._x === v.x && this._y === v.y && this._z === v.z && this._w === v.w);
        }

        public toArray(): number[] {
            return [this._x, this._y, this._z, this._w];
        }

        public toFloat32Array(): Float32Array {
            return new Float32Array(this.toArray());
        }

        public static get zero(): Vector4 {
            return new Vector4();
        }

        public static get one(): Vector4 {
            return new Vector4(1.0, 1.0, 1.0, 1.0);
        }

        public copyFrom(vector: Vector4): void {
            this._x = vector.x;
            this._y = vector.y;
            this._z = vector.z;
            this._w = vector.w;
        }

        public clone(): Vector4 {
            return new Vector4(this._x, this._y, this._z, this._w);
        }

        public setFromJson(json: any): void {
            if(json.x !== undefined) { this._x = Number(json.x); }
            if(json.y !== undefined) { this._y = Number(json.y); }
            if(json.z !== undefined) { this._z = Number(json.z); }
            if(json.w !== undefined) { this._w = Number(json.w); }
        }

        public add(v: Vector4): Vector4 {
            this._x += v._x;
            this._y += v._y;
            this._z += v._z;
            this._w += v._w;
            return this;
        }

        public subtract(v: Vector4): Vector4 {
            this._x -= v._x;
            this._y -= v._y;
            this._z -= v._z;
            this._w -= v._w;
            return this;
        }

        public multiply(v: Vector4): Vector4 {
            this._x *= v._x;
            this._y *= v._y;
            this._z *= v._z;
            this._w *= v._w;
            return this;
        }

        public divide(v: Vector4): Vector4 {
            this._x /= v._x;
            this._y /= v._y;
            this._z /= v._z;
            this._w /= v._w;
            return this;
        }

        public static distance(a: Vector4, b: Vector4): number {
            return Math.sqrt(Vector4.distanceSquared(a, b));
        }

        public static distanceSquared(a: Vector4, b: Vector4): number {
            let diff = a.subtract(b);
            return diff.x * diff.x + diff.y * diff.y + diff.z * diff.z + diff.w * diff.w;
        }

        public toString(): string {
            return `X: ${this._x}, Y: ${this._y}, Z: ${this._z}, W: ${this._w}`;
        }
    
    }

}