export default class Vector3
{
    constructor(x, y, z)
    {
        this._x = x;
        this._y = y;
        this._z = z;
    }

    x = () => { return this._x; }
    y = () => { return this._y; }
    z = () => { return this._z; }
}