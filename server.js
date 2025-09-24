#!/usr/bin/env node

const compressController = require('./controllers/compressController');
const decompressController = require('./controllers/decompressController');

const [, , command, inputPath, outputPath] = process.argv;

async function main() {
  try {
    switch (command) {
      case 'compress':
        await compressController.compress(inputPath, outputPath);
        break;
      case 'decompress':
        await decompressController.decompress(inputPath, outputPath);
        break;
      default:
        console.error('Usage: node server.js <compress|decompress> <input_path> <output_path>');
        process.exit(1);
    }
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();