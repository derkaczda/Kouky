import GLC from '../../GLCommander';
import RedShader from '../../Shader/RedShader';

export default class ModelRenderer
{
    constructor()
    {
        this.shader = new RedShader();

        this.models = {};
    }

    registerNewModel = (model, id) =>
    {
        if(!this.models[id])
        {
            this.models[id] = {
                type: model,
                instances: [],
            }
        }
    }

    addInstance = (instance, id) =>
    {
        this.models[id].instances.push(instance);
    }

    preRender = () =>
    {
        GLC.viewport();
        GLC.depthTest(true);
    }

    render = () =>
    {
        this.preRender();
        this.shader.use();
        Object.keys(this.models).forEach(model => {
            this.models[model].type.use(this.shader);
            this.models[model].instances.forEach(instance => {
                GLC.drawTriangles(this.models[model].type.indices.length);
            })
        });
    }
}