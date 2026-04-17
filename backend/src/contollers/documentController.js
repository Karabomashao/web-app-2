const { getPool } = require('../config/db')
const { uploadPdfToBlob } = require('../services/blobService')
const { saveDocumentMetadata } = require('../repositories/documentRepository')

async function uploadCompanyPdf(req, res) {
    try {
        const id = Number(req.params.id)

        if (!id || Number.isNaN(id)) {
            return res.status(400).json({ message: 'Invalid userID' })
        }

        if (!req.file) {
            return res.status(400).json({ message: 'No PDF uploaded' })
        }

        const pool = await getPool()
        const companyResult = await pool
            .request()
            .input('id', id)
            .query(`
                SELECT CompanyID
                FROM Users
                WHERE Id = @id
            `)

        const userRow = companyResult.recordset[0]

        if (!userRow || !userRow.CompanyID) {
            return res.status(404).json({
                message: 'User not found or user is not linked to a company'
            })
        }

        const { blobName, blobUrl } = await uploadPdfToBlob({
            buffer: req.file.buffer,
            originalName: req.file.originalname,
            companyID: userRow.CompanyID,
            id,
            contentType: req.file.mimetype
        })

        const savedDocument = await saveDocumentMetadata({
            id,
            originalFileName: req.file.originalname,
            storedFileName: req.file.originalname,
            blobName,
            blobUrl,
            contentType: req.file.mimetype,
            fileSize: req.file.size
        })

        console.log(savedDocument)

        return res.status(201).json({
            message: 'PDF uploaded successfully',
            document: savedDocument
        })
    } catch (error) {
        console.error('Error uploading PDF:', error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

module.exports = {
    uploadCompanyPdf
}