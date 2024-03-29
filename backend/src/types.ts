export interface Diagnosis {
	code: string;
	name: string;
	latin?: string;
}

export interface Patient {
	id: string;
	name: string;
	dateOfBirth: string;
	ssn: string;
	gender: Gender;
	occupation: string;
	entries: Entry[];
}

export enum Gender {
	Male = 'male',
	Female = 'female',
	Other = 'other',
}

export enum healthCheckRating {
	'Healthy' = 0,
	'LowRisk' = 1,
	'HighRisk' = 2,
	'CriticalRisk' = 3,
}

export enum EntryType {
	'HealthCheck' = 'HealthCheck',
	'OccupationalHealthcare' = 'OccupationalHealthcare',
	'Hospital' = 'Hospital',
}

interface BaseEntry {
	id: string;
	description: string;
	date: string;
	specialist: string;
	diagnosisCodes?: Array<Diagnosis['code']>;
}

interface HospitalEntry extends BaseEntry {
	type: 'Hospital';
	discharge: { date: string; criteria: string };
}

interface OccupationalHealthcareEntry extends BaseEntry {
	type: 'OccupationalHealthcare';
	employerName: string;
	sickLeave?: {
		startDate: string;
		endDate: string;
	};
}

interface HealthCheckEntry extends BaseEntry {
	type: 'HealthCheck';
	healthCheckRating: healthCheckRating;
}

export type Entry =
	| HospitalEntry
	| OccupationalHealthcareEntry
	| HealthCheckEntry;

export type NewPatient = Omit<Patient, 'id'>;
export type PatientNonSensitive = Omit<Patient, 'ssn' | 'entries'>;
