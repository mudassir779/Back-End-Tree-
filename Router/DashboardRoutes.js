import express from 'express'
import getData from '../Controller/DashboardController.js'

const router = express.Router()

router.get('/', getData);

export default router;