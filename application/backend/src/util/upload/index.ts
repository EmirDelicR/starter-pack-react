import multer from 'multer';
import path from 'path';

const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const createdPath = path.join(__dirname, '..', '..', 'images');
    cb(null, createdPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${req.params?.id}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 50000
  },
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_FILE_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
});

export default upload;
