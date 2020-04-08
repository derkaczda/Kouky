namespace Kouky {
    export class Shader {
        private _vertexSource: ShaderSource;
        private _fragmentSource: ShaderSource;
        private _program: WebGLProgram;

        public constructor(vertexSrc: string, fragmentSrc: string) {
            this._vertexSource = new ShaderSource(ShaderSourceType.VERTEX, vertexSrc);
            this._fragmentSource = new ShaderSource(ShaderSourceType.FRAGMENT, fragmentSrc);

            this._program = WebGLContext.createShaderProgram();
        }

        public build(): void {
            this._vertexSource.compile();
            this._fragmentSource.compile();

            this.attachShaderSource(this._vertexSource);
            this.attachShaderSource(this._fragmentSource);

            WebGLContext.linkProgram(this._program);
        }

        public use(): void {
            WebGLContext.useProgram(this._program);
        }

        public enableVertexAttribute(attribName: string): void {
            let location = this.getVertexAttributeLocation(attribName);
            WebGLContext.enableVertexAttribArray(location);
            WebGLContext.vertexAttribPointer(location, 3, WebGLContext.gl.FLOAT, false, 0, 0);
        }

        public getVertexAttributeLocation(attribName: string): number {
            return WebGLContext.getAttributLocation(this._program, attribName);
        }

        private attachShaderSource(shaderSource: ShaderSource): void {
            WebGLContext.attachShader(this._program, shaderSource.shader);
        }
    }
}