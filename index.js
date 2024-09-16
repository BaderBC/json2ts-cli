#!/usr/bin/env node

const json2ts = require('json2ts');
const fs = require('fs');
const latinize = require('latinize');

let fileName = process.argv[2];

if (!fileName) {
    console.error("Please provide a file name as the first argument.");
    process.exit(1);
}

if (fileName.endsWith('.json')) {
    fileName = fileName.slice(0, -5);
}

const jsonStr = fs.readFileSync(`./${fileName}.json`, 'utf8');
const jsonInput = JSON.parse(jsonStr);

normalizeJson(jsonInput);

function normalizeJson(json) {
    if (!json) return;
    Object.keys(json).forEach(key => {
        let newKey = latinize(key);

        // if key starts with a number, prefix it with _
        if (!isNaN(+newKey[0])) {
            newKey = '_' + newKey;
        }

        // replace unhandled special characters with _
        newKey = newKey.replaceAll(/[^a-zA-Z0-9_$]/g, '_');

        if (newKey !== key) {
            json[newKey] = json[key];
            delete json[key];
        }
        if (typeof json[newKey] === 'object') normalizeJson(json[newKey]);
    });
}

const result = json2ts.convert(JSON.stringify(jsonInput));

fs.writeFileSync(`./${fileName}.d.ts`, result);
