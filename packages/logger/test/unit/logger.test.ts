import { mockFunctions } from 'jest-mock-functions';
import { openapiLogger, overrideConsoleLogger } from '../../src';
const logger = openapiLogger();
const mockLogger: any = mockFunctions(logger, { recursive: true });

/**
 * Checks which logging methods in the custom logger were actually called
 */
function testLoggerCallCounts(callCounts) {
  Object.keys(mockLogger.levels).forEach(level => {
    const callCount = callCounts[level] ? callCounts[level] : 0;
    expect(mockLogger[level].mock.calls.length).toBe(callCount);
  });
}

/**
 * Will test if logging something through console.xxx will, in turn,
 * call the custom logger logging methods if you use overrideConsoleLogger
 */
function testConsoleInput(...input) {
  const stringifiedInput = input.map(i => JSON.stringify(i)).join();
  describe(`input = [${stringifiedInput}]`, () => {
    it(`logging to console.log`, () => {
      overrideConsoleLogger(mockLogger);
      // tslint:disable-next-line:no-console
      console.log(...input);
      testLoggerCallCounts({ verbose: 1 });
    });
    const loggingMethods = ['error', 'debug', 'info'];
    loggingMethods.forEach(loggingMethodName => {
      it(`logging to console.${loggingMethodName}}`, () => {
        overrideConsoleLogger(mockLogger);
        console[loggingMethodName](...input);
        testLoggerCallCounts({ [loggingMethodName]: 1 });
      });
    });
  });
}
// TODO: Might be nice if we test the actual stuff that ends up being logged too
describe('console logs to custom logger', () => {
  testConsoleInput(undefined);
  testConsoleInput('');
  testConsoleInput('a');
  testConsoleInput('Hello');
  testConsoleInput(['test']);
  testConsoleInput('this', 'is', 'a', 'test');
  testConsoleInput({ also: 'a', test: ':D' });
  testConsoleInput(0);
  testConsoleInput(() => {});
  testConsoleInput(/reaewr/g);
  testConsoleInput(new Error('message goes here'));
});
