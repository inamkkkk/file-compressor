const compressService = require('../services/compressService');

exports.compress = async (inputPath, outputPath) => {
  try {
    await compressService.compressFileOrDirectory(inputPath, outputPath);
  } catch (error) {
    console.error('Error in compressController:', error.message);
    throw error;
  }
};
