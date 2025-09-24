const decompressService = require('../services/decompressService');

exports.decompress = async (inputPath, outputPath) => {
  try {
    await decompressService.decompressFile(inputPath, outputPath);
  } catch (error) {
    console.error('Error in decompressController:', error.message);
    throw error;
  }
};
