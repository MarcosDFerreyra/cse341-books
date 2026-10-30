import express from 'express';
import { getDb } from './src/db/connect.js';

const app = express()

app.use(express.json());

app.get('/', (req, res) => {
   return res.status(200).json({ message: 'Server is running' });
});

app.get("/trails", async (req, res) => {
   try {
      await getDb();
      const trails = await getDb().collection('trails').find().toArray();
      return res.status(200).json(trails);
   }
   catch (error) {
      console.log('Collection connection failed', error.message)
      res.status(500).json({message: 'Failed to retrieve trails'})
   }
});

export default app;