import RedShader from '../PredefinedShader/RedShader';
import FlatColorShader from '../PredefinedShader/FlatColorShader';

export default class ShaderFactory
{
    static createRedShader = () => { return new RedShader(); }
    static createFlatColorShader = () => { return new FlatColorShader(); }
}
