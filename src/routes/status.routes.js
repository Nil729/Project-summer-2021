import {Router} from 'express';
import * as statusContorler from '../Controlers/stauts.Controler';
const router = Router()

router.get('/list', statusContorler.findAllUser_status);
router.post('/list', statusContorler.PostUser_status);

export default router;