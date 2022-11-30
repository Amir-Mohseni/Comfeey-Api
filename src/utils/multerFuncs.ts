import multer from 'multer'
import path from 'path'

const storageForUserPhoto = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./static/profile/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
        req.user._id +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

export const uploadForUserPhoto = multer({
  storage: storageForUserPhoto,
  limits: { fileSize: 10000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// Check File Type
function checkFileType(file, cb) {
  try {
    // Allowed ext
    const filetypes = /jpeg|jpg|png/;
    // Check ext
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      throw new Error("Only image Files with size less than 10MB.");
    }
  } catch (err) {
    console.log(err.message);
    return cb(null, true);
  }
}
