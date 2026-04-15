const { getPool, sql } = require('../config/db')

async function saveDocumentMetadata({
    userID,
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
        .input('userID', sql.Int, userID)
        .input('fileName', sql.NVarChar(255), storedFileName)
        .input('originalFileName', sql.NVarChar(255), originalFileName)
        .input('blobName', sql.NVarChar(500), blobName)
        .input('blobUrl', sql.NVarChar(1000), blobUrl)
        .input('contentType', sql.NVarChar(100), contentType)
        .input('fileSize', sql.BigInt, fileSize)
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
                u.UserID,
                @fileName,
                @originalFileName,
                @blobName,
                @blobUrl,
                @contentType,
                @fileSize
            FROM Users u
            WHERE u.UserID = @userID
              AND u.CompanyID IS NOT NULL
        `)

    return result.recordset[0] || null
}

module.exports = {
    saveDocumentMetadata
}