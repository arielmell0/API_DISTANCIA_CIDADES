import { Router as router } from 'express';

router.post('/graph', graphController.graphCreate);

export default router;