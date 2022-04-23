const multer = require("multer");
const path = require("path");

// Configuração do multer
module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
            cb(new Error("Tipo de arquivo não suportado."), false);
            return;
        }
        cb(null, true);
    },
});