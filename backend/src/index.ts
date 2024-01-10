import express from 'express';
import cors from 'cors';
import diagnosisRouter from './routes/diagnosis';
import patientRouter from './routes/patient';
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/ping', (_req, res) => {
	res.json({ message: 'pong' });
});

app.use('/api/diagnosis', diagnosisRouter);
app.use('/api/patients', patientRouter);

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
