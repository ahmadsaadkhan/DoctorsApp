import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import routes from './routes/routes.js';
import path from 'path';

dotenv.config();
const app = express();
app.use(express.json())
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
app.use(cookieParser());

// Define a route
app.use('/api', routes);
// Start the server
app.listen(PORT, () => console.log(`server started successfully on ${PORT}`));
app.get('/', (req, res) => {
    res.send(`Server running on port: ${PORT}`);
});