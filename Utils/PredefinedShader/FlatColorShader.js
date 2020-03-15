import Shader from '../../Render/Shader';

const vertexSrc = `
    attribute vec3 POSITION;

    uniform vec4 COLOR;

    varying vec4 vColor;

    void main(void)
    {
        vColor = COLOR;
        gl_Position = vec4(POSITION, 1.0);
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
    }

    
    prepareAttributes = () =>
    {
        this.enableVertexAttribArray(this.positionAttribute);
        this.pointToAttribute(this.positionAttribute, 3);

        //this.enableVertexAttribArray(this.colorAttribute);
        //this.pointToAttribute(this.colorAttribute, 4);
    }

    changeColor = (r, g, b, a) =>
    {
        this.changeUniformf4v(this.colorAttribute, r, g, b, a);
    }
};