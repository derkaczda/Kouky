import GLC from '../../GLCommander';
import ShaderFactory from '../../Utils/ShaderFactory';

export default class ModelRenderer
{
    constructor()
    {
        this.shader = ShaderFactory.createFlatColorShader();

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
        this.shader.changeColor(0.0, 0.0, 1.0, 1.0);
        Object.keys(this.models).forEach(model => {
            this.models[model].type.use(this.shader);
            this.models[model].instances.forEach(instance => {
                GLC.drawTriangles(this.models[model].type.indices.length);
            })
        });
    }
}