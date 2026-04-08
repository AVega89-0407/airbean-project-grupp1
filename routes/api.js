import { Router } from 'express';
import { requireApiKey } from "../middleware/requireApiKey.js";
import userRoutes from "./userRoutes.js";
import menuRoutes from "./menuRoutes.js";

import orderRoutes from "./orderRoutes.js";

const router = Router();

// Alla requests måste ha giltig API-nyckel
router.use(requireApiKey);
// Kopplar sub-routes till rätt path
router.use('/users', userRoutes);
router.use('/orders', orderRoutes);
router.use('/menu', menuRoutes);

export default router;