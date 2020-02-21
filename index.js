import GLC from './GLCommander';
import Vector3 from './math/Vector3'

export default class Kouky
{
    init = (canvas_id) =>
    {
        const canvas = document.querySelector(`#${canvas_id}`);

        if(!canvas)
        {
            return;
        }

        const gl = canvas.getContext('webgl');
        if(!gl)
        {
            return;
        }

        this.clear_color = new Vector3(1.0, 0.0, 0.0);

        GLC.init(gl);
    }

    clearColor = () =>
    {
        GLC.clear(
            this.clear_color.x(),
            this.clear_color.y(),
            this.clear_color.z(), 
            1.0
        );
    }

    setClearColorVec3 = (color_vector) =>
    {
        this.clear_color = color_vector;
    }
}