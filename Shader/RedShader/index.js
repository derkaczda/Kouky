import Locations from '../locations';
import Shader from '../';

const vertexSrc = `
    attribute vec3 ${Locations.POSITION};
    void main(void)
    {
        gl_Position = vec4(${Locations.POSITION}, 1.0);
    }
`;

const fragmentSrc = `
    void main(void)
    {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
`;


export default class RedShader
{
    constructor()
    {
        this.shader = new Shader();
        this.shader.addVertexShader(vertexSrc);
        this.shader.addFragmentShader(fragmentSrc);
        this.shader.createAndLink();
    }

    use = () =>
    {
        this.shader.use();
    }

    enablePosition = () =>
    {
        this.shader.enablePosition();
    }
};