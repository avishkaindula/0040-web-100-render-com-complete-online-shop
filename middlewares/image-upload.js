const multer = require('multer');
const uuid = require('uuid').v4;

const upload = multer({
  storage: multer.diskStorage({
    destination: 'product-data/images',
    filename: function(req, file, cb) {
      cb(null, uuid() + '-' + file.originalname);
      // This will generate a unique file name with the extension for images.
    }
  })
});

const configuredMulterMiddleware = upload.single('image');

module.exports = configuredMulterMiddleware;
