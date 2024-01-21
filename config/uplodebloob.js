const {BlobServiceClient} =require('@azure/storage-blob')
require('dotenv/config');


const connectionString = process.env.connectionString;

const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

const containerAuth = process.env.CONTAINER_NAMEAUTH;
const containerImg =  process.env.CONTAINER_NAMEIMG;
const containerClientAuth = blobServiceClient.getContainerClient(containerAuth);
const containerClientImg = blobServiceClient.getContainerClient(containerImg);

async function  docAuth(blobName, dataStream){
    const fileName = `image-${Date.now()}.${blobName}`;

    const blobClient = containerClientAuth.getBlockBlobClient(fileName);
    await blobClient.uploadStream(dataStream);
     return blobClient.url;

}
async function docImg(blobName, dataStream){
    const fileName = `image-${Date.now()}.${blobName}`;
    const blobClient = containerClientImg.getBlockBlobClient(fileName);
    await blobClient.uploadStream(dataStream);
    return blobClient.url;
}




module.exports.docAuth = docAuth;
module.exports.docImg = docImg;
