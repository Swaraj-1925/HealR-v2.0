const http =require('http');
const { BlobServiceClient } =require('@azure/storage-blob');
const intoStream = require('into-stream');
require ('dotenv/config');

const connectionString = process.env.connectionString;
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

async function createContainers() {
  try {
    await Promise.all([
      createContainerIfNotExists('authenticationdoq'),
      createContainerIfNotExists('docimages')
    ]);
    console.log('Containers created or already exist');
  } catch (error) {
    console.error('Error creating containers:', error);
  }
}

async function createContainerIfNotExists(containerName) {
  try {
    await blobServiceClient.getContainerClient(containerName); // Check if exists
    console.log(`Container ${containerName} already exists`);
  } catch (error) {
    if (error.statusCode === 404) { // Container not found
      await blobServiceClient.createContainer(containerName);
      console.log(`Container ${containerName} created`);
    } else {
      throw error; // Rethrow other errors
    }
  }
}
createContainers();

  async function uploadImageAuth(blobName, dataStream) {
    const containerClient = blobServiceClient.getContainerClient("authenticationdoq");
    const blobClient = containerClient.getBlockBlobClient(blobName);
    await blobClient.uploadStream(dataStream);
    return blobClient.url;
  }
  async function uploadImage(blobName, dataStream) {
    const containerClient = blobServiceClient.getContainerClient("docimages");
    const blobClient = containerClient.getBlockBlobClient(blobName);
    await blobClient.uploadStream(dataStream);
    return blobClient.url;
  }

  module.exports. uploadImageAuth =  uploadImageAuth;
  module.exports. uploadImage =  uploadImage;