namespace Kouky {
    export enum ShaderSourceType {
        VERTEX,
        FRAGMENT
    }

    export class ShaderSource {
        private _source: string;
        private _type: ShaderSourceType;
        private _shader: WebGLShader;

        public constructor(type: ShaderSourceType, src: string) {
            this._source = src;
            this._type = type;

            let glType: number = 0;
            switch(type) {
                case ShaderSourceType.VERTEX:
                    glType = WebGLContext.gl.VERTEX_SHADER;
                    break;
                case ShaderSourceType.FRAGMENT:
                    glType = WebGLContext.gl.FRAGMENT_SHADER;
                    break;
            }

            this._shader = WebGLContext.createShader(glType);
            WebGLContext.shaderSource(this._shader, this._source);
        }

        public get shader(): WebGLShader { return this._shader; }

        public compile(): void {
            WebGLContext.compileShader(this._shader);
        }
    }
}