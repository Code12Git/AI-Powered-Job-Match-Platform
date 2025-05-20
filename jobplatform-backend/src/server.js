const express = require('express');
const { fromEnv } = require('./utils');
const { logger } = require('./utils');
const connectDB = require('./config/connection');  
const routes = require('./routes');
const cors = require('cors');

const app = express();


const PORT = fromEnv('PORT') || 3002;

connectDB().catch(err => {
  logger.error('Database connection failed', err);
  process.exit(1);
});

app.use(express.json());
app.use(cors());
app.use('/api/v1', routes); 


 app.get('/', (req, res) => {
  res.status(200).json({
    status: 'UP',
    timestamp: new Date().toISOString(),
    service: 'Your Service Name'
  });
});

app.listen(PORT, () => {
  logger.info(`🚀 Server running at PORT: ${PORT}`);
});