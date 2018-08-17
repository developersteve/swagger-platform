import 'source-map-support/register';

import { createServer } from 'backend/createServer';
import { logger, overrideConsoleLogger, overrideUtilInspectStyle } from 'backend/logger';
import { config } from 'config';

import 'source-map-support/register';

async function run(port: number) {
  // Overriding logger used in non testing environments, logging in tests just go to stdout.
  overrideConsoleLogger(logger);
  overrideUtilInspectStyle();
  logger.info('Creating OpenAPI Platform server...');

  const app = await createServer();

  app.listen(port, (er, err) => {
    logger.info(`OpenAPI Platform Server now listening on port ${port}`);
  });

  return app;
}

const envPort: string | undefined = process.env.PORT;
const appPort: number = envPort ? Number.parseInt(envPort, 10) : config.backend.port;
run(appPort);
