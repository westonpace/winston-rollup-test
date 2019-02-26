const winston = require('winston');

const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.simple(),
    transports: [
        new winston.transports.Console({
	    format: winston.format.combine(
		winston.format.colorize(),
		winston.format.timestamp(),
		winston.format.simple())
	})
    ]
});

logger.info('Hello World');

