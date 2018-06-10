const Promise = require('bluebird');
const writeJson = require('write-json');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const readFile = Promise.promisify(fs.readFile);

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const appPackageJson = resolveApp('package.json');
const version = require(appPackageJson).version;

const assetsJson = resolveApp('build/asset-manifest.json');
const assets = require(assetsJson);

const cssStream = fs.createReadStream(path.join(appDirectory, 'build', assets['main.css']));
const jsStream = fs.createReadStream(path.join(appDirectory, 'build', assets['main.js']));

Promise.join(
    readFile(path.join(appDirectory, 'build', assets['main.css'])),
    readFile(path.join(appDirectory, 'build', assets['main.js'])),
    (css, js) => {
        const cssHash = crypto.createHash('sha384');
        const jsHash = crypto.createHash('sha384');

        cssHash.update(css);
        jsHash.update(js);

        const extend = {
            cssHash : cssHash.digest('base64'),
            jsHash : jsHash.digest('base64'),
            version : version, appName : 'EOS_PORTAL'
        };

        writeJson.sync(assetsJson, Object.assign(assets, extend));
    });

// package.json -> version
