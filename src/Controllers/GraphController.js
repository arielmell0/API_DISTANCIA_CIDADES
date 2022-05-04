import GraphModel from '../Models/GraphModel.js';

const GraphController = {};

GraphController.graphRegister = async (req, res) => {
    const { source, target, distance } = req.body;

    if(!source) return res.status(422).json({ message: 'Você precisa inserir um ponto de origem' });
    if(!target) return res.status(422).json({ message: 'Você precisa inserir um valor para o ponto de destino' });
    if(!distance) return res.status(422).json({ message: 'Você precisa inserir o valor da distância' })

    const graph = new GraphModel({
        data: [ { source, target, distance } ]
    });

    try {
        await graph.save();

        res.status(201).json({ message: 'Grafo criado com sucesso!' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Ops, ocorreu um erro no servidor' });
    }
}

GraphController.graphResponse = async (req, res) => {
    try {
        const graph = await GraphModel.find();

        res.status(200).json(graph);
    } catch (error) {
        res.status(500).json( { erro: error });
    }
};

GraphController.graphResponseById = async (req, res) => {
    const { id } = req.params;

    try {
        const graph = await GraphModel.findOne({ _id: id });

        if(!graph) {
            res.status(422).json({ message: 'Rota não foi encontrada' });
            return
        }

        res.status(200).json(graph)
    } catch (error) {
        res.status(500).json({ erro: error });
    }
};

GraphController.graphResponseAllRoutes = async (req, res) => {
    const { graphId, source, target } = req.body;
    const { maxStops } = req.params;

    
};

export default GraphController;