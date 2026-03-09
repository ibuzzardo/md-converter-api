import { app } from './app';
import { env } from './config/env';

const startServer = async (): Promise<void> => {
  try {
    app.listen(env.port, () => {
      console.log(`Server listening on port ${env.port}`);
    });
  } catch (error: unknown) {
    console.error('Failed to start server', error);
    process.exit(1);
  }
};

void startServer();
