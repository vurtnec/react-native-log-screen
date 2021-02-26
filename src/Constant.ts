interface LogLevel {
    DEBUG: string;
    INFO: string;
    WARN: string;
    ERROR: string;
    PERF: string;
    LOG: string;
}

interface COLOR {
    DEBUG: string;
    INFO: string;
    WARN: string;
    ERROR: string;
    PERF: string;
    LOG: string;
}


class Constant {
    public static LOG_LEVEL: LogLevel = {
        DEBUG: "DEBUG",
        INFO: "INFO",
        WARN: "WARN",
        ERROR: "ERROR",
        PERF: "PERF",
        LOG: "LOG"
    };

    public static COLOR: COLOR = {
        DEBUG: "#5787cf",
        INFO: "#7fa9db",
        WARN: "#db8111",
        ERROR: "#df5454",
        PERF: "#54d7df",
        LOG: "#7fa9db"
    }
}

export default Constant;
