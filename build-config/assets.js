const writeJson = require('write-json');
const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const appPackageJson = resolveApp('package.json');
const version = require(appPackageJson).version;

const assetsJson = resolveApp('build/asset-manifest.json');
const assets = require(assetsJson);

// package.json -> version

writeJson.sync(assetsJson, Object.assign(assets, {version : version, appName : 'EOS_PORTAL'}));
