const { BlobServiceClient } = require('@azure/storage-blob')
require('dotenv/config');

const Connection_String = process.env.connection_String;

const blobServiceClient = BlobServiceClient.fromConnectionString(Connection_String);

const containerImg = process.env.CONTAINER_NAMEIMG;
const containerClient = blobServiceClient.getContainerClient(containerImg);


async function UploadImg(blobName, imageBuffer) {
    const fileName = `image-${Date.now()}.${blobName}`;

    const blobClient = containerClient.getBlockBlobClient(fileName);

    const uploadBlobResponse = await blobClient.uploadData(imageBuffer, {
        blobHTTPHeaders: {
            blobContentType: 'image/jpeg' // Set the content type of the blob
        }
    });
    const blobUrl = blobClient.url;

    return blobUrl;



}
module.exports = UploadImg