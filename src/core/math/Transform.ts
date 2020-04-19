namespace Kouky {

    export class Transform {

        public position: Vector3 = Vector3.zero;
        public rotation: Vector3 = Vector3.zero;
        public scale: Vector3 = Vector3.one;

        public copyFrom(transform: Transform): void {
            this.position.copyFrom(transform.position);
            this.rotation.copyFrom(transform.rotation);
            this.scale.copyFrom(transform.scale);
        }

        public getTransformationMatrix(): Matrix4x4 {
            let transform = Matrix4x4.multiply(Matrix4x4.identity(), Matrix4x4.translateVec3(this.position));
            transform = Matrix4x4.multiply(transform, Matrix4x4.rotateVec3(this.rotation));
            transform = Matrix4x4.multiply(transform, Matrix4x4.scaleVec3(this.scale));
            return transform;
        }

        public setFromJson(json: any): void {
            if(json.position !== undefined) {
                this.position.setFromJson(json.position);
            }
            if(json.rotation !== undefined) {
                this.rotation.setFromJson(json.rotation);
            }
            if(json.scale !== undefined) {
                this.scale.setFromJson(json.scale);
            }
        }
    }
}