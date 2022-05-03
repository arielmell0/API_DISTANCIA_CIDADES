import express from 'express';

import GraphController from '../Controllers/GraphController.js';

const router = express.Router();

// Open Route - Public Route
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Conectado com sucesso a api' })
})

router.post('/graph', GraphController.graphRegister);
router.get('/graph', GraphController.graphResponse);
router.get('/graph/:id', GraphController.graphResponseById);

export default router;