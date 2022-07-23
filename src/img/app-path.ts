import execa from "execa";

const improveError = (error: any) => {
    if (error.exitCode === 2) {
        error.message = "Couldn't find the app";
    }

    return error;
};

export default async function appPath(appName: any) {
    if (process.platform !== "darwin") {
        throw new Error("macOS only");
    }

    if (typeof appName !== "string") {
        throw new TypeError("Please supply an app name or bundle identifier");
    }

    try {
        const { stdout } = await execa("./main", [appName], { cwd: __dirname });
        return stdout;
    } catch (error) {
        throw improveError(error);
    }
}

appPath.sync = (appName: any) => {
    if (process.platform !== "darwin") {
        throw new Error("macOS only");
    }

    if (typeof appName !== "string") {
        throw new TypeError("Please supply an app name or bundle identifier");
    }

    try {
        return execa.sync("./main", [appName], { cwd: __dirname }).stdout;
    } catch (error) {
        throw improveError(error);
    }
};
