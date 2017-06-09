/*
 *  built by slashhuang 
 * http://www.svlada.com/require-js-optimization-part2/
 * sample build.js https://github.com/requirejs/r.js/blob/master/build/example.build.js
 */ 



({
    baseUrl: "./src/amd/src",

    /*单文件编译*/
    // name:"./main",
    // out: "./src/amd/dist/main.js",
    /*多文件*/
    //List the modules that will be optimized. All their immediate and deep
    //dependencies will be included in the module's file when the build is
    //done.
    modules: [
         { name: "bundle" }
    ],
    //Set paths for modules. If relative paths, set relative to baseUrl above.
    paths: {
         bundle: './main'
    },
    //The directory path to save the output. If not specified, then
    //the path will default to be a directory called "build" as a sibling
    //to the build file. All relative paths are relative to the build file.
    dir: "./src/amd/src/dist",

    keepBuildDir: false,
    //If shim config is used in the app during runtime, duplicate the config
    //here. Necessary if shim config is used, so that the shim's dependencies
    //are included in the build. Using "mainConfigFile" is a better way to
    //pass this information though, so that it is only listed in one place.
    //However, if mainConfigFile is not an option, the shim config can be
    //inlined in the build config.
    shim: {
        'shim-0':{
            deps: ['shim-1']
        }
    }
})