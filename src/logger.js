const logger = console;

const info = op => logger.info(op);

const debug = op => logger.log(op);

const warn = op => logger.warn(op);

const error = op => logger.error(op);

// define abbrev. for log msg
export default {
  info,
  debug,
  warn,
  error
};
