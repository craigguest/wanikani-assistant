/* eslint-disable no-undef */
const process = require('process');

console.log(process.argv);
// const ext = require('web-ext');

// // var process = require('process'); // eslint-disable-line no-undef
// // // concurrently \"webpack -w\" \"web-ext run -s ./extension/ -u about:debugging\"
// // console.log(process.env.npm_package_version);

// (async function start() {
//     let cmd = ext.default.cmd;
//     let runner = await cmd.run(null, null);
//     console.log(runner);
// })();

// //node ./build/start.js



// // webExt.cmd.run({
// //   // These are command options derived from their CLI conterpart.
// //   // In this example, --source-dir is specified as sourceDir.
// //   firefox: '/path/to/Firefox-executable',
// //   sourceDir: '/path/to/your/extension/source/',
// // }, {
// //   // These are non CLI related options for each function.
// //   // You need to specify this one so that your NodeJS application
// //   // can continue running after web-ext is finished.
// //   shouldExitProgram: false,
// // })
// //   .then((extensionRunner) => {
// //     // The command has finished. Each command resolves its
// //     // promise with a different value.
// //     console.log(extensionRunner);
// //     // You can do a few things like:
// //     // extensionRunner.reloadAllExtensions();
// //     // extensionRunner.exit();
// //   });