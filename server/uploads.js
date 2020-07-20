const multer = require('multer');

module.exports.storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'public/images');
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});

module.exports.fileFilter = (req, file, cb) => {

    if(file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg'||
        file.mimetype === 'image/jpeg'){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
};
