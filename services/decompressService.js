const fs = require('fs');
const zlib = require('zlib');
const { promisify } = require('util');

const pipeline = promisify(require('stream').pipeline);

exports.decompressFile = async (inputPath, outputPath) => {
  const gunzip = zlib.createGunzip();
  const source = fs.createReadStream(inputPath);
  const destination = fs.createWriteStream(outputPath);

  try {
    await pipeline(source, gunzip, destination);
    console.log(`File decompressed successfully: ${outputPath}`);
  } catch (err) {
    console.error('Pipeline failed.', err);
    throw err;
  }
};
