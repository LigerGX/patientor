import { v4 as uuidv4 } from 'uuid';
import { NewPatient, PatientNonSensitive } from '../types';
import utils from '../utils';
import patientData from '../../data/patients';

const getSensitivePatients = (): PatientNonSensitive[] => {
	const data = patientData.map((patient) => {
		// use the toNewPatient function to validate the data
		const validPatient = utils.toNewPatient(patient);
		return { ...validPatient, id: patient.id };
	});

	return data.map(({ id, name, dateOfBirth, gender, occupation, entries }) => {
		return {
			id,
			name,
			dateOfBirth,
			gender,
			occupation,
			entries,
		};
	});
};

const getSinglePatient = (id: string): PatientNonSensitive => {
	const patient = patientData.find((patient) => patient.id === id);
	if (patient) {
		const validPatient = utils.toNewPatient(patient);
		return { ...validPatient, id: patient.id };
	}

	throw new Error(`Could not find patient. Id: ${id}`);
};

const addPatient = (object: NewPatient) => {
	const id = uuidv4();
	const newPatient = {
		id,
		...object,
	};
	patientData.push(newPatient);

	return newPatient;
};

export default {
	getSensitivePatients,
	getSinglePatient,
	addPatient,
};
