import path from "node:path";
import fs from "node:fs";
import appPath from "./app-path";
import plist from "plist";

let version: any;

export default function iterm2() {
    if (process.platform !== "darwin") {
        return;
    }

    if (!version) {
        if (process.env.TERM_PROGRAM === "iTerm.app" && process.env.TERM_PROGRAM_VERSION) {
            version = process.env.TERM_PROGRAM_VERSION;
        } else {
            const filePath = path.join(appPath.sync("iTerm"), "Contents/Info.plist");

            version = (plist.parse(fs.readFileSync(filePath, "utf8")) as any).CFBundleVersion;
        }
    }

    return version;
}
