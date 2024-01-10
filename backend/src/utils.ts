import { Entry, EntryType, Gender, NewPatient } from './types';

const isString = (text: unknown): text is string => {
	return typeof text === 'string';
};

const parseString = (name: unknown): string => {
	if (!name || !isString(name)) {
		throw new Error('Incorrect or missing name');
	}
	return name;
};

const parseDate = (date: unknown): string => {
	if (!date || !isString(date) || !Date.parse(date)) {
		console.log(date);
		throw new Error('Incorrect or missing date');
	}
	return date;
};

const isGender = (param: string): param is Gender => {
	return Object.values(Gender)
		.map((v) => v.toString())
		.includes(param);
};

const parseGender = (gender: unknown): Gender => {
	if (!gender || !isString(gender) || !isGender(gender)) {
		throw new Error('Incorrect or missing gender');
	}
	return gender;
};

const parseEntries = (entries: Entry[]) => {
	const typeCheck = entries.filter((entry) => {
		return Object.values(EntryType)
			.map((v) => v.toString())
			.includes(entry.type);
	});

	if (typeCheck.length < 0) {
		throw new Error('Incorrect or missing type');
	}

	return entries;
};

const toNewPatient = (object: unknown): NewPatient => {
	if (!object || typeof object !== 'object') {
		throw new Error('Incorrect or missing data');
	}

	if (
		'name' in object &&
		'dateOfBirth' in object &&
		'ssn' in object &&
		'occupation' in object &&
		'gender' in object &&
		'entries' in object
	) {
		const newPatient: NewPatient = {
			name: parseString(object.name),
			dateOfBirth: parseDate(object.dateOfBirth),
			ssn: parseString(object.ssn),
			gender: parseGender(object.gender),
			occupation: parseString(object.occupation),
			entries: parseEntries(object.entries as Entry[]),
		};
		return newPatient;
	}

	throw new Error('Incorrect data: some fields are missing');
};

export default {
	toNewPatient,
};
