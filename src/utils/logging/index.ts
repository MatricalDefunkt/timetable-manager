/* eslint-disable @typescript-eslint/no-unused-vars */
import fs from "fs";

export type LogLevel = "INFO" | "ERROR" | "WARN" | "DEBUG";

/**
 * Logger class for logging messages to the console and log files.
 */
export default class Logger {
    private static _getFilePath = (logLevel: LogLevel) => {
        const basePath = "./logs/";
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        const fileName = `${year}-${month}-${day}-${logLevel}.log`;
        return basePath + fileName;
    };

    /**
     * Function to log messages to the console and to a log file at `./logs/`
     * @param message - The message to be logged.
     * @param logLevel - The log level of the message.
     * @param logToConsole - Whether to log the message to the console. Default is false.
     */
    static log = async (
        message: string,
        logLevel: LogLevel,
        logToConsole: boolean = false,
        path: string,
    ) => {
        if (process.platform === "win32") {
            path = path.replace(/\\/g, "/");
        }
        const srcPosition = path.split("/").indexOf("src");
        const srcPath = path
            .split("/")
            .slice(srcPosition + 1, path.length)
            .join("/");
        const messagePrefix = `[${new Date().toISOString()}] : ${srcPath} => `;
        switch (logLevel) {
            case "INFO": {
                if (Bun.env.NODE_ENV === "production") return;
                if (logToConsole) console.log(messagePrefix + message);
                break;
            }
            case "DEBUG": {
                if (Bun.env.NODE_ENV === "production") return;
                if (logToConsole) console.debug(messagePrefix + message);
                break;
            }
            case "ERROR": {
                if (logToConsole) console.error(messagePrefix + message);
                break;
            }
            case "WARN": {
                if (logToConsole) console.warn(messagePrefix + message);
                break;
            }
        }
        if (fs.existsSync(Logger._getFilePath(logLevel))) {
            fs.appendFileSync(Logger._getFilePath(logLevel), messagePrefix + message + "\n");
        } else {
            fs.existsSync("./logs") || fs.mkdirSync("./logs");
            fs.writeFileSync(Logger._getFilePath(logLevel), messagePrefix + message + "\n");
        }
    };
    /**
     * Custom function to meet the logging requirements of the sequelize library.
     * @param sqlString
     * @param timing
     */
    static sqlLog(sqlString: string, timing?: number) {
        Logger.log(`${sqlString}`, "DEBUG", true, "src/backend/database/sequelize.ts");
    }
}
