import { Router } from 'express';
import mockController from '../controllers/mocks.controller.js';

const router = Router();

router.get("/mockingusers", mockController.mockUsers);
router.get("/mockingpets", mockController.mockPets);
router.post("/generateData", mockController.generateData);

export default router;