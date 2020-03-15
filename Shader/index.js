import GLC from '../GLCommander';
import Locations from './locations';

export default class Shader
{
    addVertexShader = (vertexSource) =>
    {
        const vertexShader = GLC.createVertexShader();
        GLC.addShaderSource(vertexShader, vertexSource);
        GLC.compileShader(vertexShader);
        this.vertexShader = vertexShader;
    }

    addFragmentShader = (fragmentSource) =>
    {
        const fragmentShader = GLC.createFragmentShader();
        GLC.addShaderSource(fragmentShader, fragmentSource);
        GLC.compileShader(fragmentShader);
        this.fragmentShader = fragmentShader;
    }

    createAndLink = () =>
    {
        const program = GLC.createShaderProgram();
        GLC.attachShaderToProgram(program, this.vertexShader);
        GLC.attachShaderToProgram(program, this.fragmentShader);
        GLC.linkProgram(program);

        this.program = program;

        this.positionAttribute = GLC.getAttribLocation(program, Locations.POSITION);
    }

    use = () =>
    {
        GLC.useProgram(this.program);
    }

    enablePosition = () =>
    {
        GLC.enableVertexAttribArray(this.positionAttribute);
        GLC.pointToAttribute(this.positionAttribute, 3);
    }
}