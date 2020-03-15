import ModelType from '../ModelType';

export default class SquareModel extends ModelType
{
    constructor()
    {
        const vertices = 
        [
            -0.5, -0.5, 0.0,
			 0.5, -0.5, 0.0,
			 0.5,  0.5, 0.0, 
			-0.5,  0.5, 0.0,
        ];
    
        const indices =
        [
            0, 1, 2,
			2, 3, 0
        ];
    
        super(vertices, indices);
    }
}