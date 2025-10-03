import express from 'express'
import { addRequest, deleteRequest, getRequests, updateRequest } from '../Controller/RequestController.js';
import { upload } from '../MiddleWares/Multer.js';

const router = express.Router()

router.post('/add-request', upload.array('Images', 4),addRequest);
router.get('/get-requests', getRequests);
router.delete('/delete-request/:id', deleteRequest);
router.put('/update-request/:id', updateRequest);


export default router;