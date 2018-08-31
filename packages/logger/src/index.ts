import colors from 'colors';
import moment from 'moment';
import util from 'util';
import { createLogger, format, transports } from 'winston';

const logLevel: string = process.env.LOG_LEVEL || 'debug';

const openapiPlatformErrors = format(info => {
  if (info instanceof Error) {
    /*
      TODO: Winston 3.0.0 removes .message for errors for some reason. 
      Using a workaround found here: https://github.com/winstonjs/winston/issues/1243 to preserve the message
    */

    if (info.stack) {
      info.errorMessage = info.stack;
    } else {
      info.errorMessage = info.message;
    }
  }
  return info;
});

const openapiPlatformObjects = format((info, options) => {
  // TODO: Remove the any type when winston types gets fixed
  const message: any = info.message;
  if (
    !(info instanceof Error) &&
    (message instanceof Object || Array.isArray(info.message))
  ) {
    info.message = util.inspect(info.message, { colors: options.colors });
  }
  return info;
});

// Adds a timestamp to the logger information
const openapiPlatformTimestamp = format(info => {
  info.timestamp = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
  return info;
});

// Aligns all the information before the message section of the log
const openapiPlatformAlign = format(info => {
  const messageIndentation = 9;
  info.levelPadding = ' '.repeat(messageIndentation - info.level.length);
  return info;
});

// Colorizes/formats javascript objects and timestamps
const openapiPlatformColorize = format(info => {
  info.timestamp = colors.gray(info.timestamp);
  return info;
});

// Specifies the order in which all the information is printed out
const openapiPlatformPrinter = format.printf(info => {
  const timestamp = info.timestamp ? `${info.timestamp} ` : '';
  return `${timestamp}${info.level}${info.levelPadding ? info.levelPadding : ' '}${
    info.errorMessage ? info.errorMessage : info.message
  }`;
});

export interface LoggerOptions {
  // True if you want timestamps added to your logged output
  timestamp?: boolean;
  // True if you want to log to the console
  useConsole?: boolean;
  // Only errors will be logged here
  errorLogPath?: string;
  // Anything logged writes to here
  logPath?: string;
}

export function openapiLogger(options: LoggerOptions = {}) {
  const {
    timestamp = true,
    useConsole = true,
    errorLogPath = 'openapi-platform.error.log',
    logPath = 'openapi-platform.log',
  } = options;
  const formatters = [format.splat()];
  if (timestamp) {
    formatters.push(openapiPlatformTimestamp());
  }
  formatters.push(openapiPlatformErrors(), openapiPlatformAlign());

  const transporters: any[] = [];
  if (useConsole) {
    transporters.push(
      new transports.Console({
        level: logLevel,
        format: format.combine(
          format.colorize(),
          openapiPlatformColorize(),
          openapiPlatformObjects({ colors: true }),
          openapiPlatformPrinter,
        ),
      }),
    );
  }
  if (logPath) {
    // Note that we don't want color codes in our file logs (looks incredibly confusing and ugly)
    transporters.push(
      new transports.File({
        filename: logPath,
        level: logLevel,
        format: format.combine(
          openapiPlatformObjects({ colors: false }),
          openapiPlatformPrinter,
        ),
      }),
    );
  }
  if (errorLogPath) {
    transporters.push(
      new transports.File({
        filename: errorLogPath,
        level: 'error',
        format: format.combine(
          openapiPlatformObjects({ colors: false }),
          openapiPlatformPrinter,
        ),
      }),
    );
  }
  const logger = createLogger({
    format: format.combine(...formatters),
    transports: transporters,
  });
  return logger;
}

/**
 * Replaces the console.log type methods with our own logger methods.
 * It's not recommended to use console methods to print. Use the logger variable itself to log messages.
 * However, this method is useful when external packages have console.log(...) calls inside of them.
 */
export function overrideConsoleLogger(aLogger) {
  // Since we're using splat we have to create placeholders for the arguments to go into
  // TODO: Note that string interpolation with console.log won't work (E.g. console.log("%s", "test") will print "%stest")
  const createPlaceholders = args => new Array(args.length).fill('%s').join(' ');
  Object.keys(aLogger.levels).forEach(level => {
    console[level] = (...args) => aLogger[level](createPlaceholders(args), ...args);
  });
  // tslint:disable-next-line:no-console
  console.log = (...args) => aLogger.verbose(createPlaceholders(args), ...args);
}

/**
 * Restyles the util.inspect() method output.
 */
export function overrideUtilInspectStyle() {
  // We want field names to be yellow when logging JavaScript objects
  util.inspect.styles.name = 'yellow';
}
