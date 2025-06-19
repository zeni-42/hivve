import fs from 'fs';
import path from 'path';

export function logger (e: unknown, message?: string, level ?: string) {
    // create a folder named 'logs' in current workinng directory, if that didn't exist previously it will create a new one (async) 
    const logDir = path.join(process.cwd(), 'logs')
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir)
    }

    // making a file path with the current time-stamp and specifying the file path name
    const timestamp = new Date().toISOString().replace('/:/g', '-')
    const filename = path.join(logDir, `${timestamp}.log`)

    // cooking up the content of the logs
    const errorMessage = typeof e == 'string' ? e : JSON.stringify(e, null, 4)
    const content = `[${new Date().toISOString()}] -> ${errorMessage} ==> [${level || 'info'}]`

    fs.writeFileSync(filename, content);
} 