const { BlobServiceClient } = require('@azure/storage-blob')

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME

if (!connectionString){
    throw new Error('Azure connection string is not set')
}

const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString)
const containerClient = blobServiceClient.getContainerClient(containerName)

async function ensureContainer(){
    await containerClient.createIfNotExists()
}

function sanitizeFileName(fileName) {
    return fileName.replace(/[^a-zA-Z0-9._-]/g, '_')
}

async function uploadPdfToBlob(
    {
        buffer, 
        originalName, 
        companyID,
        id,
        contentType
    }
    ){
    await ensureContainer()

    const safeName = sanitizeFileName(originalName)
    const blobName = `companies/${companyID}/users/${id}/${Date.now()}-${safeName}`

    const blockBlobClient = containerClient.getBlockBlobClient(blobName)

    await blockBlobClient.uploadData(buffer, {
        blobHTTPHeaders: {
            blobContentType: contentType || 'application/pdf'
        }
    })

    return {
        blobName,
        blobUrl: blockBlobClient.url
    }
}

module.exports = {
    uploadPdfToBlob
}