/*
 *  built by slashhuang 
 * http://www.svlada.com/require-js-optimization-part2/
 */ 



({
    //The top level directory that contains your app. If this option is used
    //then it assumed your scripts are in a subdirectory under this path.
    //This option is not required. If it is not specified, then baseUrl
    //below is the anchor point for finding things. If this option is specified,
    //then all the files from the app directory will be copied to the dir:
    //output area, and baseUrl will assume to be a relative path under
    //this directory.

    //By default, all modules are located relative to this path. If baseUrl
    //is not explicitly set, then all modules are loaded relative to
    //the directory that holds the build file. If appDir is set, then
    //baseUrl should be specified as relative to the appDir.
    baseUrl: "./src/amd/",

    /*单文件编译*/
    // name:"./main",
    // out: "./src/amd/dist/app-built.js",

    /*多文件*/
    modules: [
         { name: "bundle" }
    ],
    paths: {
         bundle: './main'
    },
    //The directory path to save the output. If not specified, then
    //the path will default to be a directory called "build" as a sibling
    //to the build file. All relative paths are relative to the build file.
    dir: "./src/amd/dist",

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