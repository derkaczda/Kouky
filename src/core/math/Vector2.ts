﻿namespace Kouky {

    export class Vector2 {

        private _x: number;
        private _y: number;

        public constructor(x: number = 0, y: number = 0) {
            this._x = x;
            this._y = y;
        }

        public get x(): number { return this._x; }
        public get y(): number { return this._y; }

        public set x(value: number) { this._x = value; }
        public set y(value: number) { this._y = value; }

        public static get zero(): Vector2 {
            return new Vector2();
        }

        public static get one(): Vector2 {
            return new Vector2(1.0, 1.0);
        }

        public toArray(): number[] {
            return [this._x, this._y];
        }

        public toFloat32Array(): Float32Array {
            return new Float32Array(this.toArray());
        }

        public copyFrom(vector: Vector2): void {
            this._x = vector.x;
            this._y = vector.y;
        }

        public setFromJson(json: any): void {
            if(json.x !== undefined) { this._x = Number(json.x); }
            if(json.y !== undefined) { this._y = Number(json.y); }
        }

        public add(v: Vector2): Vector2 {
            this._x += v._x;
            this._y += v._y;
            return this;
        }

        public subtract(v: Vector2): Vector2 {
            this._x -= v._x;
            this._y -= v._y;
            return this;
        }

        public multiply(v: Vector2): Vector2 {
            this._x *= v._x;
            this._y *= v._y;
            return this;
        }

        public divide(v: Vector2): Vector2 {
            this._x /= v._x;
            this._y /= v._y;
            return this;
        }

        public static distance(a: Vector2, b: Vector2): number {
            return Math.sqrt(Vector2.distanceSquared(a, b));
        }

        public static distanceSquared(a: Vector2, b: Vector2): number {
            let diff = a.subtract(b);
            return diff.x * diff.x + diff.y * diff.y;
        }

        public toString(): string {
            return `X: ${this._x}, Y: ${this._y}`;
        }
    
    }

}