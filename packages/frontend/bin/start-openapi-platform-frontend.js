#!/usr/bin/env node
require('source-map-support/register');

const { build, serve } = require('../lib/index');
const { logger } = require('../lib/logger');

// TODO: path needs to be configurable via arguments
build()
  .then(serve)
  .then(port => {
    logger.info(`Serving frontend on port ${port}`);
  })
  .catch(err => {
    // TODO: Could probably be more descriptive
    logger.error('Something went wrong...');
    logger.error(err);
  });
