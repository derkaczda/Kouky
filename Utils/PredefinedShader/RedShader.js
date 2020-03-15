import Shader from '../../Render/Shader';

const vertexSrc = `
    attribute vec3 POSITION;
    void main(void)
    {
        gl_Position = vec4(POSITION, 1.0);
    }
`;

const fragmentSrc = `
    void main(void)
    {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
`;


export default class RedShader extends Shader
{
    constructor()
    {
        super();

        this.addVertexShader(vertexSrc);
        this.addFragmentShader(fragmentSrc);
        this.createAndLink();

        
        this.positionAttribute = this.getAttribLocation('POSITION');
    }

    
    prepareAttributes = () =>
    {
        this.enableVertexAttribArray(this.positionAttribute);
        this.pointToAttribute(this.positionAttribute, 3);
    }
};