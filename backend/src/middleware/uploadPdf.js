const multer = require('multer')
const storage = multer.memoryStorage()

function fileFilter(req, file, cb){
    if (file.mimetype !== 'application/pdf') {
        return cb(new Error('Only PDF files are allowed'), false)
    }
    cb(null, true)
}

const uploadPdf = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024
    }
})

module.exports = uploadPdf