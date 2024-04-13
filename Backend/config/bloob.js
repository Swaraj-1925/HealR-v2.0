const { BlobServiceClient } = require('@azure/storage-blob')
require('dotenv/config');

const Connection_String = process.env.connection_String;

const blobServiceClient = BlobServiceClient.fromConnectionString(Connection_String);

const containerImg = process.env.CONTAINER_NAMEIMG;
const containerVerifyImg = process.env.Container_Verify_Img;
const containerClient1 = blobServiceClient.getContainerClient(containerImg);
const containerClient2 = blobServiceClient.getContainerClient(containerVerifyImg);


async function UploadImg(blobName, imageBuffer) {
    const fileName = `image-${Date.now()}.${blobName}`;

    const blobClient = containerClient1.getBlockBlobClient(fileName);

    const uploadBlobResponse = await blobClient.uploadData(imageBuffer, {
        blobHTTPHeaders: {
            blobContentType: 'image/jpeg' // Set the content type of the blob
        }
    });
    return blobClient.url;
}

async function VerifyUploadImg(blobName, imageBuffer) {
    const fileName = `image-${Date.now()}.${blobName}`;
    const blobClient = containerClient2.getBlockBlobClient(fileName);
    const uploadBlobResponse = await blobClient.uploadData(imageBuffer, {
        blobHTTPHeaders: {
            blobContentType: 'image/jpeg' // Set the content type of the blob
        }
    });
    
    return blobClient.url;
}
async function deleteBlob(oldUrl) {

    const parts = oldUrl.split('/');
    const blobName = parts[parts.length - 1];

    const blobClient = containerClient2.getBlobClient(blobName);
    await blobClient.delete();
   
}

module.exports = {
    UploadImg,
    VerifyUploadImg,
    deleteBlob

}