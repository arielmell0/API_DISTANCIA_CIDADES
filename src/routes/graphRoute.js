import express from 'express';

import graphController from '../Controllers/GraphController.js';

const router = express.Router();

// Open Route - Public Route
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Conectado com sucesso a api' })
})

router.post('/graph', graphController.graphRegister);
router.get('/graph', graphController.graphResponse);
router.get('/graph/:id', graphController.graphResponseByID);

export default router;