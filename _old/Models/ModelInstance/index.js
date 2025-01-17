import {createTransformationMatrix} from '../../Utils/maths';

export default class ModelInstance
{
    constructor(x, y, z, rx, ry, rz, scale)
    {
        this.x = x;
        this.y = y;
        this.z = z;
        this.rx = rx;
        this.ry = ry;
        this.rz = rz;
        this.scale = scale;
    }

    getX = () => this.x;
    getY = () => this.y;
    getZ = () => this.z;
    getRX = () => this.rx;
    getRY = () => this.ry;
    getRZ = () => this.rz;
    getScale = () => this.scale;

    setX = (x) => { this.x = x; this.updateTransformationMatrix(); }
    setY = (y) => { this.y = y; this.updateTransformationMatrix(); }
    setZ = (z) => { this.z = z; this.updateTransformationMatrix(); }
    setRX = (rx) => { this.rx = rx; this.updateTransformationMatrix(); }
    setRY = (ry) => { this.ry = ry; this.updateTransformationMatrix(); }
    setRZ = (rz) => { this.rz = rz; this.updateTransformationMatrix(); }
    setScale = (scale) => { this.scale = scale; this.updateTransformationMatrix(); }

    setPosition = (position) => { this.x = position.x(); this.y = position.y(); this.z = position.z(); this.updateTransformationMatrix(); }

    updateRotation = (rx, ry, rz) =>
    {
        this.rx += rx;
        this.ry += ry;
        this.rz += rz;
        this.updateTransformationMatrix();
    }

    updateTransformationMatrix = () =>
    {
        this.transformationMatrix = createTransformationMatrix(this.x, this.y, this.z, this.rx, this.ry, this.rz, this.scale);
    }

    getTransformationMatrix = () => this.transformationMatrix;
}