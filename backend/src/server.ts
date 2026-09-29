import app from './app';
import { connectDB } from './config/db';
import dotenv from 'dotenv';

dotenv.config();

const PORT = Number(process.env.PORT) || 5000;

const startServer = async () => {
  try {
    // Attempt database connection
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log('====================================================');
      console.log(`🚀 WareIQ REST API Engine running on http://localhost:${PORT}`);
      console.log(`📡 Health check available at: http://localhost:${PORT}/health`);
      console.log(`🛡️  Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log('====================================================');
    });

    const shutdown = () => {
      console.log('Closing HTTP server & releasing connections...');
      server.close(() => {
        console.log('Server gracefully terminated.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  } catch (error) {
    console.error('Fatal error starting WareIQ server:', error);
    process.exit(1);
  }
};

startServer();
