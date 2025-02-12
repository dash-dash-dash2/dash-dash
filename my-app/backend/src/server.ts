import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic test route
app.get('/', (req, res) => {
	res.json({ message: 'Welcome to DishDash API' });
});

// Start server
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});