import GLC from '../../GLCommander';
import Locations from './locations';

export default class Shader
{
    constructor()
    {
    }

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
    }

    use = () =>
    {
        GLC.useProgram(this.program);
    }

    prepareAttributes = () => {}


    getAttribLocation = (attrib) => GLC.getAttribLocation(this.program, attrib);
    enableVertexAttribArray = (attrib) => GLC.enableVertexAttribArray(attrib);
    pointToAttribute = (attrib, dimension) => GLC.pointToAttribute(attrib, dimension);
}