import { Router } from 'express';
import { getEnums } from './enums.controller';

const router = Router();

// Rota para buscar todos os enums
router.get('/', getEnums);

// Rota para buscar um enum específico
router.get('/:type', getEnums);

export default router; 