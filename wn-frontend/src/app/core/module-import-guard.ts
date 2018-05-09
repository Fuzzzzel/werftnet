/**
 * Helper to ensure that the core module is only imported once (to the app.module)
 * and was not loaded before.
 * 
 * This is because services might be instanciated a second time if imported to another
 * module later.
 * 
 * @param parentModule The instance of a module that was loaded before
 * @param moduleName Name of module to be imported - so it can be shown in error msg
 */
export function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
    if (parentModule) {
        throw new Error(`${moduleName} has already been loaded. Import Core modules in the AppModule only.`);
    }
}