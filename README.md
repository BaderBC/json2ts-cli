# json2ts-cli

Convert your `.json` to `.d.ts`

## Description

This is simply a CLI wrapper for the [json2ts](https://www.npmjs.com/package/json2ts?activeTab=readme) library, which also handles edge cases such as whitespaces or invalid JS characters in keys.

## Getting Started

### Dependencies

* Node.js
* npm

### Installing

You can install it from npm using your preferred package manager, e.g.
```
npm i -g json2ts-cli
```

### Executing program

To generate `.d.ts` types from your JSON file, run the following command. It will generate the type definitions in the same directory as the JSON files:
```
json2ts ./example.json
```

## Authors

Just me - this is a really small project ;)

Btw, I couldn't have made this without the [json2ts](https://github.com/GregorBiswanger/json2ts) library, so please consider giving it a star!
