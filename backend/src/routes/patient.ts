import express from 'express';
import patientService from '../services/patientService';
import utils from '../utils';
const router = express.Router();

router.get('/', (_req, res) => {
	res.json(patientService.getSensitivePatients());
});

router.get('/:id', (req, res) => {
	const id = req.params.id;
	res.json(patientService.getSinglePatient(id));
});

router.post('/', (req, res) => {
	try {
		const newPatient = utils.toNewPatient(req.body);
		const patientData = patientService.addPatient(newPatient);
		res.json(patientData);
	} catch (error) {
		if (error instanceof Error) {
			console.log(error);
			res.status(400).json({ error: error.message });
		}
	}
});

export default router;
