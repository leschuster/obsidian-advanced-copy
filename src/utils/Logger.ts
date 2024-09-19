import { PLUGIN_NAME } from "../main";

export class Logger {
    public static log(text: string): void {
        console.log(`[${PLUGIN_NAME}] ${text}`);
    }

    public static warn(text: string): void {
        console.warn(`[${PLUGIN_NAME}] ${text}`);
    }

    public static error(text: string): void {
        console.error(`[${PLUGIN_NAME}] ${text}`);
    }
}
