import ModelType from '../ModelType';

export default class TriangleModel extends ModelType
{
    constructor()
    {
        const vertices = 
        [
            0.0, 0.5, 0.0,
            -0.5, -0.5, 0.0,
            0.5, -0.5, 0.0
        ];
    
        const indices =
        [
            0, 1, 2
        ];
    
        super(vertices, indices);
    }
}