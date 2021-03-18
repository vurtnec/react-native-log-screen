import Memory from './store/Memory'
import LocalStorage from './store/LocalStorage'
import RealmStorage from './store/RealmStorage'

interface LogLevel {
  DEBUG: string
  INFO: string
  WARN: string
  ERROR: string
  PERF: string
  LOG: string
}

interface Color {
  DEBUG: string
  INFO: string
  WARN: string
  ERROR: string
  PERF: string
  LOG: string
}

export interface Storage {
  MEMORY: LOG_STORAGE_TYPE
  LOCALSTORAGE: LOG_STORAGE_TYPE
  REALM: LOG_STORAGE_TYPE
  // REMOTE: string
}

export enum LOG_STORAGE_TYPE {
  MEMORY = 1,
  LOCALSTORAGE,
  REALM
  // REMOTE
}


class Constant {
  public static LOG_LEVEL: LogLevel = {
    DEBUG: 'DEBUG',
    INFO: 'INFO',
    WARN: 'WARN',
    ERROR: 'ERROR',
    PERF: 'PERF',
    LOG: 'LOG'
  }

  public static COLOR: Color = {
    DEBUG: '#5787cf',
    INFO: '#7fa9db',
    WARN: '#db8111',
    ERROR: '#df5454',
    PERF: '#54d7df',
    LOG: '#7fa9db'
  }

  public static STORAGE: Storage = {
    MEMORY: LOG_STORAGE_TYPE.MEMORY,
    LOCALSTORAGE: LOG_STORAGE_TYPE.LOCALSTORAGE,
    REALM: LOG_STORAGE_TYPE.REALM
    // REMOTE: 'remote'
  }
}

export default Constant
