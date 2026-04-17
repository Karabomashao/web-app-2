const { getPool, sql } = require('../config/db')

async function saveDocumentMetadata({
    id,
    originalFileName,
    storedFileName,
    blobName,
    blobUrl,
    contentType,
    fileSize
}) {
    const pool = await getPool()

    const result = await pool
        .request()
        .input('id', id)
        .input('fileName', storedFileName)
        .input('originalFileName', originalFileName)
        .input('blobName', blobName)
        .input('blobUrl', blobUrl)
        .input('contentType', contentType)
        .input('fileSize', fileSize)
        .query(`
            INSERT INTO Documents (
                CompanyID,
                UploadedByUserID,
                FileName,
                OriginalFileName,
                BlobName,
                BlobUrl,
                ContentType,
                FileSize
            )
            OUTPUT
                INSERTED.DocumentID,
                INSERTED.CompanyID,
                INSERTED.UploadedByUserID,
                INSERTED.OriginalFileName,
                INSERTED.BlobName,
                INSERTED.BlobUrl,
                INSERTED.UploadedAt
            SELECT
                u.CompanyID,
                u.Id,
                @fileName,
                @originalFileName,
                @blobName,
                @blobUrl,
                @contentType,
                @fileSize
            FROM Users u
            WHERE u.Id = @id
              AND u.CompanyID IS NOT NULL
        `)

    return result.recordset[0] || null
}
module.exports = {
    saveDocumentMetadata
}