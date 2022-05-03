import GraphModel from '../Models/GraphModel.js';

const graphController = {};

graphController.graphRegister = async (req, res) => {
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

export default graphController;