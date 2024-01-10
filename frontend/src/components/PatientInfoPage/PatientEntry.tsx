import { Entry } from '../../types';
import utils from '../../utils';

interface Props {
	entry: Entry;
}

const PatientEntry = ({ entry }: Props) => {
	switch (entry.type) {
		case 'Hospital':
			return (
				<div
					className="entry-container entry-container-hospital"
					key={entry.id}
				>
					<p>{entry.date}</p>
					<p className="font-italic font-fade">{entry.description}</p>
					<p className="font-fade">Discharge date: {entry.discharge.date}</p>
					<p className="font-fade">Criteria: {entry.discharge.criteria}</p>
					<ul>
						{entry.diagnosisCodes?.map((code) => (
							<li className="font-fade" key={code}>
								{code}
							</li>
						))}
					</ul>
					<p className="font-fade">Diagnosis by {entry.specialist}</p>
				</div>
			);
		case 'HealthCheck':
			return (
				<div
					className="entry-container entry-container-healthcheck"
					key={entry.id}
				>
					<p>{entry.date}</p>
					<p className="font-italic font-fade">{entry.description}</p>
					<p className="font-fade">
						Health check rating: {`${entry.healthCheckRating}`}
					</p>
					<ul>
						{entry.diagnosisCodes?.map((code) => (
							<li className="font-fade" key={code}>
								{code}
							</li>
						))}
					</ul>
					<p className="font-fade">Diagnosis by {entry.specialist}</p>
				</div>
			);
		case 'OccupationalHealthcare':
			return (
				<div
					className="entry-container entry-container-occupational"
					key={entry.id}
				>
					<p>{entry.date}</p>
					<p className="font-italic font-fade">{entry.description}</p>
					<p className="font-fade">Employer: {entry.employerName}</p>
					{entry.sickLeave && (
						<p className="font-fade">
							Sick leave: {entry.sickLeave.startDate} to{' '}
							{entry.sickLeave.endDate}
						</p>
					)}
					<ul>
						{entry.diagnosisCodes?.map((code) => (
							<li className="font-fade" key={code}>
								{code}
							</li>
						))}
					</ul>
					<p className="font-fade">Diagnosis by {entry.specialist}</p>
				</div>
			);
		default:
			return utils.assertNever(entry);
	}
};

export default PatientEntry;
