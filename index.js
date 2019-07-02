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
        "babel-core": "^6.26.3",
        "babel-preset-env": "^1.7.0",
        "babel-preset-react": "^6.24.1",
        "ethers": "^4.0.32",
        "parcel-bundler": "^1.12.3",
        "parcel-plugin-solidity": "^0.1.1",
        "react": "^16.8.6",
        "react-dom": "^16.8.6"
    },
    "devDependencies": {
        "@babel/core": "^7.4.5",
        "@babel/plugin-transform-runtime": "^7.4.4",
        "@babel/preset-react": "^7.0.0",
        "babel-plugin-wildcard": "^5.0.0"
    },
    "scripts": {
        "init": "parcel watch ./src/contracts/*.sol",
        "start": "parcel watch ./src/contracts/*.sol & parcel src/index.html"
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


async function generatePackageJson() {
    try {
        await fs.outputFile(`${appName}/package.json`, JSON.stringify(PACKAGE_JSON));
    } catch(err) {
        console.error(error);
    }
}

copyTemplate()
    .then((_) => {generatePackageJson(); console.log(chalk.blue("Generating package.json"))});