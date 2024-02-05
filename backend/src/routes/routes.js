import express from 'express';

import {
    getAllPatients,
    getAllDiseases,
    getAllDoctors,
    saveOrUpdatePatient,
    getPatient,
    deletePatient,
    getAllVisits,
    getVisit,
    saveVisit,
    deleteVisit
} from '../controller/MainController.js';


const router = express.Router();

router.post('/patients', getAllPatients);
router.get('/diseases', getAllDiseases);
router.get('/doctors', getAllDoctors);
router.post('/save-patient', saveOrUpdatePatient);
router.get('/get-patient/:id', getPatient);
router.delete('/delete-patient/:id', deletePatient);
router.get('/visits/:id', getAllVisits);
router.post('/save-visit', saveVisit);
router.get('/get-visit/:id', getVisit);
router.delete('/delete-visit/:id', deleteVisit);



export default router;