const multer = require('multer');

const MIMETYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/svg+xml': 'svg'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './assets/uploads/');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('');
    const extension = MIMETYPES[file.mimetype];
    callback(null, name.split('.')[0] + Date.now() + '.' + extension);
  }
});

const upload = multer({ 
  storage: storage, 
  limits:{
    fieldSize:1024*1024*3
  }
})

module.exports = upload
