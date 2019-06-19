#!/usr/bin/env node
const fs = require('fs-extra');
const chalk = require('chalk');

//TODO: use commander:

const templateDir = __dirname + '/templates/dapp';


if(process.argv.length !== 3) {
    //TODO: better error management
    console.log(chalk.red("command line argument is wrong"));
    process.exit(1);
}

const appName = process.argv[2];

const MANIFEST = {
    "short_name": appName,
    "name": appName,
    "icons": [
        {
            "src": "favicon.ico",
            "sizes": "64x64 32x32 24x24 16x16",
            "type": "image/x-icon"
        }
    ],
    "start_url": ".",
    "display": "standalone",
    "theme_color": "#000000",
    "background_color": "#ffffff"
};

const PACKAGE_JSON = {
    "name": appName,
    "version": "0.1.0",
    "private": true,
    "dependencies": {
        "ethers": "^4.0.29",
        "react": "^16.8.6",
        "react-dom": "^16.8.6",
        "react-router-dom": "^5.0.1"
    },
    "scripts": {
    },
    "eslintConfig": {
        "extends": "react-app"
    },
    "browserslist": {
        "production": [
            ">0.2%",
            "not dead",
            "not op_mini all"
        ],
        "development": [
            "last 1 chrome version",
            "last 1 firefox version",
            "last 1 safari version"
        ]
    }
};

async function copyTemplate () {
    try {
        await fs.copy(templateDir, appName);
        console.log(chalk.green('success!'));
    } catch (err) {
        console.error(err)
    }
}

async function generateManifest() {
    try {
        await fs.outputFile(`${appName}/public/manifest.json`, JSON.stringify(MANIFEST));
    } catch (err) {
        console.error(error);
    }
}

async function generatePackageJson() {
    try {
        await fs.outputFile(`${appName}/package.json`, JSON.stringify(PACKAGE_JSON));
    } catch(err) {
        console.error(error);
    }
}

copyTemplate()
    .then((_) => {generateManifest(); console.log(chalk.blue("Generating manifest"))})
    .then((_) => {generatePackageJson(); console.log(chalk.blue("Generating package.json"))});