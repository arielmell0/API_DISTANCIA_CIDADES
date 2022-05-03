import express from 'express';

import graphController from '../Controllers/GraphController.js';

const router = express.Router();

// Open Route - Public Route
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Conectado com sucesso a api' })
})

router.post('/graph', graphController.graphRegister);

export default router;