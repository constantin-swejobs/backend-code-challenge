const { chain }  = require('stream-chain');
const { parser } = require('stream-json');
const { streamArray } = require('stream-json/streamers/StreamArray');
const fs = require('fs-extra');



class FileBasedStore {
  constructor(path) {
    this.path = path;
  }

  filter(matcher) {
    return new Promise((resolve, reject) => {
      const result = [];

      const pipeline = chain([
        fs.createReadStream(this.path),
        parser(),
        streamArray(),
        (item) => matcher(item.value) ? item : null,
      ]);

      pipeline.on('data', data => result.push(data.value));
      pipeline.on('end', () => resolve(result));
      pipeline.on('error', reject);
    });
  }

  readStream() {
    return fs.createReadStream(this.path);
  }
}


// Will return a boolean indicating whether the obj argument matches the provided key query
// The key query supports the following syntax:
//    {[comparisonKey]: { [$equals|$includes|$in]: comparisonValue }}
//  ... where for each key filter, one of the {$equals|$includes|$in} operators can be used
// to define the comparison logic.
const matchesKeyQuery = (obj, keyQuery) => {
  const keysToBeChecked = Object.keys(keyQuery || {});

  for (const currentKey of keysToBeChecked) {
    if (obj[currentKey] == null) {
      return false;
    }
    
    if (keyQuery[currentKey]["$equals"] != null) {
      if (obj[currentKey] != keyQuery[currentKey]["$equals"]) {
        return false
      }
    } else if (keyQuery[currentKey]["$includes"] != null) {
      if (!Array.isArray(obj[currentKey]) || !obj[currentKey].includes(keyQuery[currentKey]["$includes"])) {
        return false;
      }
    } else if (keyQuery[currentKey]["$in"] != null) {
      if (!Array.isArray(keyQuery[currentKey]["$in"]) || !keyQuery[currentKey]["$in"].includes(obj[currentKey])) {
        return false;
      }
    }
  }

  return true;
}

module.exports.FileBasedStore = FileBasedStore;

module.exports.where = (filterQuery) => {
  return (item) => {
    return matchesKeyQuery(item, filterQuery)
  }
}

