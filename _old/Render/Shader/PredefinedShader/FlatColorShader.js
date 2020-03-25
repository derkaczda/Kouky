import Shader from '..';
import GLC from '../../../GLCommander';

const vertexSrc = `
    attribute vec3 POSITION;

    uniform vec4 COLOR;
    uniform mat4 TRANSFORMATION;

    varying vec4 vColor;

    void main(void)
    {
        vColor = COLOR;
        gl_Position = TRANSFORMATION * vec4(POSITION, 1.0);
    }
`;

const fragmentSrc = `
    precision mediump float;

    varying vec4 vColor;

    void main(void)
    {
        gl_FragColor = vColor;
    }
`;


export default class FlatColorShader extends Shader
{
    constructor()
    {
        super();

        this.addVertexShader(vertexSrc);
        this.addFragmentShader(fragmentSrc);
        this.createAndLink();

        
        this.positionAttribute = this.getAttribLocation('POSITION');
        this.colorAttribute = this.getUniformLocation('COLOR');
        this.transformationMatrix = this.getUniformLocation('TRANSFORMATION');
    }
    
    prepareAttributes = () =>
    {
        this.enableVertexAttribArray(this.positionAttribute);
        this.pointToAttribute(this.positionAttribute, 3);

        this.changeUniformf4v(this.colorAttribute, this.r, this.g, this.b, this.a);
    }

    changeColor = (r, g, b, a) =>
    {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
        //this.changeUniformf4v(this.colorAttribute, r, g, b, a);
    }

    enableTransformationMatrix = (matrix) =>
    {
        GLC.uploadMatrix4fv(this.transformationMatrix, matrix);
    }
};