class GLCommander
{
    init = (gl) =>
    {
        this.gl = gl;
    }

    clear = (r, g, b, a) =>
    {
        this.gl.clearColor(r, g, b, a);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }

    viewport = () => this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    depthTest = (use) => use ? this.gl.enable(this.gl.DEPTH_TEST) : this.gl.disable(this.gl.DEPTH_TEST);

    createBuffer= () => this.gl.createBuffer();

    bindArrayBuffer = (buffer) => this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    unbindArrayBuffer = () => this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
    addArrayBufferData = (vertices) => this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);

    bindElementArrayBuffer = (buffer) => this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, buffer);
    unbindElementArrayBuffer = () => this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
    addElementArrayBufferData = (indices) => this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), this.gl.STATIC_DRAW);

    createVertexShader = () => this.gl.createShader(this.gl.VERTEX_SHADER);
    createFragmentShader = () => this.gl.createShader(this.gl.FRAGMENT_SHADER);

    addShaderSource = (shader, source) => this.gl.shaderSource(shader, source);
    compileShader = (shader) => this.gl.compileShader(shader);
    createShaderProgram = () => this.gl.createProgram();
    attachShaderToProgram = (program, shader) => this.gl.attachShader(program, shader);
    linkProgram = (program) => {
        this.gl.linkProgram(program);
        if ( !this.gl.getProgramParameter( program, this.gl.LINK_STATUS) ) {
            var info = this.gl.getProgramInfoLog(program);
            throw new Error('Could not compile WebGL program. \n\n' + info);
        }
    }
    useProgram = (program) => this.gl.useProgram(program);

    getAttribLocation = (program, attribute) => this.gl.getAttribLocation(program, attribute);
    getUniformLocation = (program, uniform) => this.gl.getUniformLocation(program, uniform);
    enableVertexAttribArray = (attribute) => this.gl.enableVertexAttribArray(attribute);
    pointToAttribute = (data, dimensions) => this.gl.vertexAttribPointer(data, dimensions, this.gl.FLOAT, false, 0, 0);

    uploadMatrix4fv = (location, matrix) => this.gl.uniformMatrix4fv(location, false, matrix);
    uniform4fv = (location, values) => this.gl.uniform4fv(location, values);

    drawTriangles = (numOfIndices) => this.gl.drawElements(this.gl.TRIANGLES, numOfIndices, this.gl.UNSIGNED_SHORT, 0);
}

const GLC = new GLCommander();
export default GLC;