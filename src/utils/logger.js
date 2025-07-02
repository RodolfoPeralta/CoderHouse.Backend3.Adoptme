const winston = require("winston");
const dotenv = require("dotenv");
dotenv.config();

const environment = process.env.NODE_ENV || process.argv[2];

const options = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: "red",
        error: "magenta",
        warning: "yellow",
        info: "blue",
        http: "gray",
        debug: "white"
    }
};

winston.addColors(options.colors);

// Development logger

const devLogger = winston.createLogger({
    levels: options.levels,
    transports: [
        new winston.transports.Console({
            level: "debug",
            format: winston.format.combine(
                winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
                winston.format.colorize(),
                winston.format.printf(({ timestamp, level, message }) => {
                    return `${timestamp} | ${level}: ${message}`;
                })
            )
        }),
    ]
});

// Production logger

const prodLogger = winston.createLogger({
    levels: options.levels,
    transports: [
        new winston.transports.Console({
            level: "info",
            format: winston.format.combine(
                winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
                winston.format.colorize(),
                winston.format.printf(({ timestamp, level, message }) => {
                    return `${timestamp} | ${level}: ${message}`;
                })
            )
        }),

        new winston.transports.File({
            filename: "./errors.log",
            level: "error",
            format: winston.format.simple()
        })
    ]
});

// Test logger

const testLogger = winston.createLogger({
    levels: options.levels,
    transports: [
        new winston.transports.Console({
            level: "fatal",
            format: winston.format.combine(
                winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
                winston.format.colorize(),
                winston.format.printf(({ timestamp, level, message }) => {
                    return `${timestamp} | ${level}: ${message}`;
                })
            )
        }),

        new winston.transports.File({
            filename: "./errors.log",
            level: "error",
            format: winston.format.simple()
        })
    ]
});

const logger = () => {
    if(environment === "production") {
        return prodLogger;
    }
    if(environment === "development") {
        return devLogger;
    }
    if(environment === "test") {
        return testLogger;
    }
}

module.exports = logger();

