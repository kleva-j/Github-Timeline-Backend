import { Router } from 'express';

import AuthRoute from './auth';

const router = Router().use(AuthRoute);

export default router;
