namespace Kouky {
    export class Color {
        private _color: Vector4 = Vector4.zero;

        public static white(): Color { return new Color(255, 255, 255, 255); }
        public static black(): Color { return new Color(0, 0, 0, 255); }
        public static red(): Color { return new Color(255, 0, 0, 255); }
        public static green(): Color { return new Color(0, 255, 0, 255); }
        public static blue(): Color { return new Color(0, 0, 255, 255); }

        public constructor(r: number = 255, g: number = 255, b: number = 255, a: number = 255) {
            this._color.set(r, g, b, a);
        }

        public get r(): number { return this._color.x; }
        public get g(): number { return this._color.y; }
        public get b(): number { return this._color.z; }
        public get a(): number { return this._color.w; }

        public get rFloat(): number { return this._color.x / 255.0; }
        public get gFloat(): number { return this._color.y / 255.0; }
        public get bFloat(): number { return this._color.z / 255.0; }
        public get aFloat(): number { return this._color.w / 255.0; }

        public set r(value: number) { this._color.x = value; }
        public set g(value: number) { this._color.y = value; }
        public set b(value: number) { this._color.z = value; }
        public set a(value: number) { this._color.w = value; }

        public toFloatArray(): number[] { return [this.rFloat, this.gFloat, this.bFloat, this.aFloat]; }
        public toArray(): number[] { return this._color.toArray(); }
        public toFloat32Array(): Float32Array { return new Float32Array(this.toFloatArray()); }
        public copyFrom(color: Color): void {
            this._color.set(color.r, color.g, color.b, color.a);
        }
        public toString(): string {
            return `R: ${this._color.x}, G: ${this._color.y}, B: ${this._color.z}, A: ${this._color.w}`;
        }
    
        public static fromFloat(r: number, g: number, b: number, a: number): Color {
            return new Color(r * 255.0, g * 255.0, b * 255.0, a * 255.0);
        }

        public static fromValues(r: number, g: number, b: number, a: number): Color {
            return new Color(r, g, b, a);
        }
    }
}