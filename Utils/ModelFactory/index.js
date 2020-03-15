import TriangleModel from '../../Models/PredefinedModels/triangle';
import SquareModel from '../../Models/PredefinedModels/square'

export default class ModelFactory
{
    static createTriangleModel = () => { return new TriangleModel(); }
    static createSquareModel = () => { return new SquareModel(); }
}