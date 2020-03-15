import RedShader from '../../Render/Shader/PredefinedShader/RedShader';
import FlatColorShader from '../../Render/Shader/PredefinedShader/FlatColorShader';

export default class ShaderFactory
{
    static createRedShader = () => { return new RedShader(); }
    static createFlatColorShader = () => { return new FlatColorShader(); }
}
