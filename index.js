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
    Object.keys(json).forEach(key => {
        console.log('key: ', key);
        let newKey = key.replaceAll(/[\s-]/g, "_");
        newKey = latinize(newKey);
        if (newKey !== key) {
            json[newKey] = json[key];
            delete json[key];
        }
        if (typeof json[newKey] === 'object') normalizeJson(json[newKey]);
    });
}

const result = json2ts.convert(JSON.stringify(jsonInput));

fs.writeFileSync(`./${fileName}.d.ts`, result);
console.log(`Successfully generated ${fileName}.d.ts`);
