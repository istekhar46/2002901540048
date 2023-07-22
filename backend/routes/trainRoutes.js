import express from 'express'
import { getTrains, registerUser, userAuth } from '../controller/trainController.js';
const router = express.Router()


router.post('/register', registerUser )
router.post('/auth', userAuth )
router.get('/trains', getTrains )




export default router ;