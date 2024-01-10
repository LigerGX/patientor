import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import patientService from '../../services/patients';
import { Patient } from '../../types';
import PatientEntry from './PatientEntry';

const PatientInfoPage = () => {
	const [patient, setPatient] = useState<Patient | null>(null);
	const id = useParams().id;

	useEffect(() => {
		if (id) {
			patientService.getSingle(id).then((res) => {
				setPatient(res.data);
			});
		}
	}, [id]);

	if (patient) {
		return (
			<div className="patientinfo-container">
				<h2>{patient.name}</h2>
				<div>
					<p>Gender: {patient.gender}</p>
					<p>Date of birth: {patient.dateOfBirth}</p>
					<p>ssn: {patient.ssn}</p>
					<p>Occupation: {patient.occupation}</p>
				</div>
				<div className="entries-container">
					<h3>Entries</h3>
					{patient.entries.map((entry) => {
						return <PatientEntry entry={entry} key={entry.id} />;
					})}
					{patient.entries.length === 0 && <p>No entries found</p>}
				</div>
			</div>
		);
	}

	return (
		<div>
			<p>Loading...</p>
		</div>
	);
};

export default PatientInfoPage;
