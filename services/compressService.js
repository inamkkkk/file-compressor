const fs = require('fs');
const zlib = require('zlib');
const path = require('path');
const { promisify } = require('util');

const pipeline = promisify(require('stream').pipeline);

exports.compressFileOrDirectory = async (inputPath, outputPath) => {
  const stats = fs.statSync(inputPath);

  if (stats.isFile()) {
    await compressFile(inputPath, outputPath);
  } else if (stats.isDirectory()) {
    await compressDirectory(inputPath, outputPath);
  } else {
    throw new Error('Input path must be a file or directory.');
  }
};

async function compressFile(inputPath, outputPath) {
  const gzip = zlib.createGzip();
  const source = fs.createReadStream(inputPath);
  const destination = fs.createWriteStream(outputPath);

  try {
    await pipeline(source, gzip, destination);
    console.log(`File compressed successfully: ${outputPath}`);
  } catch (err) {
    console.error('Pipeline failed.', err);
    throw err;
  }
}

async function compressDirectory(inputPath, outputPath) {
    const files = getAllFiles(inputPath);
    if (!outputPath.endsWith('.tar.gz')){
        outputPath += '.tar.gz';
    }

    const tar = require('tar');

    try {
        await tar.create({
            gzip: true,
            file: outputPath,
            cwd: inputPath,
        }, files);

        console.log(`Directory compressed successfully: ${outputPath}`);
    } catch (err) {
        console.error('Tar creation failed.', err);
        throw err;
    }

}

function getAllFiles(dirPath, arrayOfFiles) {
    files = fs.readdirSync(dirPath)

    arrayOfFiles = arrayOfFiles || []

    files.forEach(function(file) {
      if (fs.statSync(dirPath + "/" + file).isDirectory()) {
        arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
      } else {
        arrayOfFiles.push(path.join(file))
      }
    })

    return arrayOfFiles
  }
